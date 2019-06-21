import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Song } from '../model';
import { DataService } from '../services/data.service';
import { FirestoreCache } from '../services/firestore-cache.service';

@Injectable({
  providedIn: 'root',
})
export class SongResolverService implements Resolve<Song> {
  constructor(private dataService: DataService, private fsCache: FirestoreCache) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Observable<never> {
    const songId = route.paramMap.get('songId');

    const cached = this.fsCache.get<Song>(songId);

    return !!cached ? of(cached) : this.dataService.getSong(songId).pipe(
      mergeMap(song => {
        this.fsCache.put(song.id, song);
        if (song) {
          return of(song);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
