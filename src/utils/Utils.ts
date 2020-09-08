import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import jwt from "jsonwebtoken";
import { tokenDTO } from "../model/tokenDTO";

export class Utils {
  public async hashPassword(password: string): Promise<string> {
    const rounds = Number(process.env.BCRYPT_COST) || 12;
    const salt = await bcrypt.genSalt(rounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  public async compareHash(password: string, hash: string): Promise<boolean> {
    const result = await bcrypt.compare(password, hash);
    return result;
  }

  public generateId(): string {
    const id = v4();
    return id;
  }

  public generateToken(tokenData: tokenDTO): string {
    const token = jwt.sign(tokenData, process.env.JWT_KEY as string);
    return token;
  }

  public verifyToken(token: string): object | string {
    const tokenData = jwt.verify(token, process.env.JWT_KEY as string);
    return tokenData;
  }

  public validateParams() {}
}
