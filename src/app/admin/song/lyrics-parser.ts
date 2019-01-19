import { Line } from '../../model';

export class LyricsParser {
  public parse(lyrics: string): Line[] {
    const lines = new Array();
    const tokens = lyrics.split('\n');

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

    line.zht = tokens.shift().trimRight();
    line.zhp = tokens.shift().trimRight();
    line.eng = tokens.shift().trimRight();

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
    line.text = tokens.shift().trimRight();
    return line;
  }
}
