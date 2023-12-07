import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {ThemeService} from "./_services/theme.service";
import {StorageService} from "./_services/storage.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HeaderComponent, FooterComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less'
})
export class AppComponent implements OnInit {
  currentTheme: string = this.storageService.getTheme() || 'theme-light';

  constructor(private themeService: ThemeService, private storageService: StorageService) {}

  ngOnInit() {
    this.themeService.setCurrentTheme(this.currentTheme);

    this.themeService.currentTheme$.subscribe((theme) => {
      this.currentTheme = theme;
      this.storageService.setTheme(theme);
      console.log('Current theme:', this.currentTheme);
    });
  }
}
