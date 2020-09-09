import { BaseDatabase } from "./BaseDatabase";
import { signupInputDTO } from "../model/signupInputDTO";
import { User } from "../model/User";

export class UserDatabase extends BaseDatabase {
  private static TABLE_NAME = "Soundcloud_Users";

  public async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.getConnection()
      .from(UserDatabase.TABLE_NAME)
      .where({ email })
      .first();
    if (!result) {
      return null;
    }
    const { id, name, nickname, password, role } = result;
    return new User(id, name, nickname, email, password, role);
  }

  public async createUser(input: signupInputDTO) {
    await this.getConnection().insert(input).into(UserDatabase.TABLE_NAME);
  }
}
