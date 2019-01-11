import { Track } from './track';

export class Album {
  id: string;
  title: string;
  releaseDate?: string;
  tracks: Track[];
}
