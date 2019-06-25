import { AlbumType, Title, Track } from '.';

export class Album {
  id: string;
  type: AlbumType;
  title: Title;
  releaseDate: string;
  disabled?: boolean;
  songs: { [track: number]: Track };
}
