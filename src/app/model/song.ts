import { Line, Title } from '.';

export class Song {
  id: string;
  title: Title;
  lyricist: string;
  composer: string;
  arranger: string;
  lyrics: Line[];
  dict: any;
}
