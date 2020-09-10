import { Request, Response } from "express";
import { BaseDatabase } from "../database/BaseDatabase";
import { SoundBusiness } from "../business/SoundBusiness";
import { SoundDatabase } from "../database/SoundDatabase";
import { UserBusiness } from "../business/UserBusiness";
import { UserDatabase } from "../database/UserDatabase";

export class SoundController {
  private static userBusiness = new UserBusiness(new UserDatabase());
  private static soundBusiness = new SoundBusiness(new SoundDatabase());

  public async createSound(req: Request, res: Response) {
    try {
      const { title, file, genre, album } = req.body;
      const token = req.headers.authorization;

      const user = await SoundController.userBusiness.getUserFromToken(token);

      const createSoundInput = { title, file, genre, album };
      await SoundController.soundBusiness.createSound(createSoundInput, user); // prettier-ignore

      res.status(200).send({ message: `Sound created successfully` });
    } catch (error) {
      res
        .status(error.errorCode || 400)
        .send({ message: error.sqlMessage || error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }

  public async editSound(req: Request, res: Response) {
    try {
    } catch (error) {
      res
        .status(error.errorCode || 400)
        .send({ message: error.sqlMessage || error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }

  public async deleteSound(req: Request, res: Response) {
    try {
    } catch (error) {
      res
        .status(error.errorCode || 400)
        .send({ message: error.sqlMessage || error.message });
    } finally {
      BaseDatabase.destroyConnection();
    }
  }
}
