import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService, SkillCategory } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="skills" class="skills-section">
      <div class="cyber-container">
        
        <!-- Section Header -->
        <div class="section-badge font-mono">
          <span class="badge-index">04 //</span>
          <span class="badge-name">CAPABILITY &amp; MASTERY MATRIX</span>
        </div>

        <div class="header-row">
          <div>
            <h2 class="section-title">
              Deep Stack <span class="text-gradient">Specialization</span>.
            </h2>
            <p class="section-subtitle">
              Comprehensive front-end engineering proficiency across modern Angular versions, reactive state, accessibility standards, and cloud tooling.
            </p>
          </div>
        </div>

        <!-- Skills Categories Grid -->
        <div class="skills-grid">
          @for (cat of data.skillCategories; track cat.category) {
            <div class="skill-group-card glass-card">
              <div class="card-head">
                <span class="cat-icon font-mono">&gt;</span>
                <h3 class="cat-title">{{ cat.category }}</h3>
              </div>
              <p class="cat-desc">{{ cat.description }}</p>

              <div class="skills-list">
                @for (s of cat.skills; track s.name) {
                  <div class="skill-item" (mouseenter)="audio.playHover()">
                    <div class="skill-info">
                      <span class="skill-name font-mono">{{ s.name }}</span>
                      <div class="skill-meta">
                        <span class="skill-tag font-mono">{{ s.tag }}</span>
                        <span class="skill-percent font-mono">{{ s.level }}%</span>
                      </div>
                    </div>

                    <!-- Progress Track -->
                    <div class="skill-track">
                      <div 
                        class="skill-fill" 
                        [style.width.%]="s.level">
                      </div>
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>

        <!-- Proven Architecture Capabilities Bar -->
        <div class="competencies-banner glass-card font-mono">
          <div class="comp-col">
            <span class="comp-label">FRAMEWORK VERSIONS</span>
            <span class="comp-val">Angular v10 through v18+</span>
          </div>
          <div class="comp-divider"></div>
          <div class="comp-col">
            <span class="comp-label">REACTIVE PIPELINES</span>
            <span class="comp-val">RxJS Multi-Stream Orchestration</span>
          </div>
          <div class="comp-divider"></div>
          <div class="comp-col">
            <span class="comp-label">ACCESSIBILITY COMPLIANCE</span>
            <span class="comp-val">WCAG 2.1 AA Certified Workflows</span>
          </div>
          <div class="comp-divider"></div>
          <div class="comp-col">
            <span class="comp-label">TESTING &amp; DEFECT REDUCTION</span>
            <span class="comp-val">25% Fewer Post-Deploy Bugs</span>
          </div>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .skills-section {
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
      margin-bottom: 40px;
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

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(480px, 1fr));
      gap: 28px;
    }
    .skill-group-card {
      padding: 30px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .card-head {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .cat-icon {
      color: var(--theme-primary);
      font-size: 1.2rem;
      font-weight: 800;
    }
    .cat-title {
      font-size: 1.25rem;
      font-weight: 700;
      color: #ffffff;
    }
    .cat-desc {
      font-size: 0.85rem;
      color: var(--text-dim);
      line-height: 1.5;
    }
    .skills-list {
      display: flex;
      flex-direction: column;
      gap: 18px;
      margin-top: 10px;
    }
    .skill-item {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .skill-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
    }
    .skill-name {
      color: var(--text-main);
      font-weight: 600;
    }
    .skill-meta {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .skill-tag {
      font-size: 0.68rem;
      color: var(--theme-primary);
      background: var(--theme-tag-bg);
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid var(--border-bright);
    }
    .skill-percent {
      color: var(--text-muted);
      font-size: 0.75rem;
      font-weight: 600;
      min-width: 32px;
      text-align: right;
    }
    .skill-track {
      width: 100%;
      height: 6px;
      background: rgba(255, 255, 255, 0.06);
      border-radius: 9999px;
      overflow: hidden;
      position: relative;
    }
    .skill-fill {
      height: 100%;
      background: linear-gradient(90deg, var(--theme-primary), var(--theme-secondary));
      border-radius: 9999px;
      box-shadow: 0 0 10px var(--theme-glow);
      transition: width 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .competencies-banner {
      margin-top: 40px;
      padding: 22px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-radius: 16px;
      flex-wrap: wrap;
      gap: 20px;
    }
    .comp-col {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .comp-label {
      font-size: 0.65rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }
    .comp-val {
      font-size: 0.86rem;
      font-weight: 700;
      color: var(--theme-primary);
    }
    .comp-divider {
      width: 1px;
      height: 36px;
      background: var(--border-glass);
    }

    @media (max-width: 768px) {
      .skills-grid {
        grid-template-columns: 1fr;
      }
      .competencies-banner {
        flex-direction: column;
        align-items: flex-start;
      }
      .comp-divider {
        display: none;
      }
    }
  `]
})
export class SkillsComponent {
  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);
}
