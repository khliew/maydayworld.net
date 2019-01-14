import { Album } from '.';

export class Discography {
  artist: string;
  discography: [
    {
      section: string;
      albums: Album[];
    }
  ];
}
