import { Component, inject, signal, HostListener, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, CyberTheme } from '../../services/theme.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header 
      class="navbar-wrapper" 
      [class.scrolled]="isScrolled()">
      <nav class="cyber-container nav-inner">
        <!-- Logo -->
        <a href="#" class="brand-link" (click)="onNavClick($event, '#')">
          <div class="brand-badge">
            <span class="brand-bracket">&lt;</span>
            <span class="brand-text">SURYA</span>
            <span class="brand-accent">.DEV</span>
            <span class="brand-bracket">/&gt;</span>
          </div>
          <div class="status-indicator">
            <span class="status-dot"></span>
            <span class="status-label">AVAILABLE</span>
          </div>
        </a>

        <!-- Desktop Navigation Links -->
        <div class="nav-links">
          <a href="#about" class="nav-item" (mouseenter)="audio.playHover()" (click)="onNavClick($event, '#about')">
            <span class="nav-num">01.</span> About
          </a>
          <a href="#architecture" class="nav-item" (mouseenter)="audio.playHover()" (click)="onNavClick($event, '#architecture')">
            <span class="nav-num">02.</span> Architecture
          </a>
          <a href="#projects" class="nav-item" (mouseenter)="audio.playHover()" (click)="onNavClick($event, '#projects')">
            <span class="nav-num">03.</span> Projects
          </a>
          <a href="#skills" class="nav-item" (mouseenter)="audio.playHover()" (click)="onNavClick($event, '#skills')">
            <span class="nav-num">04.</span> Skills
          </a>
          <a href="#experience" class="nav-item" (mouseenter)="audio.playHover()" (click)="onNavClick($event, '#experience')">
            <span class="nav-num">05.</span> Journey
          </a>
          <a href="#contact" class="nav-item" (mouseenter)="audio.playHover()" (click)="onNavClick($event, '#contact')">
            <span class="nav-num">06.</span> Contact
          </a>
        </div>

        <!-- Controls: Sound, Theme, Terminal, Mobile Menu -->
        <div class="nav-actions">
          <!-- Terminal Trigger Button -->
          <button 
            type="button" 
            class="action-btn terminal-btn" 
            (click)="toggleTerminal()"
            (mouseenter)="audio.playHover()"
            title="Open Interactive Developer CLI (Press ~)">
            <span class="btn-icon">&gt;_</span>
            <span class="btn-text">CLI</span>
          </button>

          <!-- Audio FX Toggle -->
          <button 
            type="button" 
            class="action-btn icon-only-btn" 
            [class.muted]="audio.isMuted()"
            (click)="toggleSound()"
            (mouseenter)="audio.playHover()"
            [title]="audio.isMuted() ? 'Enable Cyber Sound Effects' : 'Mute Sound Effects'">
            @if (audio.isMuted()) {
              <!-- Muted Icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="1" y1="1" x2="23" y2="23"></line>
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
                <line x1="12" y1="19" x2="12" y2="23"></line>
                <line x1="8" y1="23" x2="16" y2="23"></line>
              </svg>
            } @else {
              <!-- Sound Waves Icon -->
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            }
          </button>

          <!-- Theme Palette Selector -->
          <div class="theme-picker">
            <button 
              type="button" 
              class="theme-dot magenta" 
              [class.active]="themeService.currentTheme() === 'magenta'"
              (click)="changeTheme('magenta')" 
              title="Neon Magenta / Rose Theme">
            </button>
            <button 
              type="button" 
              class="theme-dot cyan" 
              [class.active]="themeService.currentTheme() === 'cyan'"
              (click)="changeTheme('cyan')" 
              title="Cyan Neon Theme">
            </button>
            <button 
              type="button" 
              class="theme-dot violet" 
              [class.active]="themeService.currentTheme() === 'violet'"
              (click)="changeTheme('violet')" 
              title="Violet Cyber Theme">
            </button>
            <button 
              type="button" 
              class="theme-dot emerald" 
              [class.active]="themeService.currentTheme() === 'emerald'"
              (click)="changeTheme('emerald')" 
              title="Emerald Matrix Theme">
            </button>
            <button 
              type="button" 
              class="theme-dot amber" 
              [class.active]="themeService.currentTheme() === 'amber'"
              (click)="changeTheme('amber')" 
              title="Solar Amber Theme">
            </button>
          </div>

          <!-- Hire Me CTA -->
          <a 
            href="#contact" 
            class="nav-cta-btn" 
            (mouseenter)="audio.playHover()" 
            (click)="onNavClick($event, '#contact')">
            <span>Hire Surya</span>
          </a>

          <!-- Mobile Hamburger Toggle -->
          <button 
            type="button" 
            class="hamburger-btn" 
            [class.open]="mobileMenuOpen()"
            (click)="toggleMobileMenu()"
            aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <!-- Mobile Dropdown Menu -->
      @if (mobileMenuOpen()) {
        <div class="mobile-menu-drawer">
          <div class="mobile-links">
            <a href="#about" (click)="onNavClick($event, '#about')">01. About Me</a>
            <a href="#architecture" (click)="onNavClick($event, '#architecture')">02. Architecture &amp; Performance</a>
            <a href="#projects" (click)="onNavClick($event, '#projects')">03. Key Projects</a>
            <a href="#skills" (click)="onNavClick($event, '#skills')">04. Technical Skills</a>
            <a href="#experience" (click)="onNavClick($event, '#experience')">05. Experience</a>
            <a href="#contact" (click)="onNavClick($event, '#contact')">06. Contact &amp; Connect</a>
          </div>
          <div class="mobile-footer-actions">
            <button class="cyber-btn" (click)="toggleTerminal(); mobileMenuOpen.set(false)">
              &gt;_ Open Dev CLI
            </button>
          </div>
        </div>
      }
    </header>
  `,
  styles: [`
    .navbar-wrapper {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      padding: 18px 0;
    }
    .navbar-wrapper.scrolled {
      padding: 10px 0;
      background: rgba(6, 8, 13, 0.82);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border-glass);
      box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.8);
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 20px;
    }
    .brand-link {
      display: flex;
      align-items: center;
      gap: 14px;
      text-decoration: none;
    }
    .brand-badge {
      font-family: var(--font-mono);
      font-weight: 700;
      font-size: 1.15rem;
      letter-spacing: -0.02em;
      color: #fff;
      display: flex;
      align-items: center;
    }
    .brand-bracket {
      color: var(--theme-primary);
      opacity: 0.8;
    }
    .brand-text {
      color: #ffffff;
      margin: 0 1px;
    }
    .brand-accent {
      color: var(--theme-primary);
    }
    .status-indicator {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 3px 8px;
      background: rgba(56, 239, 125, 0.1);
      border: 1px solid rgba(56, 239, 125, 0.25);
      border-radius: 9999px;
    }
    .status-dot {
      width: 7px;
      height: 7px;
      background: #38ef7d;
      border-radius: 50%;
      box-shadow: 0 0 10px #38ef7d;
      animation: pulse-ring 2s infinite ease-in-out;
    }
    .status-label {
      font-size: 0.65rem;
      font-family: var(--font-mono);
      font-weight: 700;
      color: #38ef7d;
      letter-spacing: 0.05em;
    }
    .nav-links {
      display: flex;
      align-items: center;
      gap: 24px;
    }
    .nav-item {
      font-size: 0.86rem;
      font-family: var(--font-mono);
      color: var(--text-dim);
      text-decoration: none;
      transition: all 0.2s ease;
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .nav-num {
      color: var(--theme-primary);
      font-size: 0.75rem;
      font-weight: 600;
    }
    .nav-item:hover {
      color: #ffffff;
      transform: translateY(-1px);
    }
    .nav-actions {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .action-btn {
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--text-dim);
      border-radius: 8px;
      padding: 7px 12px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s ease;
    }
    .action-btn:hover {
      background: rgba(255, 255, 255, 0.1);
      border-color: var(--theme-primary);
      color: var(--theme-primary);
    }
    .action-btn.icon-only-btn {
      padding: 7px;
    }
    .action-btn.muted {
      color: var(--text-muted);
      border-color: rgba(255, 255, 255, 0.05);
    }
    .terminal-btn {
      background: var(--theme-tag-bg);
      border-color: var(--theme-primary);
      color: var(--theme-primary);
    }
    .theme-picker {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 4px 6px;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border-glass);
      border-radius: 20px;
    }
    .theme-dot {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 1.5px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .theme-dot.magenta { background: #ff0055; }
    .theme-dot.cyan { background: #00f2fe; }
    .theme-dot.violet { background: #b800e6; }
    .theme-dot.emerald { background: #00ff88; }
    .theme-dot.amber { background: #ff9900; }
    .theme-dot.active {
      transform: scale(1.25);
      border-color: #ffffff;
      box-shadow: 0 0 8px currentColor;
    }
    .nav-cta-btn {
      display: inline-flex;
      align-items: center;
      padding: 8px 18px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.04em;
      text-decoration: none;
      color: #000;
      background: var(--theme-primary);
      border-radius: 8px;
      box-shadow: 0 0 15px -3px var(--theme-glow);
      transition: all 0.25s var(--ease-spring);
    }
    .nav-cta-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 25px var(--theme-glow-strong);
    }
    .hamburger-btn {
      display: none;
      flex-direction: column;
      gap: 5px;
      background: transparent;
      border: none;
      cursor: pointer;
      padding: 6px;
    }
    .hamburger-btn span {
      display: block;
      width: 22px;
      height: 2px;
      background: #ffffff;
      transition: all 0.3s ease;
    }
    .hamburger-btn.open span:nth-child(1) {
      transform: translateY(7px) rotate(45deg);
    }
    .hamburger-btn.open span:nth-child(2) {
      opacity: 0;
    }
    .hamburger-btn.open span:nth-child(3) {
      transform: translateY(-7px) rotate(-45deg);
    }

    .mobile-menu-drawer {
      display: none;
      background: rgba(6, 8, 13, 0.96);
      backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--border-glass);
      padding: 24px;
      flex-direction: column;
      gap: 20px;
    }
    .mobile-links {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .mobile-links a {
      color: var(--text-main);
      font-family: var(--font-mono);
      font-size: 1.05rem;
      text-decoration: none;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }

    @media (max-width: 1024px) {
      .nav-links {
        display: none;
      }
      .hamburger-btn {
        display: flex;
      }
      .mobile-menu-drawer {
        display: flex;
      }
    }
    @media (max-width: 640px) {
      .status-indicator {
        display: none;
      }
      .nav-cta-btn {
        display: none;
      }
    }
  `]
})
export class NavbarComponent {
  public themeService = inject(ThemeService);
  public audio = inject(AudioService);

  public isScrolled = signal(false);
  public mobileMenuOpen = signal(false);

  @Output() terminalTriggered = new EventEmitter<void>();

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled.set(window.scrollY > 30);
  }

  public onNavClick(e: Event, href: string) {
    this.audio.playClick();
    if (href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    this.mobileMenuOpen.set(false);
  }

  public toggleTerminal() {
    this.audio.playTerminal();
    this.terminalTriggered.emit();
  }

  public toggleSound() {
    this.audio.toggleMute();
  }

  public changeTheme(theme: CyberTheme) {
    this.audio.playClick();
    this.themeService.setTheme(theme);
  }

  public toggleMobileMenu() {
    this.audio.playClick();
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
  }
}
