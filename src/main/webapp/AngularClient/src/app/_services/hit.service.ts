import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {HitResponse} from "../model/HitResponse";

const HIT_API = 'http://localhost:8080/WebProgLab4/api/hit';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HitService {

  constructor(private http: HttpClient) {}

  getHits(): Observable<HitResponse[]> {
    return this.http.get<HitResponse[]>(HIT_API, httpOptions);
  }

  postHit(x: number, y: number, r: number): Observable<HitResponse> {
    return this.http.post<HitResponse>(HIT_API,{x, y, r}, httpOptions);
  }

  deleteHits(): Observable<any> {
    return this.http.delete(HIT_API, httpOptions);
  }

}
