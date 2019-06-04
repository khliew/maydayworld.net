import { Discography } from '../discography';

export function getTestDiscography(): Discography {
  return {
    artistId: 'artistId', sections: [
      {
        label: 'label1', albums: [
          {
            albumId: 'album1',
            releaseDate: '2018-04-20',
            title: { chinese: { zht: 'zht1', zhp: 'zhp1', eng: 'eng1' }, english: 'english1' },
            songs: []
          },
          {
            albumId: 'album2',
            releaseDate: '2013-08-24',
            title: { chinese: { zht: 'zht2', zhp: 'zhp2', eng: 'eng2' }, english: 'english2' },
            songs: []
          },
          {
            albumId: 'album3',
            releaseDate: '1999-12-31',
            title: { chinese: { zht: 'zht3', zhp: 'zhp3', eng: 'eng3' }, english: 'english3' },
            songs: []
          },
          {
            albumId: 'album4',
            releaseDate: '1987-06-18',
            title: { chinese: { zht: 'zht4', zhp: 'zhp4', eng: 'eng4' }, english: 'english4' },
            songs: []
          }
        ]
      },
      {
        label: 'label2', albums: []
      }
    ]
  };
}
