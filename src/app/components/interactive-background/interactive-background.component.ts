import { Component, ElementRef, OnInit, OnDestroy, ViewChild, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeService } from '../../services/theme.service';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
}

@Component({
  selector: 'app-interactive-background',
  standalone: true,
  template: `
    <canvas #canvas class="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-60"></canvas>
  `,
  styles: [`
    :host {
      display: block;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      pointer-events: none;
      z-index: 0;
      overflow: hidden;
    }
    canvas {
      width: 100%;
      height: 100%;
      display: block;
    }
  `]
})
export class InteractiveBackgroundComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;

  private platformId = inject(PLATFORM_ID);
  private themeService = inject(ThemeService);

  private ctx: CanvasRenderingContext2D | null = null;
  private animId: number | null = null;
  private particles: Particle[] = [];
  private mouseX = -1000;
  private mouseY = -1000;
  private width = 0;
  private height = 0;

  private mouseMoveHandler = (e: MouseEvent) => {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  };

  private resizeHandler = () => {
    this.initCanvasSize();
  };

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.ctx = this.canvasRef.nativeElement.getContext('2d');
    this.initCanvasSize();
    this.createParticles();
    this.animate();

    window.addEventListener('mousemove', this.mouseMoveHandler, { passive: true });
    window.addEventListener('resize', this.resizeHandler, { passive: true });
  }

  ngOnDestroy() {
    if (this.animId) cancelAnimationFrame(this.animId);
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('mousemove', this.mouseMoveHandler);
      window.removeEventListener('resize', this.resizeHandler);
    }
  }

  private initCanvasSize() {
    const canvas = this.canvasRef.nativeElement;
    this.width = canvas.width = window.innerWidth;
    this.height = canvas.height = window.innerHeight;
  }

  private createParticles() {
    this.particles = [];
    const count = Math.min(Math.floor((this.width * this.height) / 16000), 85);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 2 + 1;
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: radius,
        baseRadius: radius,
        alpha: Math.random() * 0.5 + 0.2
      });
    }
  }

  private getParticleColor(alpha: number): string {
    const theme = this.themeService.currentTheme();
    switch (theme) {
      case 'violet':
        return `rgba(184, 0, 230, ${alpha})`;
      case 'emerald':
        return `rgba(0, 255, 136, ${alpha})`;
      case 'amber':
        return `rgba(255, 153, 0, ${alpha})`;
      case 'cyan':
      default:
        return `rgba(0, 242, 254, ${alpha})`;
    }
  }

  private animate = () => {
    if (!this.ctx) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    const maxDist = 130;
    const mouseRadius = 180;

    // Update & draw particles
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      p.x += p.vx;
      p.y += p.vy;

      // Bounce off walls
      if (p.x < 0 || p.x > this.width) p.vx *= -1;
      if (p.y < 0 || p.y > this.height) p.vy *= -1;

      // Mouse influence
      const dx = this.mouseX - p.x;
      const dy = this.mouseY - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < mouseRadius) {
        const force = (mouseRadius - dist) / mouseRadius;
        p.x -= (dx / dist) * force * 1.5;
        p.y -= (dy / dist) * force * 1.5;
        p.radius = p.baseRadius + force * 2.2;
      } else {
        p.radius = p.baseRadius;
      }

      // Draw particle dot
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.getParticleColor(p.alpha);
      this.ctx.fill();

      // Connect with neighboring particles
      for (let j = i + 1; j < this.particles.length; j++) {
        const p2 = this.particles[j];
        const djx = p.x - p2.x;
        const djy = p.y - p2.y;
        const d = Math.sqrt(djx * djx + djy * djy);

        if (d < maxDist) {
          const lineAlpha = (1 - d / maxDist) * 0.22;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(p2.x, p2.y);
          this.ctx.strokeStyle = this.getParticleColor(lineAlpha);
          this.ctx.lineWidth = 0.85;
          this.ctx.stroke();
        }
      }
    }

    this.animId = requestAnimationFrame(this.animate);
  };
}
