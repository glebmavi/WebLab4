import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {StorageService} from "../_services/storage.service";
import {ThemeService} from "../_services/theme.service";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private themeService: ThemeService) {}

  theme = "";
  isLoggedIn = false;
  dimension = 30;

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.theme = theme;
    });
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        console.log('Logged out successfully');
        this.storageService.cleanTokens();
        this.router.navigate(['/start']);
      },
      error: (err) => {
        console.error('Logout error:', err);
      }
    });
  }

  toggleTheme() {
    this.themeService.toggleTheme();
    this.storageService.setTheme(this.themeService.getCurrentTheme());

    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.theme = theme;
    });

  }
}
