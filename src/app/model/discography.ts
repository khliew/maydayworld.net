import { Album } from '.';

export class Discography {
  artist: string;
  sections: [
    {
      label: string;
      albums: Album[];
    }
  ];
}
