import { Injectable } from '@angular/core';

const ACCESS_TOKEN = "access_token";
const REFRESH_TOKEN = "refresh_token";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  cleanTokens(): void {
    window.sessionStorage.clear();
  }

  public saveTokens(accessToken: string, refreshToken: string): void {
    this.cleanTokens();
    window.sessionStorage.setItem(ACCESS_TOKEN, accessToken);
    window.sessionStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  public isLoggedIn(): boolean {
    const hasToken = window.sessionStorage.getItem(ACCESS_TOKEN);
    return !!hasToken;
  }

  public getAccessToken(): string | null {
    return window.sessionStorage.getItem(ACCESS_TOKEN);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(REFRESH_TOKEN);
  }

  public getTheme(): string | null {
    return window.localStorage.getItem('theme');
  }

  public setTheme(theme: string): void {
    window.localStorage.setItem('theme', theme);
  }
}
