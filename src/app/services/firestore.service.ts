import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';

@Injectable()
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    // subscribe to snapshotChanges() instead of get() to get cached value first
    return this.afs.doc<Discography>(`discos/${artistId}`).snapshotChanges()
      .pipe(
        map(action => action.payload),
        map(snapshot => {
          if (snapshot.exists) {
            return snapshot.data();
          } else {
            throwError(`discography not found: ${artistId}`);
          }
        })
      );
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.afs.doc<Album>(`albums/${albumId}`).snapshotChanges()
      .pipe(
        map(action => action.payload),
        map(snapshot => {
          if (snapshot.exists) {
            return snapshot.data();
          } else {
            throwError(`album not found: ${albumId}`);
          }
        })
      );
  }

  getSong(songId: string): Observable<Song> {
    return this.afs.doc<Song>(`songs/${songId}`).snapshotChanges()
      .pipe(
        map(action => action.payload),
        map(snapshot => {
          if (snapshot.exists) {
            return snapshot.data();
          } else {
            throwError(`song not found: ${songId}`);
          }
        })
      );
  }
}
