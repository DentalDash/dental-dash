import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './configs/logs-config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/log-interceptors';
import { MailerModule } from '@nestjs-modules/mailer';
import { mailerConfig } from './configs/mail-config';
import { UsersController } from './users/users.controller';
import { AuthController } from './auth/auth.controller';
import { UsersService } from './users/users.service';
import { AuthService } from './auth/auth.service';
import { UserRepository } from './users/users.repository';
import { Supplies } from './suplies/entities/supplies.entity';
import { SuppliesModule } from './suplies/supplies.module';
import { SuppliesController } from './suplies/supplies.controller';
import { SuppliesService } from './suplies/supplies.service';
import { SuppliesRepository } from './suplies/supplies.repository';
import { Connection } from 'typeorm';
import { Procedure } from './procedures/entities/procedures.entity';
import { ProcedureModule } from './procedures/procedures.module';
import { ProceduresService } from './procedures/procedures.service';
import { ProceduresRepository } from './procedures/procedures.repository';
import { PatientsRepository } from './patients/patients.repository';
import { PatientsService } from './patients/patients.service';
import { PatientsController } from './patients/patients.controller';
import { Patient } from './patients/entities/patient.entity';
import { DentistRepository } from './dentist/dentist.repository';
import { DentistService } from './dentist/dentist.service';
import { Dentist } from './dentist/entities/dentist.entity';
import { DentistController } from './dentist/dentist.controller';
import { DentistModule } from './dentist/dentist.module';
import { PatientsModule } from './patients/patients.module';
import { Consultation } from './consultation/entities/consultation.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'pguser',
      password: 'pgpassword',
      database: 'dental_dash',
      entities: [User, Supplies, Procedure, Patient, Dentist, Consultation],
      synchronize: true,
    }),

    TypeOrmModule.forFeature([User, Supplies, Procedure]),
    WinstonModule.forRoot(winstonConfig),
    MailerModule.forRoot(mailerConfig),
    UsersModule,
    AuthModule,
    SuppliesModule,
    ProcedureModule,
    DentistModule,
    PatientsModule,

  ],

  controllers: [UsersController, AuthController, SuppliesController,PatientsController, DentistController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggerInterceptor },
    UsersService,
    UserRepository,
    AuthService,
    SuppliesService,
    SuppliesRepository,
    ProceduresService,
    ProceduresRepository,
    PatientsRepository,
    PatientsService,
    DentistRepository,
    DentistService
  ],
})
export class AppModule implements OnApplicationBootstrap {
  constructor(
    private readonly connection: Connection,
    private readonly authService: AuthService,
  ) {}

  async onApplicationBootstrap() {
    await this.authService.initializeApp();
  }
}
