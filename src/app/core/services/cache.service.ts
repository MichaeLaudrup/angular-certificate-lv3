import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

/**
 * Service to handle caching of data in local storage.
 */
@Injectable()
export class CacheService {
  defaultExpiryInSeconds = environment.defaultExpiryInSeconds;

  constructor() {}

   /**
   * Stores an item in the local storage.
   * 
   * @param key - The key under which the value is stored.
   * @param value - The value to be stored.
   */
  setItem(key: string, value: any) {
    const item = {
      value: value,
      creation: Date.now() ,
    };
    localStorage.setItem(key, JSON.stringify(item));
  }

  /**
   * Retrieves an item from the local storage.
   * If the item has expired, it will be removed from the storage and null will be returned.
   * 
   * @param key - The key of the item to be retrieved.
   * @returns The stored value or null if the item doesn't exist or has expired.
   */
  getItem(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    const expiryTime = item.creation + this.defaultExpiryInSeconds * 1000;

    if (now > expiryTime) {
      localStorage.removeItem(key);
      return null;
    }
    
    return item.value;
  }

  /**
   * Removes an item from the local storage.
   * 
   * @param key - The key of the item to be removed.
   */
  removeItem(key:string) {
    localStorage.removeItem(key);
  }
}

