import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  userName: string | undefined;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    const url = 'http://localhost:8080/WebProgLab4/user';

    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + sessionStorage.getItem('token')
    });

    const options = { headers: headers };

    this.http.post<any>(url, {}, options)
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            alert('Unauthorized');
          }
          return error;
        })
      )
      .subscribe((principal: any) => {
        this.userName = principal['name'];
      });
  }

  logout() {
    sessionStorage.setItem('token', '');
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return Error(
      'Something bad happened; please try again later.');
  };
}
