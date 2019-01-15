import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Album } from '../model';
import { AlbumService } from './album.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumResolverService implements Resolve<Album> {
  constructor(private albumService: AlbumService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> | Observable<never> {
    const albumId = route.paramMap.get('albumId');

    return this.albumService.getAlbum(albumId).pipe(
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
