import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Album, Song } from '../model';
import { SongService } from './song.service';

@Injectable({
  providedIn: 'root',
})
export class SongResolverService implements Resolve<Song> {
  constructor(private songService: SongService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Observable<never> {
    const songId = route.paramMap.get('songId');

    return this.songService.getSongLyrics(songId).pipe(
      take(1),
      mergeMap(song => {
        if (song) {
          return of(song);
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}
