import { MailerOptions } from '@nestjs-modules/mailer';
import * as path from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

export const mailerConfig: MailerOptions = {
  template: {
    dir: path.resolve(__dirname, '..', '..', 'templates'),
    adapter: new HandlebarsAdapter(), 
    options: {
      extName: '.hbs',
      layoutsDir: path.resolve(__dirname, '..', '..', 'templates'),
    },
  },
  transport: {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'arthurdaconceicaocunha@gmail.com',
      pass: 'kjtc aymn whux bcra',
    },
  },
};

const layoutsDir = mailerConfig.template.options.layoutsDir;
console.log(layoutsDir);