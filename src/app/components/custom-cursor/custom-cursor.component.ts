import { Component, OnInit, OnDestroy, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-custom-cursor',
  standalone: true,
  template: `
    @if (isVisible()) {
      <div 
        class="cursor-dot" 
        [style.transform]="'translate3d(' + dotX() + 'px, ' + dotY() + 'px, 0)'">
      </div>
      <div 
        class="cursor-ring" 
        [class.hovered]="isHovered()"
        [style.transform]="'translate3d(' + ringX() + 'px, ' + ringY() + 'px, 0)'">
      </div>
    }
  `,
  styles: [`
    :host {
      pointer-events: none;
      position: fixed;
      inset: 0;
      z-index: 99999;
      mix-blend-mode: screen;
    }
    .cursor-dot {
      position: absolute;
      top: -3px;
      left: -3px;
      width: 6px;
      height: 6px;
      background: #ffffff;
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 10px var(--theme-primary), 0 0 20px var(--theme-primary);
      will-change: transform;
      transition: opacity 0.2s ease;
    }
    .cursor-ring {
      position: absolute;
      top: -18px;
      left: -18px;
      width: 36px;
      height: 36px;
      border: 1.5px solid var(--theme-primary);
      border-radius: 50%;
      pointer-events: none;
      opacity: 0.6;
      box-shadow: 0 0 15px var(--theme-glow);
      will-change: transform;
      transition: width 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  height 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  top 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  left 0.25s cubic-bezier(0.16, 1, 0.3, 1),
                  border-color 0.2s ease,
                  background-color 0.2s ease,
                  opacity 0.2s ease;
    }
    .cursor-ring.hovered {
      top: -26px;
      left: -26px;
      width: 52px;
      height: 52px;
      background: var(--theme-tag-bg);
      border-color: #ffffff;
      opacity: 0.9;
      box-shadow: 0 0 25px var(--theme-glow-strong);
    }
    @media (pointer: coarse) {
      :host {
        display: none !important;
      }
    }
  `]
})
export class CustomCursorComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);

  public isVisible = signal(false);
  public isHovered = signal(false);
  public dotX = signal(-100);
  public dotY = signal(-100);
  public ringX = signal(-100);
  public ringY = signal(-100);

  private targetX = -100;
  private targetY = -100;
  private currentRingX = -100;
  private currentRingY = -100;
  private animFrameId: number | null = null;

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    window.addEventListener('mousemove', this.onMouseMove, { passive: true });
    window.addEventListener('mouseover', this.onMouseOver, { passive: true });
    document.addEventListener('mouseleave', this.onMouseLeave);
    document.addEventListener('mouseenter', this.onMouseEnter);

    this.loop();
  }

  ngOnDestroy() {
    if (!isPlatformBrowser(this.platformId)) return;
    window.removeEventListener('mousemove', this.onMouseMove);
    window.removeEventListener('mouseover', this.onMouseOver);
    document.removeEventListener('mouseleave', this.onMouseLeave);
    document.removeEventListener('mouseenter', this.onMouseEnter);
    if (this.animFrameId) cancelAnimationFrame(this.animFrameId);
  }

  private onMouseMove = (e: MouseEvent) => {
    this.targetX = e.clientX;
    this.targetY = e.clientY;
    this.dotX.set(e.clientX);
    this.dotY.set(e.clientY);
    if (!this.isVisible()) this.isVisible.set(true);
  };

  private onMouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    const isInteractive = !!target.closest('a, button, input, textarea, select, [role="button"], .glass-card-interactive, .tab-btn');
    this.isHovered.set(isInteractive);
  };

  private onMouseLeave = () => {
    this.isVisible.set(false);
  };

  private onMouseEnter = () => {
    this.isVisible.set(true);
  };

  private loop = () => {
    // Lerp smooth follow for the ring
    const ease = 0.18;
    this.currentRingX += (this.targetX - this.currentRingX) * ease;
    this.currentRingY += (this.targetY - this.currentRingY) * ease;

    this.ringX.set(Math.round(this.currentRingX * 10) / 10);
    this.ringY.set(Math.round(this.currentRingY * 10) / 10);

    this.animFrameId = requestAnimationFrame(this.loop);
  };
}
