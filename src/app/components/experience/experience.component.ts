import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="experience" class="exp-section">
      <div class="cyber-container">
        
        <!-- Section Header -->
        <div class="section-badge font-mono">
          <span class="badge-index">05 //</span>
          <span class="badge-name">CAREER &amp; ACADEMIC TRAJECTORY</span>
        </div>

        <div class="header-row">
          <div>
            <h2 class="section-title">
              Professional <span class="text-gradient">Experience</span>.
            </h2>
            <p class="section-subtitle">
              4 years of dedicated front-end software engineering in enterprise web environments, delivering tangible performance and reliability gains.
            </p>
          </div>
        </div>

        <!-- Timeline Container -->
        <div class="timeline-container">
          
          <!-- Experience Item: Latlon Technologies -->
          @for (item of data.experience; track item.company) {
            <div class="timeline-item">
              <div class="timeline-marker">
                <div class="pulse-node"></div>
                <div class="timeline-line"></div>
              </div>

              <div class="timeline-content glass-card">
                <div class="item-header">
                  <div>
                    <span class="company-name">{{ item.company }}</span>
                    <h3 class="role-title">{{ item.role }}</h3>
                  </div>
                  <div class="item-meta font-mono">
                    <span class="period-pill">{{ item.period }}</span>
                    <span class="loc-text">{{ item.location }}</span>
                  </div>
                </div>

                <!-- Key Metric Tag -->
                <div class="highlight-banner font-mono">
                  <span class="hl-badge">CORE IMPACT:</span>
                  <span class="hl-val">{{ item.keyMetric }}</span>
                </div>

                <!-- Achievements List -->
                <div class="achievements-list">
                  @for (ach of item.achievements; track ach) {
                    <div class="ach-item" (mouseenter)="audio.playHover()">
                      <span class="ach-bullet font-mono">⚡</span>
                      <span class="ach-text">{{ ach }}</span>
                    </div>
                  }
                </div>

                <!-- Tech Tags -->
                <div class="exp-tech-row font-mono">
                  @for (t of item.technologies; track t) {
                    <span class="tech-tag">{{ t }}</span>
                  }
                </div>
              </div>
            </div>
          }

          <!-- Education Item -->
          <div class="timeline-item">
            <div class="timeline-marker">
              <div class="pulse-node education-node"></div>
            </div>

            <div class="timeline-content glass-card education-card">
              <div class="item-header">
                <div>
                  <span class="company-name">{{ data.education.institution }}</span>
                  <h3 class="role-title">{{ data.education.degree }}</h3>
                  <p class="univ-text font-mono">{{ data.education.affiliation }}</p>
                </div>
                <div class="item-meta font-mono">
                  <span class="period-pill">{{ data.education.period }}</span>
                  <span class="cgpa-pill highlight">{{ data.education.score }}</span>
                </div>
              </div>

              <div class="coursework-section">
                <span class="cw-label font-mono">FOUNDATIONAL COMPUTING COURSEWORK:</span>
                <div class="cw-tags font-mono">
                  @for (c of data.education.coursework; track c) {
                    <span class="cw-tag">{{ c }}</span>
                  }
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .exp-section {
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

    .timeline-container {
      display: flex;
      flex-direction: column;
      gap: 36px;
      position: relative;
      padding-left: 20px;
    }
    .timeline-item {
      display: grid;
      grid-template-columns: 36px 1fr;
      gap: 24px;
      position: relative;
    }
    .timeline-marker {
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
    }
    .pulse-node {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      background: var(--theme-primary);
      border: 3px solid var(--bg-core);
      box-shadow: 0 0 15px var(--theme-primary);
      z-index: 2;
      animation: pulse-ring 2.5s infinite;
    }
    .education-node {
      background: var(--theme-secondary);
      box-shadow: 0 0 15px var(--theme-secondary);
    }
    .timeline-line {
      width: 2px;
      flex: 1;
      background: linear-gradient(180deg, var(--theme-primary), rgba(255, 255, 255, 0.05));
      margin-top: 6px;
    }
    .timeline-content {
      padding: 30px;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .item-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      flex-wrap: wrap;
    }
    .company-name {
      color: var(--theme-primary);
      font-family: var(--font-mono);
      font-size: 0.88rem;
      font-weight: 700;
    }
    .role-title {
      font-size: 1.45rem;
      font-weight: 800;
      color: #ffffff;
      margin-top: 2px;
    }
    .univ-text {
      font-size: 0.8rem;
      color: var(--text-muted);
      margin-top: 4px;
    }
    .item-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 4px;
    }
    .period-pill {
      font-size: 0.75rem;
      color: #ffffff;
      background: rgba(255, 255, 255, 0.08);
      padding: 4px 12px;
      border-radius: 9999px;
      border: 1px solid var(--border-glass);
    }
    .loc-text {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .cgpa-pill {
      font-size: 0.8rem;
      color: #38ef7d;
      font-weight: 700;
      padding: 4px 10px;
      background: rgba(56, 239, 125, 0.1);
      border-radius: 6px;
      border: 1px solid rgba(56, 239, 125, 0.25);
    }
    .highlight-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      background: var(--theme-tag-bg);
      border: 1px solid var(--border-bright);
      border-radius: 8px;
      font-size: 0.82rem;
    }
    .hl-badge {
      color: var(--text-dim);
    }
    .hl-val {
      color: var(--theme-primary);
      font-weight: 700;
    }
    .achievements-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .ach-item {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      font-size: 0.9rem;
      color: var(--text-dim);
      line-height: 1.55;
    }
    .ach-bullet {
      color: var(--theme-primary);
      font-size: 0.85rem;
      margin-top: 2px;
    }
    .ach-item:hover .ach-text {
      color: #ffffff;
    }
    .exp-tech-row {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 6px;
    }
    .tech-tag {
      font-size: 0.72rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border-glass);
      color: var(--text-dim);
    }
    .coursework-section {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-top: 6px;
    }
    .cw-label {
      font-size: 0.72rem;
      color: var(--text-muted);
    }
    .cw-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }
    .cw-tag {
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--text-main);
    }

    @media (max-width: 768px) {
      .timeline-container {
        padding-left: 0;
      }
      .timeline-item {
        grid-template-columns: 1fr;
      }
      .timeline-marker {
        display: none;
      }
      .item-meta {
        align-items: flex-start;
      }
    }
  `]
})
export class ExperienceComponent {
  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);
}
