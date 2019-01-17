import { Album } from '.';

export class Discography {
  artistId: string;
  sections: [
    {
      label: string;
      albums: Album[];
    }
  ];
}
