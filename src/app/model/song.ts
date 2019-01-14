import { Line } from './line';
import { Title } from './title';

export class Song {
  id: string;
  title: Title;
  lyricist: string;
  composer: string;
  arranger: string;
  lyrics: Line[];
  dict: any;
}
