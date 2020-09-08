import { UserDatabase } from "../database/UserDatabase";
import { Utils } from "../utils/Utils";
import { signupInputDTO } from "../model/signupInputDTO";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase, private utils: Utils) {}

  public async login(input: any) {
    const { email, password } = input;
    // validate params
    await this.userDatabase.login();
  }

  public async signup(input: any): Promise<string> {
    const { name, email, nickname, password, role = "NORMAL" } = input;
    // validate params
    const id = this.utils.generateId();
    const hashedPassword = await this.utils.hashPassword(password);
    const signupInput: signupInputDTO = {
      id,
      name,
      email,
      nickname,
      password: hashedPassword,
      role,
    };
    await this.userDatabase.signup(signupInput);
    const tokenData = { id, role };
    const token = this.utils.generateToken(tokenData);
    return token;
  }
}
