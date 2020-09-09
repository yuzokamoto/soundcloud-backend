import { Request, Response } from "express";

import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";
import { BaseDatabase } from "../database/BaseDatabase";

export class UserController {
  private static userBusiness = new UserBusiness(new UserDatabase());

  public async login(req: Request, res: Response) {
    try {
      const loginInput = req.body;
      const token = await UserController.userBusiness.login(loginInput);
      res.status(200).send({ message: "Logged in successfully", token });
    } catch (error) {
      res
        .status(error.errorCode || 400)
        .send({ message: error.sqlMessage || error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }

  public async signup(req: Request, res: Response) {
    try {
      const signupInput = req.body;
      const token = await UserController.userBusiness.signup(signupInput);
      res.status(200).send({ message: "Signup sucessfully", token });
    } catch (error) {
      res
        .status(error.errorCode || 400)
        .send({ message: error.sqlMessage || error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
}
