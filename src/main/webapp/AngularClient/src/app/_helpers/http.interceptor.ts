import {Injectable} from "@angular/core";
import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from "@angular/common/http";
import {catchError, Observable, switchMap} from "rxjs";
import {StorageService} from "../_services/storage.service";
import {AuthService} from "../_services/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(private storageService: StorageService, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {

    if (this.storageService.getAccessToken()) {
      const cloned = req.clone({
        withCredentials: true,
        headers: req.headers.set('Authorization', 'Bearer ' + this.storageService.getAccessToken()),
      });

      return next.handle(cloned).pipe(
        catchError((error) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next);
          } else {
            return error;
          }
        })
      );
    } else {
      return next.handle(req);
    }
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> | any {
    return this.authService.refreshToken(<string>this.storageService.getRefreshToken()).pipe(
      switchMap((response: any) => {
        this.storageService.saveTokens(response.access_token, response.refresh_token);
        const cloned = req.clone({
          withCredentials: true,
          headers: req.headers.set('Authorization', 'Bearer ' + response.access_token),
        });
        return next.handle(cloned);
      }),
      catchError((error) => {
        console.error('Token refresh failed, logging out', error);
        this.authService.logout();
        return error;
      })
    );
  }

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];
