import { Line } from '../../model';

export class LyricsParser {
  public parse(lyrics: string): Line[] {
    const tokens = lyrics.split('\n');

    const lines = new Array();

    while (tokens.length > 0) {
      const token = tokens.shift();

      switch (token) {
        case 'L': {
          lines.push(this.createLyric(tokens));
          break;
        }
        case 'B': {
          lines.push(this.createBreak());
          break;
        }
        case 'T': {
          lines.push(this.createText(tokens));
          break;
        }
        default: {
          // ignore token
          break;
        }
      }
    }

    return lines;
  }

  createLyric(tokens: string[]): Line {
    const line = new Line();
    line.type = 'lyric';

    line.zht = tokens.shift();
    line.zhp = tokens.shift();
    line.eng = tokens.shift();

    return line;
  }

  createBreak(): Line {
    const line = new Line();
    line.type = 'break';
    return line;
  }

  createText(tokens: string[]): Line {
    const line = new Line();
    line.type = 'text';
    line.text = tokens.shift();
    return line;
  }
}
