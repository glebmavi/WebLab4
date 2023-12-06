import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../_services/auth.service";
import {StorageService} from "../_services/storage.service";
import {ThemeService} from "../_services/theme.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  providers: [AuthService, StorageService, ThemeService],
  templateUrl: './header.component.html',
  styleUrl: './header.component.less'
})
export class HeaderComponent {
  constructor(private authService: AuthService, private storageService: StorageService, private router: Router, private themeService: ThemeService) {}

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
  }
}
