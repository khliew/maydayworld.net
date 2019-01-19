import { Album } from '.';

export class Section {
  label: string;
  albumIds?: string[];
  albums: Album[];
}
