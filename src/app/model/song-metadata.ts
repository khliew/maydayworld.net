import { Title } from '.';

export class SongMetadata {
  id: string;
  title: Title;
  lyricist: string;
  composer: string;
  arranger: string;
  disabled?: boolean;
}
