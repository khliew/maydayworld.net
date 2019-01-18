import { Song, Title } from '.';

export class Album {
  albumId: string;
  title: Title;
  releaseDate?: string;
  songIds?: string[];
  songs: Song[];
}
