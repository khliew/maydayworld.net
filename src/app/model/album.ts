import { Track } from './track';

export class Album {
  id: string;
  title: {
    zht: string;
    eng: string;
  };
  releaseDate?: string;
  tracks: Track[];
}
