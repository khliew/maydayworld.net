import { Line } from '../../model';

export class LyricsParser {
  parse(lyrics: string): Line[] {
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

  private createLyric(tokens: string[]): Line {
    const line = new Line();
    line.type = 'lyric';

    line.zht = this.getNextToken(tokens).trimRight();
    line.zhp = this.getNextToken(tokens).trimRight();
    line.eng = this.getNextToken(tokens).trimRight();

    return line;
  }

  private getNextToken(tokens: string[], defaultValue = ''): string {
    const token = tokens.shift();
    return typeof token !== 'undefined' ? token : defaultValue;
  }

  private createBreak(): Line {
    const line = new Line();
    line.type = 'break';
    return line;
  }

  private createText(tokens: string[]): Line {
    const line = new Line();
    line.type = 'text';
    line.text = this.getNextToken(tokens).trimRight();
    return line;
  }
}
