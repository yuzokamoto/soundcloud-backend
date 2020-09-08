import { BaseDatabase } from "./BaseDatabase";
import { signupInputDTO } from "../model/signupInputDTO";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Soundcloud_Users";

  public async login() {}

  public async signup(input: signupInputDTO) {
    await this.getConnection().insert(input).into(UserDatabase.TABLE_NAME);
  }
}
