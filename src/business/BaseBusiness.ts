import { InvalidParamError } from "../error/InvalidParamError";
import { Utils } from "../utils/Utils";

export abstract class BaseBusiness {
  constructor(public utils: Utils) {}

  public validateParams(input: any): void {
    const { isValid, errors } = this.utils.validateEmptyProperties(input); // prettier-ignore
    if (!isValid) {
      throw new InvalidParamError(
        `Request error: invalid body params (${errors.map((e) => e.key)}).`
      );
    }
  }
}
