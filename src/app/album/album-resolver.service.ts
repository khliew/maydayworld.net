import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { DataService } from '../data.service';
import { Album } from '../model';

@Injectable({
  providedIn: 'root',
})
export class AlbumResolverService implements Resolve<Album> {
  constructor(private dataService: DataService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> | Observable<never> {
    const albumId = route.paramMap.get('albumId');

    return this.dataService.getAlbum(albumId).pipe(
      take(1),
      mergeMap(album => {
        if (album) {
          return of(album);
        } else {
          this.router.navigate(['/']);
          return EMPTY;
        }
      })
    );
  }
}
