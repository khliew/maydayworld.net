import { Line } from './line';

export class Song {
  id: string;
  title: {
    zht: string;
    zhp: string;
    eng: string;
  };
  lyricist: string;
  composer: string;
  arranger: string;
  lyrics: Line[];
  dict: any;
}
