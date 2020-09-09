import { USER_ROLE } from "./USER_ROLE";

export class User {
  constructor(
    private id: string,
    private name: string,
    private nickname: string,
    private email: string,
    private password: string,
    private role: USER_ROLE
  ) {}

  getId() {
    return this.id;
  }
  getName() {
    return this.name;
  }
  getNickname() {
    return this.nickname;
  }
  getEmail() {
    return this.email;
  }
  getPassword() {
    return this.password;
  }
  getRole() {
    return this.role;
  }

  setId(newId: string) {
    this.id = newId;
  }
  setName(newName: string) {
    this.name = newName;
  }
  setNickname(newNickname: string) {
    this.nickname = newNickname;
  }
  setEmail(newEmail: string) {
    this.email = newEmail;
  }
  setPassword(newPassword: string) {
    this.password = newPassword;
  }
  setRole(newRole: USER_ROLE) {
    this.role = newRole;
  }
}
