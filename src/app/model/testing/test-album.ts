import { Album } from '../album';

export function getTestAlbum(): Album {
  return {
    albumId: 'albumId',
    title: {
      chinese: { zht: 'zht', zhp: 'zhp', eng: 'eng' },
      english: 'english'
    },
    releaseDate: '1999-07-07',
    songs: [
      {
        songId: 'songId1',
        title: {
          chinese: { zht: 'songZht1', zhp: 'songZhp1', eng: 'songEng1' },
          english: 'songEnglish1'
        },
        lyrics: []
      },
      {
        songId: 'songId2',
        title: {
          chinese: { zht: 'songZht2', zhp: 'songZhp2', eng: 'songEng2' },
          english: 'songEnglish2'
        },
        lyrics: []
      },
      {
        songId: 'songId3',
        title: {
          chinese: { zht: 'songZht3', zhp: 'songZhp3', eng: 'songEng3' },
          english: 'songEnglish3'
        },
        disabled: true,
        lyrics: []
      },
      {
        songId: 'songId4',
        title: {
          chinese: { zht: 'songZht4', zhp: 'songZhp4', eng: 'songEng4' },
          english: 'songEnglish4'
        },
        lyrics: []
      }
    ]
  };
}
