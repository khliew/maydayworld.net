import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { Album } from '../model';
import { DataService } from '../services/data.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumResolverService implements Resolve<Album> {
  constructor(private dataService: DataService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> | Observable<never> {
    const albumId = route.paramMap.get('albumId');

    return this.dataService.getAlbum(albumId).pipe(
      take(1),
      mergeMap(album => {
        if (!!album && !album.disabled) {
          return of(album);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
