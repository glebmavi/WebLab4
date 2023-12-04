import { Injectable } from '@angular/core';

const TOKEN_KEY = "jwt_token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    this.clean();
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public isLoggedIn(): boolean {
    const hasToken = window.sessionStorage.getItem(TOKEN_KEY);
    return !!hasToken;


  }
}
