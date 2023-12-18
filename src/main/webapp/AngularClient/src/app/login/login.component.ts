import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {StorageService} from "../_services/storage.service";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {LoginRequest} from "../model/LoginRequest";
import {ThemeService} from "../_services/theme.service";
import {TokenResponse} from "../model/TokenResponse";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    RouterLink,
    NgOptimizedImage,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'
})
export class LoginComponent implements OnInit {
  form: LoginRequest = {
    username: "",
    password: ""
  };
  username: string | undefined;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  showPassword = false;
  theme = '';

  constructor(public authService: AuthService, private storageService: StorageService, private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.theme = theme;
    });

    if (this.authService.getLoggedIn()) {
      console.log('User already logged in');
      this.username = this.storageService.getUsername() ?? '';
      this.sendToMainPage();
    } else if (this.storageService.getRefreshToken()) {
      this.authService.refreshToken(<string>this.storageService.getRefreshToken()).subscribe({
        next: response => {
          console.log('Token refreshed');
          this.onLoggedIn(response, <string>this.storageService.getUsername());
          },
        error: error => {
          console.error('Token refresh failed, logging out', error);
          this.authService.logout();
          this.storageService.cleanTokens();
          this.router.navigate(['/login']);
        }
        });

    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.onLoggedIn(data, username);
      },
      error: err => {
        this.errorMessage = $localize`Bad request`;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    });
  }

  sendToMainPage(): void {
    this.router.navigate(['/main']);
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  onLoggedIn(response: TokenResponse, username: string): void {
    this.storageService.saveTokens(response.accessToken, response.refreshToken, response.username);
    this.authService.setLoggedIn(true);
    this.isLoginFailed = false;
    this.username = username;
    this.sendToMainPage();
  }
}
