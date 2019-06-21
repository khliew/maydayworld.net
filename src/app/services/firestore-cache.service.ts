import { Injectable } from '@angular/core';

@Injectable()
export class FirestoreCache {
  private static readonly MAX_AGE = 60 * 60 * 1000; // maximum cache age (ms)

  private cache: Map<string, Cached>;

  constructor() {
    this.cache = new Map<string, Cached>();
  }


  get<T>(itemId: string) {
    const cached = this.cache.get(itemId);
    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - FirestoreCache.MAX_AGE);

    // remove item if expired
    if (isExpired) {
      this.cache.delete(itemId);
    }

    return isExpired ? undefined : cached.item as T;
  }

  put<T>(itemId: string, item: T) {
    const now = Date.now();
    this.cache.set(itemId, { id: itemId, item, lastRead: now });

    // remove expired cache items
    const expired = now - FirestoreCache.MAX_AGE;
    this.cache.forEach(entry => {
      if (entry.lastRead < expired) {
        this.cache.delete(entry.id);
      }
    });
  }
}

interface Cached {
  id: string;
  item: any;
  lastRead: number;
}
