import { BaseDatabase } from "./BaseDatabase";
import { createSoundInputDTO } from "../model/createSoundInputDTO";

export class SoundDatabase extends BaseDatabase {
  private static TABLE_NAME = "Soundcloud_Sounds";

  public async createSound(input: createSoundInputDTO) {
    await this.getConnection().insert(input).into(SoundDatabase.TABLE_NAME);
  }

  public async editSound() {}

  public async deleteSound() {}
}
