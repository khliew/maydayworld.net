import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { Song } from '../model';

@Injectable({
  providedIn: 'root',
})
export class SongResolverService implements Resolve<Song> {
  constructor(private dataService: DataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Song> | Observable<never> {
    const songId = route.paramMap.get('songId');

    return this.dataService.getSong(songId).pipe(
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
