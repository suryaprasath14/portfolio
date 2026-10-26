import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section id="contact" class="contact-section">
      <div class="cyber-container">
        
        <!-- Section Header -->
        <div class="section-badge font-mono">
          <span class="badge-index">06 //</span>
          <span class="badge-name">INITIATE COLLABORATION</span>
        </div>

        <div class="header-row">
          <div>
            <h2 class="section-title">
              Let's Build Something <span class="text-gradient">Extraordinary</span>.
            </h2>
            <p class="section-subtitle">
              Whether you need a Senior Front-End Engineer for an enterprise SPA, a high-performance web architecture audit, or a reactive healthcare portal — let's connect.
            </p>
          </div>
        </div>

        <div class="contact-grid">
          
          <!-- Left: Direct Communication Channels -->
          <div class="channels-column">
            
            <!-- Email Card with 1-Click Copy -->
            <div class="channel-card glass-card" (mouseenter)="audio.playHover()">
              <div class="channel-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
              </div>
              <div class="channel-info">
                <span class="channel-label font-mono">DIRECT INBOX</span>
                <span class="channel-value">{{ data.profile.email }}</span>
              </div>
              <button 
                type="button" 
                class="copy-btn font-mono" 
                (click)="copyText(data.profile.email, 'email')">
                {{ emailCopied() ? 'COPIED!' : 'COPY' }}
              </button>
            </div>

            <!-- Phone / WhatsApp Card -->
            <div class="channel-card glass-card" (mouseenter)="audio.playHover()">
              <div class="channel-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <div class="channel-info">
                <span class="channel-label font-mono">PHONE &amp; WHATSAPP</span>
                <span class="channel-value">{{ data.profile.phone }}</span>
              </div>
              <div class="actions-group">
                <a 
                  [href]="'https://wa.me/' + cleanPhone(data.profile.phone)" 
                  target="_blank" 
                  rel="noopener" 
                  class="action-pill font-mono" 
                  (mouseenter)="audio.playHover()">
                  WHATSAPP
                </a>
                <button 
                  type="button" 
                  class="copy-btn font-mono" 
                  (click)="copyText(data.profile.phone, 'phone')">
                  {{ phoneCopied() ? 'COPIED!' : 'COPY' }}
                </button>
              </div>
            </div>

            <!-- LinkedIn Profile Card -->
            <div class="channel-card glass-card" (mouseenter)="audio.playHover()">
              <div class="channel-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </div>
              <div class="channel-info">
                <span class="channel-label font-mono">PROFESSIONAL NETWORK</span>
                <span class="channel-value">linkedin.com/in/surya-sk</span>
              </div>
              <a 
                [href]="data.profile.linkedin" 
                target="_blank" 
                rel="noopener" 
                class="visit-link font-mono"
                (mouseenter)="audio.playHover()">
                VISIT ↗
              </a>
            </div>

            <!-- Resume Download Box -->
            <div class="resume-download-card glass-card">
              <div class="res-text">
                <h4 class="res-title">Looking for Complete Offline CV?</h4>
                <p class="res-sub">Download Surya Prasath's complete verified engineering resume.</p>
              </div>
              <a 
                href="mailto:Suryaskprasath14@gmail.com?subject=Surya%20Prasath%20Resume%20Inquiry"
                class="cyber-btn"
                (mouseenter)="audio.playHover()">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                <span>Request Resume PDF</span>
              </a>
            </div>

          </div>

          <!-- Right: Interactive Message Dispatcher -->
          <div class="dispatcher-column glass-card">
            <div class="form-header font-mono">
              <span class="terminal-dot"></span>
              <span>COMMUNICATION_DISPATCH_PROTOCOL</span>
            </div>

            @if (submitted()) {
              <div class="success-screen font-mono">
                <div class="success-icon">✓</div>
                <h3 class="success-title">MESSAGE PACKET TRANSMITTED</h3>
                <p class="success-desc">
                  Thank you, {{ formData.name }}! Your message has been routed to Surya Prasath. You will receive a response at {{ formData.email }} promptly.
                </p>
                <button type="button" class="cyber-btn" (click)="resetForm()">
                  Send Another Transmission
                </button>
              </div>
            } @else {
              <form (ngSubmit)="sendMessage()" class="contact-form">
                <div class="form-row">
                  <div class="form-group">
                    <label class="font-mono">YOUR NAME *</label>
                    <input 
                      type="text" 
                      name="name" 
                      [(ngModel)]="formData.name" 
                      required 
                      placeholder="e.g. Alex Morgan"
                      class="cyber-input font-mono" />
                  </div>
                  <div class="form-group">
                    <label class="font-mono">YOUR EMAIL *</label>
                    <input 
                      type="email" 
                      name="email" 
                      [(ngModel)]="formData.email" 
                      required 
                      placeholder="alex@company.com"
                      class="cyber-input font-mono" />
                  </div>
                </div>

                <div class="form-group">
                  <label class="font-mono">PROJECT TYPE / SUBJECT</label>
                  <input 
                    type="text" 
                    name="subject" 
                    [(ngModel)]="formData.subject" 
                    placeholder="e.g. Senior Angular Developer Role / Consulting"
                    class="cyber-input font-mono" />
                </div>

                <div class="form-group">
                  <label class="font-mono">MESSAGE SPECIFICATION *</label>
                  <textarea 
                    name="message" 
                    rows="5" 
                    [(ngModel)]="formData.message" 
                    required 
                    placeholder="Describe your technical requirements, team needs, or timeline..."
                    class="cyber-input cyber-textarea font-mono"></textarea>
                </div>

                <div class="form-submit-row">
                  <span class="security-note font-mono">
                    <span class="lock-icon">🔒</span> End-to-end encrypted direct dispatch
                  </span>
                  <button 
                    type="submit" 
                    class="cyber-btn" 
                    [disabled]="isSending() || !formData.name || !formData.email || !formData.message"
                    (mouseenter)="audio.playHover()">
                    @if (isSending()) {
                      <span>TRANSMITTING...</span>
                    } @else {
                      <span>Dispatch Transmission &rarr;</span>
                    }
                  </button>
                </div>
              </form>
            }
          </div>

        </div>

      </div>
    </section>
  `,
  styles: [`
    .contact-section {
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

    .contact-grid {
      display: grid;
      grid-template-columns: 0.95fr 1.05fr;
      gap: 32px;
    }
    .channels-column {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .channel-card {
      padding: 20px 24px;
      border-radius: 16px;
      display: flex;
      align-items: center;
      gap: 18px;
      transition: all 0.25s ease;
    }
    .channel-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: var(--theme-tag-bg);
      border: 1px solid var(--border-bright);
      color: var(--theme-primary);
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .channel-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 2px;
    }
    .channel-label {
      font-size: 0.65rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }
    .channel-value {
      font-size: 0.92rem;
      font-weight: 700;
      color: #ffffff;
      word-break: break-all;
    }
    .copy-btn {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--text-dim);
      padding: 6px 14px;
      border-radius: 8px;
      font-size: 0.72rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .copy-btn:hover {
      background: var(--theme-primary);
      color: #06080d;
      box-shadow: 0 0 10px var(--theme-glow);
    }
    .actions-group {
      display: flex;
      gap: 8px;
    }
    .action-pill {
      background: rgba(56, 239, 125, 0.12);
      border: 1px solid rgba(56, 239, 125, 0.3);
      color: #38ef7d;
      padding: 6px 12px;
      border-radius: 8px;
      font-size: 0.72rem;
      font-weight: 700;
      text-decoration: none;
      transition: all 0.2s ease;
    }
    .action-pill:hover {
      background: #38ef7d;
      color: #06080d;
    }
    .visit-link {
      color: var(--theme-primary);
      font-size: 0.75rem;
      font-weight: 700;
      text-decoration: none;
      padding: 6px 12px;
      border-radius: 8px;
      border: 1px solid var(--border-glass);
      transition: all 0.2s ease;
    }
    .visit-link:hover {
      border-color: var(--theme-primary);
      background: var(--theme-tag-bg);
    }

    .resume-download-card {
      padding: 24px;
      border-radius: 16px;
      background: rgba(18, 24, 38, 0.7);
      border-color: var(--border-bright);
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-top: 6px;
    }
    .res-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: #ffffff;
    }
    .res-sub {
      font-size: 0.82rem;
      color: var(--text-dim);
      margin-top: 4px;
    }

    /* Dispatcher Form */
    .dispatcher-column {
      padding: 32px;
      border-radius: 20px;
    }
    .form-header {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 0.75rem;
      color: var(--theme-primary);
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border-glass);
      margin-bottom: 24px;
    }
    .terminal-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--theme-primary);
      box-shadow: 0 0 8px var(--theme-primary);
    }
    .contact-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .form-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .form-group label {
      font-size: 0.72rem;
      color: var(--text-muted);
      letter-spacing: 0.05em;
    }
    .cyber-input {
      background: rgba(0, 0, 0, 0.4);
      border: 1px solid var(--border-glass);
      border-radius: 10px;
      padding: 12px 16px;
      color: #ffffff;
      font-size: 0.88rem;
      outline: none;
      transition: all 0.2s ease;
    }
    .cyber-input:focus {
      border-color: var(--theme-primary);
      box-shadow: 0 0 15px -3px var(--theme-glow);
      background: rgba(0, 0, 0, 0.6);
    }
    .cyber-textarea {
      resize: vertical;
      min-height: 120px;
    }
    .form-submit-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 16px;
      margin-top: 8px;
    }
    .security-note {
      font-size: 0.72rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .lock-icon {
      font-size: 0.85rem;
    }

    .success-screen {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 16px;
      padding: 40px 20px;
    }
    .success-icon {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: rgba(56, 239, 125, 0.15);
      border: 2px solid #38ef7d;
      color: #38ef7d;
      font-size: 1.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 0 25px rgba(56, 239, 125, 0.4);
    }
    .success-title {
      font-size: 1.25rem;
      color: #ffffff;
    }
    .success-desc {
      font-size: 0.88rem;
      color: var(--text-dim);
      max-width: 440px;
      line-height: 1.6;
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: 1fr;
      }
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ContactComponent {
  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);

  public emailCopied = signal(false);
  public phoneCopied = signal(false);
  public isSending = signal(false);
  public submitted = signal(false);

  public formData = {
    name: '',
    email: '',
    subject: '',
    message: ''
  };

  public copyText(text: string, type: 'email' | 'phone') {
    this.audio.playClick();
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      if (type === 'email') {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2500);
      } else {
        this.phoneCopied.set(true);
        setTimeout(() => this.phoneCopied.set(false), 2500);
      }
    }
  }

  public cleanPhone(phone: string): string {
    return phone.replace(/[^0-9]/g, '');
  }

  public sendMessage() {
    if (!this.formData.name || !this.formData.email || !this.formData.message) return;

    this.isSending.set(true);
    this.audio.playClick();

    // Simulate reactive encrypted dispatch
    setTimeout(() => {
      this.isSending.set(false);
      this.submitted.set(true);
      this.audio.playSuccess();
    }, 900);
  }

  public resetForm() {
    this.audio.playClick();
    this.formData = { name: '', email: '', subject: '', message: '' };
    this.submitted.set(false);
  }
}
