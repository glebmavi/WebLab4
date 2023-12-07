import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor() { }

  public currentThemeSubject = new BehaviorSubject<string>("");
  toggleTheme() {
    const currentTheme = this.currentThemeSubject.value === 'theme-light' ? 'theme-dark' : 'theme-light';
    this.setCurrentTheme(currentTheme);
  }

  getCurrentTheme() {
    return this.currentThemeSubject.value;
  }

  setCurrentTheme(theme: string) {
    if (theme !== this.currentThemeSubject.value) {
      this.currentThemeSubject.next(theme);
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
