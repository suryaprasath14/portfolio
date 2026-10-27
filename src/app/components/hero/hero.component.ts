import { Component, ElementRef, ViewChild, inject, signal, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';

export type PhotoChoice = 'real' | 'ai';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="about" class="hero-section">
      <div class="cyber-container hero-grid">
        
        <!-- Left Column: High-Impact Typography & CTAs -->
        <div class="hero-content">
          <!-- Terminal Status Pill -->
          <div class="terminal-pill">
            <span class="pill-dot"></span>
            <span class="pill-code font-mono">&gt; sys.profile:</span>
            <span class="pill-text">{{ animatedRole() }}</span>
            <span class="type-cursor">|</span>
          </div>

          <!-- Main Hero Headline -->
          <h1 class="hero-title">
            <span class="greeting-prefix">Hello, I'm</span> <span class="text-gradient">Surya Prasath</span>
            <span class="hero-role-display">Senior Front-End Developer &amp; Angular Architect</span>
          </h1>

          <!-- Summary Paragraph -->
          <p class="hero-summary">
            Architecting <strong class="text-white">Ultra-Fast Enterprise SPAs</strong> &amp; <strong class="text-white">Reactive Web Systems</strong> with 
            <span class="highlight-pill">{{ data.profile.experienceYears }}</span> of production experience building high-performance 
            enterprise portals, complex data dashboards, and modular Angular architectures.
          </p>

          <!-- Core Value Proposition Badges -->
          <div class="value-strip">
            <div class="value-item" (mouseenter)="audio.playHover()">
              <span class="value-num">35%</span>
              <span class="value-label">Page Load Speedup</span>
            </div>
            <div class="value-divider"></div>
            <div class="value-item" (mouseenter)="audio.playHover()">
              <span class="value-num">25+</span>
              <span class="value-label">REST APIs Integrated</span>
            </div>
            <div class="value-divider"></div>
            <div class="value-item" (mouseenter)="audio.playHover()">
              <span class="value-num">WCAG</span>
              <span class="value-label">Accessibility Standard</span>
            </div>
            <div class="value-divider"></div>
            <div class="value-item" (mouseenter)="audio.playHover()">
              <span class="value-num">v10–v18+</span>
              <span class="value-label">Angular Ecosystem</span>
            </div>
          </div>

          <!-- CTA Buttons -->
          <div class="hero-actions">
            <a 
              href="#projects" 
              class="cyber-btn" 
              (mouseenter)="audio.playHover()" 
              (click)="scrollTo('#projects', $event)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span>Explore Projects</span>
            </a>

            <a 
              href="#architecture" 
              class="cyber-btn cyber-btn-outline" 
              (mouseenter)="audio.playHover()" 
              (click)="scrollTo('#architecture', $event)">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
              <span>Architecture Lab</span>
            </a>

            <a 
              href="#contact" 
              class="connect-link" 
              (mouseenter)="audio.playHover()" 
              (click)="scrollTo('#contact', $event)">
              <span>Get In Touch &rarr;</span>
            </a>
          </div>

          <!-- Social Quick Links & Location -->
          <div class="meta-strip font-mono">
            <div class="meta-item">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              <span>{{ data.profile.location }}</span>
            </div>
            <span class="meta-separator">•</span>
            <a [href]="data.profile.linkedin" target="_blank" rel="noopener" class="meta-link" (mouseenter)="audio.playHover()">
              LinkedIn Profile
            </a>
            <span class="meta-separator">•</span>
            <a [href]="'mailto:' + data.profile.email" class="meta-link" (mouseenter)="audio.playHover()">
              {{ data.profile.email }}
            </a>
          </div>
        </div>

        <!-- Right Column: Morphing Liquid Neon Blob Avatar (Matched to User's Screenshot) -->
        <div class="hero-visual">
          
          <div 
            #blobStage
            class="blob-stage"
            (mousemove)="onStageMouseMove($event)"
            (mouseleave)="onStageMouseLeave()">

            <!-- Ambient Multi-Layer Glow behind the blob -->
            <div class="blob-ambient-glow" [class.surging]="isSurging()"></div>

            <!-- Floating Sparkle Particles around the blob (just like the reference!) -->
            <div class="spark-dot dot-1"></div>
            <div class="spark-dot dot-2"></div>
            <div class="spark-dot dot-3"></div>
            <div class="spark-dot dot-4"></div>
            <div class="spark-dot dot-5"></div>
            <div class="spark-dot dot-6"></div>

            <!-- The Main Morphing 3D Parallax Blob Wrapper -->
            <div 
              class="morph-blob-wrapper"
              [style.transform]="stageTransform()"
              (click)="triggerSurge()">

              <!-- Outer Glowing Fluid Neon Contour Ring -->
              <div class="morph-blob-ring">
                
                <!-- Inner Clipped Photo Container -->
                <div class="morph-blob-inner">
                  <img 
                    [src]="activeImageSrc()" 
                    alt="K. Surya Prasath" 
                    class="blob-photo-img"
                    loading="eager" />

                  <!-- Warm Ambient Tone Filter -->
                  <div class="blob-photo-tint"></div>
                </div>

              </div>

              <!-- Floating Interactive Tech Badge on the left perimeter -->
              <button 
                type="button" 
                class="floating-tech-pill" 
                (click)="onPlayClick($event)"
                (mouseenter)="audio.playHover()"
                title="Explore Angular Architecture">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="16 18 22 12 16 6"></polyline>
                  <polyline points="8 6 2 12 8 18"></polyline>
                </svg>
              </button>

              <!-- Floating Angular 18 Architecture Satellite -->
              <div class="satellite-pill sat-top animate-float">
                <span class="sat-icon">⚡</span>
                <span class="sat-text">Angular 18 &bull; RxJS</span>
              </div>

              <!-- Floating 35% Faster Speed Satellite -->
              <div class="satellite-pill sat-bottom animate-float" style="animation-delay: -3s;">
                <span class="sat-icon">🚀</span>
                <span class="sat-text">35% Faster SPAs</span>
              </div>

            </div>

            <!-- Photo Choice Switcher (Real Photo vs AI Cyber Avatar) -->
            <div class="blob-controls font-mono" (click)="$event.stopPropagation()">
              <span class="ctrl-label">PHOTO MODE:</span>
              <button 
                type="button" 
                class="ctrl-btn" 
                [class.active]="activePhoto() === 'real'"
                (click)="setPhoto('real')">
                STUDIO PHOTO
              </button>
              <button 
                type="button" 
                class="ctrl-btn" 
                [class.active]="activePhoto() === 'ai'"
                (click)="setPhoto('ai')">
                AI CYBER AVATAR
              </button>
            </div>

            <div class="blob-hint font-mono">
              <span>✦ Liquid neon blob animation with 3D cursor tilt &bull; Click to pulse</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      position: relative;
      min-height: 100vh;
      display: flex;
      align-items: center;
      padding-top: 140px;
      padding-bottom: 90px;
      z-index: 10;
      overflow: visible;
    }
    .hero-grid {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      align-items: center;
      gap: 50px;
    }
    .hero-content {
      display: flex;
      flex-direction: column;
      gap: 22px;
    }
    .terminal-pill {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 16px;
      background: rgba(13, 18, 30, 0.7);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-bright);
      border-radius: 9999px;
      width: fit-content;
      box-shadow: 0 0 20px -5px var(--theme-glow);
    }
    .pill-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--theme-primary);
      box-shadow: 0 0 10px var(--theme-primary);
      animation: pulse-ring 2s infinite;
    }
    .pill-code {
      color: var(--theme-primary);
      font-size: 0.8rem;
    }
    .pill-text {
      color: #ffffff;
      font-size: 0.82rem;
      font-weight: 600;
    }
    .type-cursor {
      color: var(--theme-primary);
      animation: pulse-ring 1s infinite;
      font-weight: 700;
    }
    .hero-title {
      font-size: 3.5rem;
      font-weight: 800;
      line-height: 1.1;
      letter-spacing: -0.03em;
      color: #ffffff;
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .greeting-prefix {
      color: #ffffff;
      font-weight: 800;
    }
    .hero-role-display {
      font-size: 1.85rem;
      font-weight: 600;
      color: var(--text-dim);
      letter-spacing: -0.01em;
      line-height: 1.25;
      margin-top: 4px;
    }
    .hero-summary {
      font-size: 1.12rem;
      color: var(--text-dim);
      max-width: 620px;
      line-height: 1.7;
    }
    .highlight-pill {
      color: var(--theme-primary);
      font-weight: 700;
    }
    .text-white {
      color: #ffffff;
    }
    .value-strip {
      display: flex;
      align-items: center;
      gap: 18px;
      padding: 16px 20px;
      background: rgba(15, 20, 32, 0.55);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-glass);
      border-radius: 14px;
      width: fit-content;
      margin-top: 4px;
    }
    .value-item {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .value-num {
      font-family: var(--font-mono);
      font-size: 1.25rem;
      font-weight: 800;
      color: var(--theme-primary);
      line-height: 1;
    }
    .value-label {
      font-size: 0.72rem;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      font-weight: 600;
    }
    .value-divider {
      width: 1px;
      height: 32px;
      background: var(--border-glass);
    }
    .hero-actions {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
      margin-top: 6px;
    }
    .connect-link {
      font-family: var(--font-mono);
      font-size: 0.88rem;
      color: var(--text-main);
      text-decoration: none;
      padding: 10px 14px;
      transition: all 0.2s ease;
    }
    .connect-link:hover {
      color: var(--theme-primary);
      transform: translateX(4px);
    }
    .meta-strip {
      display: flex;
      align-items: center;
      gap: 12px;
      font-size: 0.78rem;
      color: var(--text-muted);
      margin-top: 10px;
      flex-wrap: wrap;
    }
    .meta-item {
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .meta-separator {
      color: rgba(255, 255, 255, 0.2);
    }
    .meta-link {
      color: var(--text-dim);
      text-decoration: none;
      transition: color 0.2s ease;
    }
    .meta-link:hover {
      color: var(--theme-primary);
      text-decoration: underline;
    }

    /* ================= MORPHING LIQUID NEON BLOB ================= */
    .hero-visual {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
    }
    .blob-stage {
      position: relative;
      width: 460px;
      height: 520px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      perspective: 1100px;
      cursor: pointer;
    }

    /* Ambient Glow behind the blob */
    .blob-ambient-glow {
      position: absolute;
      width: 420px;
      height: 420px;
      border-radius: 50%;
      background: radial-gradient(circle, var(--theme-glow-strong) 0%, rgba(255, 0, 85, 0.2) 45%, transparent 75%);
      filter: blur(55px);
      pointer-events: none;
      z-index: 1;
      animation: pulse-ring 4s ease-in-out infinite;
      transition: transform 0.3s ease, filter 0.3s ease;
    }
    .blob-ambient-glow.surging {
      transform: scale(1.35);
      filter: blur(75px);
    }

    /* Floating Sparkle Dots around the blob (exact match to screenshot) */
    .spark-dot {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      z-index: 2;
      animation: float-sparkle 4s ease-in-out infinite;
    }
    .dot-1 {
      width: 9px;
      height: 9px;
      background: #c084fc;
      top: 16%;
      left: 10%;
      box-shadow: 0 0 12px #c084fc;
    }
    .dot-2 {
      width: 14px;
      height: 14px;
      background: #818cf8;
      top: 10%;
      right: 16%;
      box-shadow: 0 0 16px #818cf8;
      animation-delay: -1s;
    }
    .dot-3 {
      width: 7px;
      height: 7px;
      background: #ff0055;
      bottom: 28%;
      left: 4%;
      box-shadow: 0 0 10px #ff0055;
      animation-delay: -2s;
    }
    .dot-4 {
      width: 11px;
      height: 11px;
      background: #00f2fe;
      bottom: 16%;
      right: 12%;
      box-shadow: 0 0 14px #00f2fe;
      animation-delay: -3s;
    }
    .dot-5 {
      width: 8px;
      height: 8px;
      background: #f43f5e;
      top: 48%;
      right: -12px;
      box-shadow: 0 0 12px #f43f5e;
      animation-delay: -1.5s;
    }
    .dot-6 {
      width: 6px;
      height: 6px;
      background: #a855f7;
      bottom: 10%;
      left: 32%;
      box-shadow: 0 0 8px #a855f7;
      animation-delay: -2.5s;
    }

    /* 3D Parallax Container */
    .morph-blob-wrapper {
      position: relative;
      width: 410px;
      height: 460px;
      display: flex;
      align-items: center;
      justify-content: center;
      transform-style: preserve-3d;
      transition: transform 0.12s ease-out;
      z-index: 5;
    }

    /* Outer Glowing Fluid Contour Ring - Matched to User Reference */
    .morph-blob-ring {
      position: relative;
      width: 100%;
      height: 100%;
      padding: 10px;
      border: 4.5px solid var(--theme-primary);
      border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
      box-shadow: 
        0 0 30px var(--theme-primary),
        0 0 70px var(--theme-glow-strong),
        inset 0 0 25px var(--theme-glow);
      animation: morphBlob 8s ease-in-out infinite;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
      background: radial-gradient(circle at 50% 30%, rgba(255, 0, 85, 0.2) 0%, rgba(10, 14, 24, 0.8) 100%);
    }

    .morph-blob-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border-radius: inherit;
      overflow: hidden;
      background: #06080d;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .blob-photo-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: 52% 16%;
      transform: scale(1.3);
      transform-origin: 52% 20%;
      filter: contrast(1.1) brightness(1.05) saturate(1.1);
      transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.3s ease;
    }
    .morph-blob-wrapper:hover .blob-photo-img {
      transform: scale(1.38);
      filter: contrast(1.15) brightness(1.08) saturate(1.15);
    }

    .blob-photo-tint {
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 25%, rgba(255, 0, 85, 0.12) 0%, transparent 60%, rgba(0, 0, 0, 0.4) 100%);
      pointer-events: none;
    }

    /* Floating Tech Action Pill */
    .floating-tech-pill {
      position: absolute;
      left: -22px;
      top: 42%;
      width: 58px;
      height: 58px;
      border-radius: 50%;
      background: var(--theme-primary);
      border: 2px solid rgba(255, 255, 255, 0.4);
      box-shadow: 0 12px 30px var(--theme-glow), 0 0 25px var(--theme-primary);
      color: #06080d;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 25;
      transform: translateZ(50px);
      transition: all 0.25s var(--ease-spring);
      animation: float-gentle 5s ease-in-out infinite;
    }
    .floating-tech-pill:hover {
      transform: translateZ(65px) scale(1.15) translateY(-3px);
      box-shadow: 0 16px 40px var(--theme-glow-strong), 0 0 35px var(--theme-primary);
      filter: brightness(1.15);
    }
    .floating-tech-pill:active {
      transform: translateZ(50px) scale(0.95);
    }

    /* Floating Satellites */
    .satellite-pill {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: rgba(13, 18, 30, 0.92);
      backdrop-filter: blur(12px);
      border: 1px solid var(--border-bright);
      border-radius: 9999px;
      font-family: var(--font-mono);
      font-size: 0.74rem;
      font-weight: 700;
      color: #ffffff;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6), 0 0 15px var(--theme-glow);
      transform-style: preserve-3d;
      transform: translateZ(45px);
      z-index: 20;
      white-space: nowrap;
      pointer-events: none;
    }
    .sat-top {
      top: 15px;
      right: -15px;
      border-color: var(--theme-primary);
    }
    .sat-bottom {
      bottom: 25px;
      right: -25px;
      border-color: var(--theme-secondary);
    }

    /* Blob Controls */
    .blob-controls {
      margin-top: 18px;
      display: flex;
      align-items: center;
      gap: 6px;
      background: rgba(13, 18, 30, 0.85);
      backdrop-filter: blur(16px);
      padding: 5px 12px;
      border: 1px solid var(--border-glass);
      border-radius: 9999px;
      z-index: 20;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
    }
    .ctrl-label {
      font-size: 0.65rem;
      color: var(--text-muted);
      font-weight: 700;
    }
    .ctrl-btn {
      background: transparent;
      border: none;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 700;
      color: var(--text-dim);
      padding: 4px 10px;
      border-radius: 6px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .ctrl-btn:hover {
      color: #ffffff;
    }
    .ctrl-btn.active {
      background: var(--theme-primary);
      color: #06080d;
      box-shadow: 0 0 12px var(--theme-glow);
    }

    .blob-hint {
      margin-top: 8px;
      font-size: 0.65rem;
      color: var(--text-muted);
      text-align: center;
      pointer-events: none;
    }

    @media (max-width: 1024px) {
      .hero-grid {
        grid-template-columns: 1fr;
        gap: 60px;
        text-align: center;
      }
      .hero-content {
        align-items: center;
      }
      .hero-title {
        font-size: 2.8rem;
      }
      .hero-role-display {
        font-size: 1.5rem;
      }
      .hero-actions {
        justify-content: center;
      }
      .meta-strip {
        justify-content: center;
      }
      .blob-stage {
        width: 100%;
        max-width: 440px;
      }
    }

    @media (max-width: 640px) {
      .hero-title {
        font-size: 2.2rem;
      }
      .hero-role-display {
        font-size: 1.25rem;
      }
      .morph-blob-wrapper {
        width: 290px;
        height: 340px;
      }
      .floating-tech-pill {
        width: 44px;
        height: 44px;
        left: -12px;
      }
      .satellite-pill {
        display: none;
      }
      .value-strip {
        flex-wrap: wrap;
        justify-content: center;
      }
      .value-divider {
        display: none;
      }
    }
  `]
})
export class HeroComponent implements OnInit, OnDestroy {
  @ViewChild('blobStage') blobStageRef!: ElementRef<HTMLDivElement>;

  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);
  public theme = inject(ThemeService);
  private platformId = inject(PLATFORM_ID);

  public activePhoto = signal<PhotoChoice>('real');
  public stageTransform = signal<string>('perspective(1000px) rotateX(0deg) rotateY(0deg)');
  public isSurging = signal(false);

  // Dynamic Typewriter
  public animatedRole = signal<string>('Senior Angular Architect');
  private roles = [
    'Senior Front-End Developer',
    'Angular 18 & RxJS Specialist',
    'Performance Optimization Expert',
    'Enterprise Portal Architect'
  ];
  private roleIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private typeTimeout: ReturnType<typeof setTimeout> | null = null;

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.tickTypewriter();
    }
  }

  ngOnDestroy() {
    if (this.typeTimeout) clearTimeout(this.typeTimeout);
  }

  public activeImageSrc(): string {
    return this.activePhoto() === 'real' 
      ? this.data.profile.avatarOriginal 
      : this.data.profile.avatarAi;
  }

  public setPhoto(choice: PhotoChoice) {
    this.audio.playClick();
    this.activePhoto.set(choice);
  }

  public triggerSurge() {
    this.audio.playSuccess();
    this.isSurging.set(true);
    setTimeout(() => {
      this.isSurging.set(false);
    }, 700);
  }

  public onPlayClick(e: Event) {
    e.stopPropagation();
    this.audio.playSuccess();
    // Scroll smoothly to architecture lab
    const arch = document.querySelector('#architecture');
    if (arch) {
      arch.scrollIntoView({ behavior: 'smooth' });
    }
  }

  private tickTypewriter() {
    const currentFullRole = this.roles[this.roleIndex];

    if (this.isDeleting) {
      this.charIndex--;
      this.animatedRole.set(currentFullRole.substring(0, this.charIndex));
    } else {
      this.charIndex++;
      this.animatedRole.set(currentFullRole.substring(0, this.charIndex));
    }

    let speed = this.isDeleting ? 40 : 80;

    if (!this.isDeleting && this.charIndex === currentFullRole.length) {
      speed = 2200;
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.roleIndex = (this.roleIndex + 1) % this.roles.length;
      speed = 400;
    }

    this.typeTimeout = setTimeout(() => this.tickTypewriter(), speed);
  }

  public onStageMouseMove(e: MouseEvent) {
    if (!this.blobStageRef) return;
    const rect = this.blobStageRef.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    this.stageTransform.set(`perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`);
  }

  public onStageMouseLeave() {
    this.stageTransform.set('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
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
