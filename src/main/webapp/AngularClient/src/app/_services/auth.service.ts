import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {TokenResponse} from "../model/TokenResponse";

const AUTH_API = 'http://localhost:8080/WebProgLab4/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  public isLoggedIn = new BehaviorSubject(false);

  login(username: string, password: string): Observable<TokenResponse> {
    this.setLoggedIn(true);
    return this.http.post<TokenResponse>(
      AUTH_API + 'login',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, password: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      AUTH_API + 'register',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    this.setLoggedIn(false);
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

  refreshToken(refreshToken: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(AUTH_API + 'refresh', {
      refreshToken
    }, httpOptions);
  }

  setLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getLoggedIn() {
    return this.isLoggedIn.value;
  }
}
