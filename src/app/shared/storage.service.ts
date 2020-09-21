import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
  }

  set(key: string, value: any, permanent: boolean = false): void {
    if (permanent) {
      localStorage.setItem(key, this.encode(value));
    } else {
      sessionStorage.setItem(key, this.encode(value));
    }
  }

  get(key: string): any | undefined {
    return this.decode(localStorage.getItem(key)) !== null && typeof this.decode(localStorage.getItem(key)) !== 'undefined' ? this.decode(localStorage.getItem(key)) : this.decode(sessionStorage.getItem(key));
  }

  has(key: string): boolean {
    return (localStorage.getItem(key) !== null) || (sessionStorage.getItem(key) !== null);
  }

  clear(permanent: boolean = false): void {
    if (permanent) {
      localStorage.clear();
    }
    sessionStorage.clear();
  }

  remove(key: string): void {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }

  all(): any {
    return {...sessionStorage, ...localStorage};
  }

  private decode(value: string): any {
    try {
      return JSON.parse(value);
    } catch (e) {
      return undefined;
    }
  }

  private encode(value: any): string {
    return JSON.stringify(value);
  }


}
