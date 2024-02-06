import { FilterUserDto } from "./filter-user.dto";

export class FindUsersQueryDto extends FilterUserDto {
  name: string;
  email: string;
  status: boolean;
  role: string;
}