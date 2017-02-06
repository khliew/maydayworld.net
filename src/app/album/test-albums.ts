import { Album, SongTag } from '../model';
import { SONG_TAGS } from '../song/test-songs';

export var ALBUMS: Album[] = [
  { id: '8', name: '第二人生 Second Round', songs: null },
  { id: '9', name: '自傳 History of Tomorrow', songs: SONG_TAGS }
];
