import { Track, Title } from '.';

export class Album {
  id: string;
  title: Title;
  releaseDate?: string;
  tracks: Track[];
}
