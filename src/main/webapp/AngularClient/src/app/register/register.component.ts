import {Component, OnInit} from '@angular/core';
import {AuthService} from "../_services/auth.service";
import {NgClass, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {ThemeService} from "../_services/theme.service";

// TODO: Modificar el template
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    NgClass,
    NgOptimizedImage,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.less'
})
export class RegisterComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  showPassword = false;
  theme = '';

  constructor(private authService: AuthService, private router: Router, private themeService: ThemeService) { }

  ngOnInit(): void {
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.theme = theme;
    });

  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.register(username, password).subscribe({
      next: data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.sendToLoginPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    });
  }

  sendToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }
}
