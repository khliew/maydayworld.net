import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, from, combineLatest } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Album, Discography, Song } from '../model';
import { EnvironmentService } from '../services/environment.service';
import { RequestCache } from '../services/request-cache.service';
import { FirestoreService } from '../services/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

@Injectable()
export class AdminService {
  baseUrl: string;

  constructor(
    private fss: FirestoreService,
    private afs: AngularFirestore,
    private http: HttpClient,
    environmentService: EnvironmentService
  ) {
    this.baseUrl = environmentService.env.apiBaseUrl;
  }

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

  getSongs(): Observable<Song[]> {
    return this.afs.collection<Song>('songs').get()
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
