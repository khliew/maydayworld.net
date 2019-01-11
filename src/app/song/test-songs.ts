import { Lyrics, SongTag } from '../model';

export const SONG_TAGS: SongTag[] = [
  {id: 'wr05', title: '溫柔 (還你自由版)', composers: ['composer'], lyricists: ['lyricist']},
  {id: 'jjl', title: '將軍令', composers: ['composer'], lyricists: ['lyricist']},
  {id: 'hldwm', title: '後來的我們', composers: ['composer'], lyricists: ['lyricist']}
];

export const SONG_LYRICS: Lyrics[] = [
  {
    id: 'hldwm',
    cht: `後來的我們
          然後呢`,
    eng: `Us, Afterwards
          And then?`,
    pinyin: `hou lai de wo men
             ran hou ne`
  }
];
