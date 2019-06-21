import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Album } from '../model';
import { DataService } from '../services/data.service';
import { FirestoreCache } from '../services/firestore-cache.service';

@Injectable({
  providedIn: 'root',
})
export class AlbumResolverService implements Resolve<Album> {
  constructor(private dataService: DataService, private fsCache: FirestoreCache) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Album> | Observable<never> {
    const albumId = route.paramMap.get('albumId');

    const cached = this.fsCache.get<Album>(albumId);

    return !!cached ? of(cached) : this.dataService.getAlbum(albumId).pipe(
      mergeMap(album => {
        this.fsCache.put(album.id, album);
        if (album) {
          return of(album);
        } else {
          return EMPTY;
        }
      })
    );
  }
}
