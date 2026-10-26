import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type CyberTheme = 'magenta' | 'cyan' | 'violet' | 'emerald' | 'amber';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private platformId = inject(PLATFORM_ID);
  public currentTheme = signal<CyberTheme>('magenta');

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const savedTheme = localStorage.getItem('surya_cyber_theme') as CyberTheme;
      if (savedTheme && ['magenta', 'cyan', 'violet', 'emerald', 'amber'].includes(savedTheme)) {
        this.currentTheme.set(savedTheme);
      } else {
        this.currentTheme.set('magenta');
      }
      this.applyTheme(this.currentTheme());
    }

    effect(() => {
      const theme = this.currentTheme();
      if (isPlatformBrowser(this.platformId)) {
        this.applyTheme(theme);
        localStorage.setItem('surya_cyber_theme', theme);
      }
    });
  }

  public setTheme(theme: CyberTheme) {
    this.currentTheme.set(theme);
  }

  private applyTheme(theme: CyberTheme) {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }
}
