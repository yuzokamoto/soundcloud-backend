import { SOUND_GENRE } from "./SOUND_GENRE";

export interface createSoundInputDTO {
  id: string;
  title: string;
  author: string;
  date: Date;
  file: string;
  genre: SOUND_GENRE[];
  album: string;
}
