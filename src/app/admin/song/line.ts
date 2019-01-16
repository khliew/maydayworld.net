export class Line {
  type: 'lyric' | 'break' | 'text';
  text?: string;
  zht?: string;
  zhp?: string;
  eng?: string;

  constructor(type: 'lyric' | 'break' | 'text' = 'lyric') {
    this.type = type;
  }
}
