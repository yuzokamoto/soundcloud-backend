import { USER_ROLE } from "./USER_ROLE";

export interface signupInputDTO {
  id: string;
  name: string;
  email: string;
  nickname: string;
  password: string;
  role: USER_ROLE;
}
