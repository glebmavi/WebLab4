import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent {
  // constructor(private app: AppService, private http: HttpClient, private router: Router) {
  //   this.app.authenticate(undefined, undefined);
  // }
  // logout() {
  //   this.http.post('logout', {}).pipe(
  //     finalize(() => {
  //       this.app.authenticated = false;
  //       this.router.navigateByUrl('/login');
  //     })
  //   ).subscribe();
  // }

}
