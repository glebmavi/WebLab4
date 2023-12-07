import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
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

  login(username: string, password: string): Observable<TokenResponse> {
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
    return this.http.post(AUTH_API + 'logout', { }, httpOptions);
  }

  refreshToken(refresh_token: string): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(AUTH_API + 'refresh', {
      refresh_token
    }, httpOptions);
  }
}
