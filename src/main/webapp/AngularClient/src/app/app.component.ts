import {Component, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {ThemeService} from "./_services/theme.service";
import {StorageService} from "./_services/storage.service";
import {AuthService} from "./_services/auth.service";
import {HitService} from "./_services/hit.service";
import {MainComponent} from "./main/main.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HeaderComponent, HttpClientModule],
  providers: [ThemeService, StorageService, AuthService, HitService, MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  currentTheme: string = this.storageService.getTheme() || 'theme-light';

  constructor(private themeService: ThemeService, private storageService: StorageService) {}

  ngOnInit() {
    this.themeService.setCurrentTheme(this.currentTheme);

    this.themeService.currentThemeSubject.subscribe((theme) => {
      this.currentTheme = theme;
      this.storageService.setTheme(theme);
    });
  }
}
