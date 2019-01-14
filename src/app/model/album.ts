import { Track } from './track';
import { Title } from './title';

export class Album {
  id: string;
  title: Title;
  releaseDate?: string;
  tracks: Track[];
}
