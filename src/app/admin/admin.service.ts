import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album, Discography, Song, SongMetadata } from '../model';
import { FirestoreService } from '../services/firestore.service';

@Injectable()
export class AdminService {
  constructor(private fss: FirestoreService, private afs: AngularFirestore) { }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    return this.fss.getDiscography(artistId);
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.fss.getAlbum(albumId);
  }

  setAlbum(albumId: string, album: Album): Observable<void> {
    return from(this.afs.doc<Album>(`albums/${albumId}`)
      .set(
        JSON.parse(JSON.stringify(album)),
        { merge: true }
      ));
  }

  setAlbumSongs(albumId: string, added: { trackNum: number, songId: string }[], deleted: string[]): Observable<void> {
    const batch = this.afs.firestore.batch();

    const promises = [];
    deleted.forEach(songId => {
      promises.push(
        batch.update(
          this.afs.doc(`songAlbums/${songId}`).ref,
          { [albumId]: firebase.firestore.FieldValue.delete() }
        )
      );
    });

    added.forEach(item => {
      promises.push(
        batch.set(
          this.afs.doc(`songAlbums/${item.songId}`).ref,
          { [albumId]: item.trackNum },
          { merge: true }
        )
      );
    });

    return from(batch.commit());
  }

  getSong(songId: string): Observable<Song> {
    return this.fss.getSong(songId);
  }

  getSongs(): Observable<SongMetadata[]> {
    return this.afs.collection<SongMetadata>('songMetadatas').get()
      .pipe(
        map(snapshot => {
          const songs = [];
          snapshot.docs.forEach(doc => songs.push(doc.data()));
          return songs;
        })
      );
  }

  setSong(songId: string, song: Song): Observable<void> {
    return from(this.afs.doc<Song>(`songs/${songId}`).set(JSON.parse(JSON.stringify(song))));
  }
}
