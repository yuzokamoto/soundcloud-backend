import { BaseBusiness } from "./BaseBusiness";
import { Utils } from "../utils/Utils";
import { SoundDatabase } from "../database/SoundDatabase";
import { User } from "../model/User";
import { SOUND_GENRE } from "../model/SOUND_GENRE";
import { InvalidParamError } from "../error/InvalidParamError";

export class SoundBusiness extends BaseBusiness {
  constructor(private soundDatabase: SoundDatabase) {
    super(new Utils());
  }

  public async createSound(input: any, user: User): Promise<void> {
    const { title, file, genre, album } = input;

    const validationInput = { title, file, genre, album };
    this.validateParams(validationInput);

    if (!Array.isArray(genre)) {
      throw new InvalidParamError(
        `Invalid paramater: 'genre' must be an array of pre-determined strings. Example: ['ROCK', 'METAL']`
      );
    }

    if (genre.length > 0) {
      genre.map((genre) => {
        if (!Object.values(SOUND_GENRE).includes(genre)) {
          throw new InvalidParamError(
            `Invalid paramater: 'genre' must be an array of pre-determined strings. Example: ['ROCK', 'METAL']`
          );
        }
      });
    }

    const id = this.utils.generateId();
    const author = user.getNickname();
    const date = new Date();

    const createSoundInput = {
      id,
      title,
      author,
      date,
      file,
      genre,
      album,
    };

    await this.soundDatabase.createSound(createSoundInput);
  }

  public async editSound() {}

  public async deleteSound() {}
}
