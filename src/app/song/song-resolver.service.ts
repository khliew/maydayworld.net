import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Song } from '../model';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class SongResolverService implements Resolve<Song> {
  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Observable<never> {
    const songId = route.paramMap.get('songId');

    return this.dataService.getSong(songId).pipe(
      take(1),
      mergeMap(song => {
        if (!!song && !song.disabled) {
          return of(song);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
