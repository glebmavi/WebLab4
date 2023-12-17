import {Component, Inject, LOCALE_ID, OnInit} from '@angular/core';
import {NavigationStart, Router, RouterLink} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {StorageService} from "../_services/storage.service";
import {ThemeService} from "../_services/theme.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    NgIf,
    FormsModule,
    NgForOf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent implements OnInit {
  locales = [
    { code: 'en', name: 'English 🇬🇧' },
    { code: 'ru', name: 'Русский 🇷🇺' },
    { code: 'es', name: 'Español 🇨🇴' },
  ];

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,
    private themeService: ThemeService,
    @Inject(LOCALE_ID) public activeLocale : string
  ) {}

  theme = "";
  isLoggedIn = false;
  dimension = 30;
  showSelect = true;
  currentRoute = '';

  ngOnInit() {
    this.authService.isLoggedIn.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.theme = theme;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.currentRoute = event.url;
      }
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

  toggleShowSelect() {
    this.showSelect = !this.showSelect;
  }

  changeLanguage() {
    window.location.href = `../${this.activeLocale}/#` + this.currentRoute;
  }
}
