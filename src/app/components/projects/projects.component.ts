import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, ProjectItem } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';

type CategoryFilter = 'all' | 'enterprise' | 'analytics' | 'ecommerce';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="projects-section">
      <div class="cyber-container">
        
        <!-- Section Header -->
        <div class="section-badge font-mono">
          <span class="badge-index">03 //</span>
          <span class="badge-name">FEATURED CASE STUDIES</span>
        </div>

        <div class="header-row">
          <div>
            <h2 class="section-title">
              Engineered for <span class="text-gradient">Scale, Speed</span> &amp; Stability.
            </h2>
            <p class="section-subtitle">
              Enterprise single-page applications, healthcare portals, scientific telemetry dashboards, and multi-vendor platforms.
            </p>
          </div>

          <!-- Category Filters -->
          <div class="category-filters font-mono">
            <button 
              type="button" 
              class="filter-btn" 
              [class.active]="activeCategory() === 'all'"
              (click)="setFilter('all')">
              All Works ({{ data.projects.length }})
            </button>
            <button 
              type="button" 
              class="filter-btn" 
              [class.active]="activeCategory() === 'enterprise'"
              (click)="setFilter('enterprise')">
              Enterprise &amp; Health
            </button>
            <button 
              type="button" 
              class="filter-btn" 
              [class.active]="activeCategory() === 'analytics'"
              (click)="setFilter('analytics')">
              Analytics &amp; Data
            </button>
            <button 
              type="button" 
              class="filter-btn" 
              [class.active]="activeCategory() === 'ecommerce'"
              (click)="setFilter('ecommerce')">
              E-Commerce
            </button>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="projects-grid">
          @for (p of filteredProjects(); track p.id) {
            <div 
              class="project-card glass-card glass-card-interactive"
              (mouseenter)="audio.playHover()"
              (click)="openModal(p)">
              
              <!-- Card Top Header -->
              <div class="card-meta font-mono">
                <span class="cat-pill">{{ p.categoryLabel }}</span>
                <span class="metric-pill">{{ p.metrics }}</span>
              </div>

              <!-- Title & Tagline -->
              <h3 class="project-title">{{ p.title }}</h3>
              <p class="project-tagline">{{ p.tagline }}</p>

              <!-- Description -->
              <p class="project-desc">{{ p.description }}</p>

              <!-- Key Achievements -->
              <div class="card-highlights">
                @for (h of p.highlights.slice(0, 2); track h) {
                  <div class="highlight-item">
                    <span class="hl-dot">▸</span>
                    <span class="hl-text">{{ h }}</span>
                  </div>
                }
              </div>

              <!-- Tech Stack Badges -->
              <div class="tech-stack-row font-mono">
                @for (tech of p.techStack; track tech) {
                  <span class="tech-pill">{{ tech }}</span>
                }
              </div>

              <!-- Action Footer -->
              <div class="card-footer font-mono">
                <span class="inspect-text">Inspect Architecture &amp; Impact</span>
                <span class="arrow-icon">↗</span>
              </div>
            </div>
          }
        </div>

      </div>

      <!-- ================= PROJECT DEEP-DIVE MODAL ================= -->
      @if (selectedProject()) {
        <div class="modal-backdrop" (click)="closeModal()">
          <div class="modal-content glass-card" (click)="$event.stopPropagation()">
            <!-- Modal Header -->
            <div class="modal-header">
              <div class="modal-meta font-mono">
                <span class="cat-pill">{{ selectedProject()!.categoryLabel }}</span>
                <span class="metric-pill highlight">{{ selectedProject()!.metrics }}</span>
              </div>
              <button type="button" class="close-btn" (click)="closeModal()" aria-label="Close modal">
                ✕
              </button>
            </div>

            <h3 class="modal-title">{{ selectedProject()!.title }}</h3>
            <p class="modal-tagline font-mono">{{ selectedProject()!.tagline }}</p>

            <div class="modal-body">
              <div class="modal-section">
                <h4 class="modal-sec-title font-mono">PROJECT OVERVIEW</h4>
                <p class="modal-text">{{ selectedProject()!.description }}</p>
              </div>

              <div class="modal-section">
                <h4 class="modal-sec-title font-mono">KEY ACCOMPLISHMENTS &amp; USER EXPERIENCE IMPACT</h4>
                <div class="modal-list">
                  @for (h of selectedProject()!.highlights; track h) {
                    <div class="list-item">
                      <span class="item-icon">✓</span>
                      <span>{{ h }}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="modal-section">
                <h4 class="modal-sec-title font-mono">TECHNICAL &amp; ARCHITECTURAL SPECIFICATIONS</h4>
                <div class="modal-list">
                  @for (ap of selectedProject()!.architecturePoints; track ap) {
                    <div class="list-item">
                      <span class="item-icon font-mono">⚡</span>
                      <span>{{ ap }}</span>
                    </div>
                  }
                </div>
              </div>

              <div class="modal-section">
                <h4 class="modal-sec-title font-mono">TECHNOLOGY MATRIX</h4>
                <div class="tech-stack-row font-mono">
                  @for (tech of selectedProject()!.techStack; track tech) {
                    <span class="tech-pill active">{{ tech }}</span>
                  }
                </div>
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="modal-footer">
              <button type="button" class="cyber-btn" (click)="closeModal()">
                Close Case Study
              </button>
              <a href="#contact" class="cyber-btn cyber-btn-outline" (click)="closeModal()">
                Discuss Similar Architecture
              </a>
            </div>
          </div>
        </div>
      }
    </section>
  `,
  styles: [`
    .projects-section {
      padding: 100px 0;
      position: relative;
      z-index: 10;
    }
    .section-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      margin-bottom: 12px;
    }
    .badge-index { color: var(--theme-primary); }
    .badge-name { color: var(--text-dim); }

    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 30px;
      margin-bottom: 40px;
      flex-wrap: wrap;
    }
    .section-title {
      font-size: 2.5rem;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .section-subtitle {
      font-size: 1.05rem;
      color: var(--text-dim);
      max-width: 650px;
      margin-top: 8px;
    }

    /* Category Filters */
    .category-filters {
      display: flex;
      gap: 8px;
      background: rgba(13, 18, 30, 0.6);
      padding: 6px;
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      flex-wrap: wrap;
    }
    .filter-btn {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .filter-btn:hover { color: #ffffff; }
    .filter-btn.active {
      background: var(--theme-primary);
      color: #06080d;
      box-shadow: 0 0 15px var(--theme-glow);
    }

    /* Grid */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(370px, 1fr));
      gap: 28px;
    }
    .project-card {
      padding: 28px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
      justify-content: space-between;
    }
    .card-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 10px;
      font-size: 0.72rem;
    }
    .cat-pill {
      color: var(--theme-primary);
      background: var(--theme-tag-bg);
      padding: 3px 10px;
      border-radius: 6px;
      border: 1px solid var(--border-bright);
    }
    .metric-pill {
      color: #38ef7d;
      font-weight: 700;
      font-size: 0.68rem;
      text-align: right;
    }
    .metric-pill.highlight {
      color: var(--theme-primary);
    }
    .project-title {
      font-size: 1.35rem;
      font-weight: 700;
      color: #ffffff;
      line-height: 1.25;
    }
    .project-tagline {
      font-size: 0.88rem;
      color: var(--text-dim);
      line-height: 1.5;
    }
    .project-desc {
      font-size: 0.85rem;
      color: var(--text-muted);
      line-height: 1.6;
    }
    .card-highlights {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 12px 0;
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    }
    .highlight-item {
      display: flex;
      align-items: flex-start;
      gap: 8px;
      font-size: 0.82rem;
      color: var(--text-main);
    }
    .hl-dot {
      color: var(--theme-primary);
    }
    .hl-text {
      line-height: 1.45;
    }
    .tech-stack-row {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }
    .tech-pill {
      font-size: 0.7rem;
      padding: 3px 8px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      border-radius: 6px;
      color: var(--text-dim);
    }
    .tech-pill.active {
      border-color: var(--theme-primary);
      color: var(--theme-primary);
      background: var(--theme-tag-bg);
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 12px;
      border-top: 1px solid rgba(255, 255, 255, 0.06);
      font-size: 0.8rem;
      color: var(--theme-primary);
      font-weight: 600;
    }
    .arrow-icon {
      font-size: 1.1rem;
      transition: transform 0.25s ease;
    }
    .project-card:hover .arrow-icon {
      transform: translate(3px, -3px);
    }

    /* Modal Backdrop */
    .modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(4, 6, 10, 0.85);
      backdrop-filter: blur(16px);
      z-index: 2000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 24px;
      animation: fadeIn 0.2s ease;
    }
    .modal-content {
      width: 100%;
      max-width: 720px;
      max-height: 90vh;
      overflow-y: auto;
      padding: 32px;
      border-radius: 24px;
      background: rgba(13, 18, 30, 0.95);
      border: 1px solid var(--border-bright);
      box-shadow: 0 40px 80px -20px rgba(0, 0, 0, 0.95),
                  0 0 50px -10px var(--theme-glow);
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .modal-meta {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .close-btn {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid var(--border-glass);
      color: var(--text-dim);
      width: 32px;
      height: 32px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
    }
    .close-btn:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #ffffff;
    }
    .modal-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: #ffffff;
      line-height: 1.2;
    }
    .modal-tagline {
      font-size: 0.9rem;
      color: var(--theme-primary);
    }
    .modal-body {
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 10px 0;
    }
    .modal-sec-title {
      font-size: 0.78rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      margin-bottom: 8px;
    }
    .modal-text {
      font-size: 0.95rem;
      color: var(--text-dim);
      line-height: 1.65;
    }
    .modal-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .list-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--text-main);
      line-height: 1.5;
    }
    .item-icon {
      color: var(--theme-primary);
      font-weight: 700;
    }
    .modal-footer {
      display: flex;
      gap: 14px;
      padding-top: 16px;
      border-top: 1px solid var(--border-glass);
      flex-wrap: wrap;
    }

    @media (max-width: 640px) {
      .projects-grid {
        grid-template-columns: 1fr;
      }
      .modal-content {
        padding: 20px;
      }
    }
  `]
})
export class ProjectsComponent {
  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);

  public activeCategory = signal<CategoryFilter>('all');
  public selectedProject = signal<ProjectItem | null>(null);

  public filteredProjects(): ProjectItem[] {
    const cat = this.activeCategory();
    if (cat === 'all') return this.data.projects;
    return this.data.projects.filter(p => p.category === cat);
  }

  public setFilter(category: CategoryFilter) {
    this.audio.playClick();
    this.activeCategory.set(category);
  }

  public openModal(project: ProjectItem) {
    this.audio.playClick();
    this.selectedProject.set(project);
    document.body.style.overflow = 'hidden';
  }

  public closeModal() {
    this.audio.playClick();
    this.selectedProject.set(null);
    document.body.style.overflow = '';
  }
}
