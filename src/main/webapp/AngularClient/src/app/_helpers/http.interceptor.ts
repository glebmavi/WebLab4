import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap} from "rxjs";
import {StorageService} from "../_services/storage.service";
import {AuthService} from "../_services/auth.service";
import {TokenResponse} from "../model/TokenResponse";
import {Router} from "@angular/router";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    const accessToken = this.storageService.getAccessToken();
    if (accessToken && !req.url.includes('refresh')) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && (error.status === 401 || error.status === 403)) {
            return this.handleInvalidToken(req, next);
          } else {
            return error;
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private handleInvalidToken(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    return this.authService.refreshToken(<string>this.storageService.getRefreshToken()).pipe(
      switchMap((response: TokenResponse) => {
        console.log('Token refreshed');
        this.storageService.saveTokens(response.accessToken, response.refreshToken, response.username);
        const cloned = req.clone({
          headers: req.headers.set('Authorization', 'Bearer ' + response.accessToken),
        });
        this.authService.setLoggedIn(true);
        return next.handle(cloned);
      }),
      catchError((error) => {
        console.error('Token refresh failed, logging out', error);
        this.authService.logout();
        console.log('Logged out successfully');
        this.storageService.cleanTokens();
        this.router.navigate(['/login']);
        return error;
      })
    );
  }

}
