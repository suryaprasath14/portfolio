import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer-wrapper">
      <div class="cyber-container footer-inner">
        
        <!-- Top Status Bar -->
        <div class="telemetry-bar font-mono">
          <div class="telemetry-item">
            <span class="telemetry-dot"></span>
            <span>SYSTEM_NODE: ONLINE (LAT: 11.0168° N, LON: 76.9558° E)</span>
          </div>
          <div class="telemetry-item">
            <span>ENGINE: ANGULAR 21.1 • RXJS • SCSS • STANDALONE</span>
          </div>
          <button 
            type="button" 
            class="back-top-btn font-mono" 
            (click)="scrollToTop()"
            (mouseenter)="audio.playHover()">
            <span>BACK TO TOP ↑</span>
          </button>
        </div>

        <!-- Main Footer Content -->
        <div class="footer-main">
          <div class="brand-block">
            <div class="brand-logo font-mono">
              <span class="bracket">&lt;</span>
              <span class="name">SURYA</span>
              <span class="accent">.DEV</span>
              <span class="bracket">/&gt;</span>
            </div>
            <p class="brand-desc">
              Senior Front-End Developer with 4+ years architecting responsive single-page applications, modular enterprise portals, and high-velocity web experiences.
            </p>
          </div>

          <!-- Quick Navigation -->
          <div class="footer-nav font-mono">
            <span class="nav-title">SITEMAP</span>
            <div class="links-list">
              <a href="#about" (click)="scrollTo('#about', $event)">01. About Me</a>
              <a href="#architecture" (click)="scrollTo('#architecture', $event)">02. Architecture Lab</a>
              <a href="#projects" (click)="scrollTo('#projects', $event)">03. Case Studies</a>
              <a href="#skills" (click)="scrollTo('#skills', $event)">04. Skill Matrix</a>
              <a href="#experience" (click)="scrollTo('#experience', $event)">05. Career Journey</a>
              <a href="#contact" (click)="scrollTo('#contact', $event)">06. Get In Touch</a>
            </div>
          </div>

          <!-- Direct Channels -->
          <div class="footer-social font-mono">
            <span class="nav-title">CONNECT</span>
            <div class="links-list">
              <a [href]="data.profile.linkedin" target="_blank" rel="noopener">LinkedIn Profile ↗</a>
              <a [href]="'mailto:' + data.profile.email">Suryaskprasath14&#64;gmail.com</a>
              <a [href]="'tel:' + data.profile.phone">+91 8300066557</a>
              <span class="loc-tag">Coimbatore, Tamil Nadu, India</span>
            </div>
          </div>
        </div>

        <!-- Bottom Copyright Strip -->
        <div class="copyright-row font-mono">
          <span>&copy; {{ currentYear }} K. Surya Prasath. Engineered with Angular &amp; TypeScript.</span>
          <span class="tag-credit">Optimized for 60FPS Performance &amp; WCAG AA Accessibility</span>
        </div>

      </div>
    </footer>
  `,
  styles: [`
    .footer-wrapper {
      position: relative;
      background: rgba(4, 6, 10, 0.95);
      border-top: 1px solid var(--border-glass);
      padding: 60px 0 30px;
      z-index: 10;
    }
    .footer-inner {
      display: flex;
      flex-direction: column;
      gap: 40px;
    }
    .telemetry-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 20px;
      background: rgba(13, 18, 30, 0.7);
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      font-size: 0.72rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 12px;
    }
    .telemetry-item {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .telemetry-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #38ef7d;
      box-shadow: 0 0 8px #38ef7d;
    }
    .back-top-btn {
      background: transparent;
      border: 1px solid var(--border-bright);
      color: var(--text-dim);
      padding: 5px 12px;
      border-radius: 6px;
      font-size: 0.7rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .back-top-btn:hover {
      background: var(--theme-tag-bg);
      border-color: var(--theme-primary);
      color: var(--theme-primary);
    }

    .footer-main {
      display: grid;
      grid-template-columns: 1.5fr 1fr 1fr;
      gap: 40px;
    }
    .brand-block {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .brand-logo {
      font-size: 1.35rem;
      font-weight: 800;
      color: #ffffff;
    }
    .bracket { color: var(--theme-primary); }
    .accent { color: var(--theme-primary); }
    .brand-desc {
      font-size: 0.88rem;
      color: var(--text-dim);
      max-width: 420px;
      line-height: 1.6;
    }

    .footer-nav, .footer-social {
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .nav-title {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--theme-primary);
      letter-spacing: 0.08em;
    }
    .links-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .links-list a {
      font-size: 0.8rem;
      color: var(--text-dim);
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .links-list a:hover {
      color: #ffffff;
      transform: translateX(4px);
    }
    .loc-tag {
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 4px;
    }

    .copyright-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 24px;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      font-size: 0.72rem;
      color: var(--text-muted);
      flex-wrap: wrap;
      gap: 12px;
    }
    .tag-credit {
      color: var(--theme-primary);
    }

    @media (max-width: 768px) {
      .footer-main {
        grid-template-columns: 1fr;
      }
      .telemetry-bar {
        flex-direction: column;
        align-items: flex-start;
      }
    }
  `]
})
export class FooterComponent {
  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);
  public currentYear = new Date().getFullYear();

  public scrollToTop() {
    this.audio.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public scrollTo(selector: string, e: Event) {
    e.preventDefault();
    this.audio.playClick();
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
