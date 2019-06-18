export class SectionsParser {
  public parse(input: string) {
    const sections = new Array();
    const tokens = input.split('\n');

    while (tokens.length > 0) {
      const token = tokens.shift();

      switch (token) {
        case 'S': {
          sections.push(this.createSection(tokens));
          break;
        }
        default: {
          // ignore token
          break;
        }
      }
    }

    return sections;
  }

  createSection(tokens: string[]) {
    const section = { type: '', albumIds: [] };
    section.type = tokens.shift().trim();

    while (tokens.length > 0) {
      const token = tokens.shift().trim();
      if (token !== '') {
        section.albumIds.push(token);
      } else {
        break;
      }
    }

    return section;
  }
}
