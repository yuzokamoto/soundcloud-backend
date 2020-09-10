import { Router } from "express";
import { SoundController } from "../controller/SoundController";

export const soundRouter = Router();

const soundController = new SoundController();

soundRouter.put("/", soundController.createSound);
soundRouter.post("/", soundController.editSound);
soundRouter.delete("/", soundController.deleteSound);
