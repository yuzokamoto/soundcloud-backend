import { UserDatabase } from "../database/UserDatabase";
import { Utils } from "../utils/Utils";
import { signupInputDTO } from "../model/signupInputDTO";
import { InvalidParamError } from "../error/InvalidParamError";

export class UserBusiness {
  constructor(private userDatabase: UserDatabase, private utils: Utils) {}

  public async login(input: any) {
    const { email, password } = input;
    // validate params
    await this.userDatabase.login();
  }

  public async signup(input: any): Promise<string> {
    const { name, email, nickname, password, role = "NORMAL" } = input;

    const validationInput = { name, email, nickname, password, role };
    const { isValid, errors } = this.utils.validateEmptyProperties(validationInput); // prettier-ignore
    if (!isValid) {
      throw new InvalidParamError(
        `Request error: invalid body params (${errors.map((e) => e.key)}).`
      );
    }

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
