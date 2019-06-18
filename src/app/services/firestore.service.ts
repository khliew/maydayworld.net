import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Discography, Album, Song } from '../model';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class FirestoreService {

  constructor(private afs: AngularFirestore) { }

  getDiscography(artistId: string = 'mayday'): Observable<Discography> {
    return this.afs.doc<Discography>(`discos/${artistId}`).get()
      .pipe(
        map(snapshot => {
          if (snapshot.exists) {
            return snapshot.data() as Discography;
          } else {
            throwError(`discography not found: ${artistId}`);
          }
        })
      );
  }

  getAlbum(albumId: string): Observable<Album> {
    return this.afs.doc<Album>(`albums/${albumId}`).get()
      .pipe(
        map(snapshot => {
          if (snapshot.exists) {
            return snapshot.data() as Album;
          } else {
            throwError(`album not found: ${albumId}`);
          }
        })
      );
  }

  getSong(songId: string): Observable<Song> {
    return this.afs.doc<Song>(`songs/${songId}`).get()
      .pipe(
        map(snapshot => {
          if (snapshot.exists) {
            return snapshot.data() as Song;
          } else {
            throwError(`song not found: ${songId}`);
          }
        })
      );
  }
}
