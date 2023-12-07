import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {StorageService} from "../_services/storage.service";
import {NgClass, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {LoginRequest} from "../model/LoginRequest";

// TODO: Modificar el template
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
  ],
  providers: [AuthService, StorageService],
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

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.username = this.storageService.getUsername() ?? '';
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveTokens(data.accessToken, data.refreshToken, data.username);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.username = username;
        this.sendToMainPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  sendToMainPage(): void {
    this.router.navigate(['/main']);
  }
}
