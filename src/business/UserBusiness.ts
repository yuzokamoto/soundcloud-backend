import { UserDatabase } from "../database/UserDatabase";
import { Utils } from "../utils/Utils";
import { signupInputDTO } from "../model/signupInputDTO";
import { BaseBusiness } from "./BaseBusiness";
import { UnauthorizedError } from "../error/UnauthorizedError";

export class UserBusiness extends BaseBusiness {
  constructor(private userDatabase: UserDatabase) {
    super(new Utils());
  }

  public async login(input: any): Promise<string> {
    const { email, password } = input;

    const validationInput = { email, password };
    this.validateParams(validationInput);

    const user = await this.userDatabase.getUserByEmail(email);
    if (!user) {
      throw new UnauthorizedError(`Email and/or password are incorrect.`);
    }

    const isPasswordCorrect = await this.utils.compareHash(
      password,
      user.getPassword()
    );
    if (!isPasswordCorrect) {
      throw new UnauthorizedError(`Email and/or password are incorrect.`);
    }

    const token = this.utils.generateToken({
      id: user.getId(),
      role: user.getRole(),
    });

    return token;
  }

  public async signup(input: any): Promise<string> {
    const { name, email, nickname, password, role = "NORMAL" } = input;

    const validationInput = { name, email, nickname, password, role };
    this.validateParams(validationInput);

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

    await this.userDatabase.createUser(signupInput);
    const tokenData = { id, role };
    const token = this.utils.generateToken(tokenData);
    return token;
  }
}
