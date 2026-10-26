import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AudioService } from '../../services/audio.service';
import { ThemeService } from '../../services/theme.service';

interface Marble {
  id: number;
  val: string;
  color: string;
  progress: number;
}

@Component({
  selector: 'app-architecture-playground',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="architecture" class="arch-section">
      <div class="cyber-container">
        
        <!-- Section Header -->
        <div class="section-badge font-mono">
          <span class="badge-index">02 //</span>
          <span class="badge-name">PERFORMANCE &amp; ARCHITECTURE LAB</span>
        </div>

        <div class="header-row">
          <div>
            <h2 class="section-title">
              Engineering <span class="text-gradient">35% Faster</span> Enterprise Applications.
            </h2>
            <p class="section-subtitle">
              Interactive benchmarks demonstrating modular lazy loading, asynchronous data pipelines, and reactive state optimization.
            </p>
          </div>

          <!-- Lab Mode Tab Switcher -->
          <div class="lab-tabs font-mono">
            <button 
              type="button" 
              class="lab-tab" 
              [class.active]="activeTab() === 'bundle'"
              (click)="setTab('bundle')">
              <span>⚡ Bundle &amp; Lazy Loading</span>
            </button>
            <button 
              type="button" 
              class="lab-tab" 
              [class.active]="activeTab() === 'rxjs'"
              (click)="setTab('rxjs')">
              <span>🔄 RxJS Pipeline Visualizer</span>
            </button>
          </div>
        </div>

        <!-- ================= TAB 1: BUNDLE & SPEED BENCHMARK ================= -->
        @if (activeTab() === 'bundle') {
          <div class="lab-container glass-card">
            <div class="lab-top-bar font-mono">
              <div class="bar-title">
                <span class="terminal-dot"></span>
                <span>SYSTEM_BENCHMARK: ARCHITECTURE_COMPARISON_ENGINE</span>
              </div>
              
              <!-- Architecture Mode Toggle Switch -->
              <div class="mode-toggle-group">
                <span class="mode-label" [class.active]="archMode() === 'legacy'">Monolithic</span>
                <button 
                  type="button" 
                  class="toggle-switch" 
                  [class.active]="archMode() === 'optimized'"
                  (click)="toggleArchMode()">
                  <span class="toggle-slider"></span>
                </button>
                <span class="mode-label highlight" [class.active]="archMode() === 'optimized'">Surya's Modular Architecture</span>
              </div>
            </div>

            <div class="benchmark-grid">
              <!-- Left: Live Telemetry Gauges -->
              <div class="metrics-panel">
                <h3 class="panel-heading font-mono">Lighthouse &amp; Core Web Vitals</h3>
                
                <div class="metrics-cards">
                  <!-- Lighthouse Score Gauge -->
                  <div class="metric-box score-box" [class.high]="archMode() === 'optimized'">
                    <div class="score-circle">
                      <span class="score-val">{{ archMode() === 'optimized' ? '99' : '54' }}</span>
                      <span class="score-max">/100</span>
                    </div>
                    <div class="score-info">
                      <span class="score-title font-mono">Lighthouse Score</span>
                      <span class="score-desc">{{ archMode() === 'optimized' ? 'Optimal Performance Grade (A+)' : 'Slow Initial Load & Main Thread Lock' }}</span>
                    </div>
                  </div>

                  <!-- Speed Metrics Grid -->
                  <div class="sub-metrics">
                    <div class="sub-metric-card">
                      <span class="metric-name font-mono">Initial JS Bundle</span>
                      <span class="metric-val" [class.positive]="archMode() === 'optimized'">
                        {{ archMode() === 'optimized' ? '380 KB' : '4,850 KB' }}
                      </span>
                      <span class="metric-delta font-mono">
                        {{ archMode() === 'optimized' ? '▼ 92% initial payload cut' : '▲ Monolithic heavy bundle' }}
                      </span>
                    </div>

                    <div class="sub-metric-card">
                      <span class="metric-name font-mono">First Contentful Paint (FCP)</span>
                      <span class="metric-val" [class.positive]="archMode() === 'optimized'">
                        {{ archMode() === 'optimized' ? '0.7s' : '2.9s' }}
                      </span>
                      <span class="metric-delta font-mono">
                        {{ archMode() === 'optimized' ? '⚡ 76% faster render' : '⚠️ Render blocking JS' }}
                      </span>
                    </div>

                    <div class="sub-metric-card">
                      <span class="metric-name font-mono">Time to Interactive (TTI)</span>
                      <span class="metric-val" [class.positive]="archMode() === 'optimized'">
                        {{ archMode() === 'optimized' ? '1.1s' : '4.2s' }}
                      </span>
                      <span class="metric-delta font-mono">
                        {{ archMode() === 'optimized' ? '▼ 73% faster responsiveness' : '⚠️ Main thread thrashing' }}
                      </span>
                    </div>

                    <div class="sub-metric-card">
                      <span class="metric-name font-mono">API Data Latency</span>
                      <span class="metric-val" [class.positive]="archMode() === 'optimized'">
                        {{ archMode() === 'optimized' ? '95ms' : '380ms' }}
                      </span>
                      <span class="metric-delta font-mono">
                        {{ archMode() === 'optimized' ? '▼ 30%+ cut via RxJS caching' : '▲ Redundant re-fetching' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right: Visual Bundle Splitting Map -->
              <div class="bundle-map-panel">
                <h3 class="panel-heading font-mono">Network Chunk Allocation</h3>

                @if (archMode() === 'optimized') {
                  <div class="chunks-layout">
                    <div class="chunk-card chunk-main">
                      <div class="chunk-header font-mono">
                        <span class="chunk-tag">CORE BOOTSTRAP</span>
                        <span class="chunk-size font-mono">180 KB</span>
                      </div>
                      <span class="chunk-title">app.config.ts + Shell</span>
                      <span class="chunk-desc">Only critical CSS and router shell loaded first</span>
                    </div>

                    <div class="chunks-subgrid">
                      <div class="chunk-card chunk-lazy">
                        <div class="chunk-header font-mono">
                          <span class="chunk-tag">LAZY ROUTE</span>
                          <span class="chunk-size">95 KB</span>
                        </div>
                        <span class="chunk-title">ClinaNG-EMR.chunk.js</span>
                        <span class="chunk-desc">Loaded on authenticated routing</span>
                      </div>

                      <div class="chunk-card chunk-lazy">
                        <div class="chunk-header font-mono">
                          <span class="chunk-tag">&#64;defer BLOCK</span>
                          <span class="chunk-size">65 KB</span>
                        </div>
                        <span class="chunk-title">Calendar-Scheduler</span>
                        <span class="chunk-desc">Deferred on viewport intersection</span>
                      </div>

                      <div class="chunk-card chunk-lazy">
                        <div class="chunk-header font-mono">
                          <span class="chunk-tag">ASYNC MODULE</span>
                          <span class="chunk-size">40 KB</span>
                        </div>
                        <span class="chunk-title">Billing-Invoicing</span>
                        <span class="chunk-desc">Preloaded during idle idleCallback</span>
                      </div>
                    </div>

                    <div class="optimization-callout font-mono">
                      <span class="callout-icon">✓</span>
                      <span>RESULTS: 35% overall page speed improvement &amp; zero memory leaks across enterprise clients.</span>
                    </div>
                  </div>
                } @else {
                  <div class="chunks-layout legacy">
                    <div class="chunk-card chunk-danger">
                      <div class="chunk-header font-mono">
                        <span class="chunk-tag danger">MONOLITHIC CHUNK</span>
                        <span class="chunk-size">4,850 KB</span>
                      </div>
                      <span class="chunk-title">bundle.js (All Modules Combined)</span>
                      <p class="chunk-desc">Everything (Admin, EMR, Billing, Heavy Charts, Analytics) bundled into a single massive payload. Browser freezes for 3+ seconds before initial paint.</p>
                    </div>

                    <div class="optimization-callout danger font-mono">
                      <span class="callout-icon">⚠</span>
                      <span>INSPECTION: Huge TBT (Total Blocking Time), high bounce rates on mobile networks.</span>
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ================= TAB 2: RXJS STREAM VISUALIZER ================= -->
        @if (activeTab() === 'rxjs') {
          <div class="lab-container glass-card">
            <div class="lab-top-bar font-mono">
              <div class="bar-title">
                <span class="terminal-dot"></span>
                <span>RXJS_STREAM_PIPELINE: SEARCH_DEBOUNCE_SWITCHMAP</span>
              </div>
              <div class="pipeline-status">
                <span>STATUS:</span>
                <span class="status-live">REACTIVE_ENGINE_ACTIVE</span>
              </div>
            </div>

            <div class="rxjs-interactive-body">
              <div class="rxjs-controls">
                <span class="control-label font-mono">Simulate User Keystrokes (Search Input):</span>
                <div class="btn-group">
                  <button type="button" class="cyber-btn" (click)="emitSearch('Angular')">
                    Emit: "Angular"
                  </button>
                  <button type="button" class="cyber-btn" (click)="emitSearch('RxJS')">
                    Emit: "RxJS"
                  </button>
                  <button type="button" class="cyber-btn" (click)="emitSearch('Performance')">
                    Emit: "Performance"
                  </button>
                  <button type="button" class="cyber-btn cyber-btn-outline" (click)="clearMarbles()">
                    Clear Stream
                  </button>
                </div>
              </div>

              <!-- Stream Pipeline Track -->
              <div class="pipeline-tracks">
                <!-- Track 1: Source Event Stream -->
                <div class="stream-track">
                  <div class="track-label font-mono">
                    <span class="track-num">01</span>
                    <span>fromEvent(input, 'keyup')</span>
                  </div>
                  <div class="track-line">
                    @for (m of sourceMarbles(); track m.id) {
                      <div class="marble source-marble font-mono">
                        {{ m.val }}
                      </div>
                    }
                    @if (sourceMarbles().length === 0) {
                      <div class="track-placeholder font-mono">Click an Emit button above to inject stream events...</div>
                    }
                  </div>
                </div>

                <!-- Operator Flow Indicators -->
                <div class="operators-row font-mono">
                  <div class="operator-badge">↓ debounceTime(300)</div>
                  <div class="operator-badge">↓ distinctUntilChanged()</div>
                  <div class="operator-badge highlight">↓ switchMap(query => fetchApi(query))</div>
                </div>

                <!-- Track 2: Filtered & Optimized API Output Stream -->
                <div class="stream-track result-track">
                  <div class="track-label font-mono">
                    <span class="track-num">02</span>
                    <span>Processed API Payload:</span>
                  </div>
                  <div class="track-line">
                    @for (m of resultMarbles(); track m.id) {
                      <div class="marble result-marble font-mono">
                        {{ m.val }} [200 OK]
                      </div>
                    }
                    @if (resultMarbles().length === 0) {
                      <div class="track-placeholder font-mono">Waiting for debounced stream resolution...</div>
                    }
                  </div>
                </div>
              </div>

              <!-- Live RxJS Console Log -->
              <div class="rxjs-console font-mono">
                <div class="console-head">
                  <span>TERMINAL_OUTPUT:</span>
                  <span class="text-dim">Subscribed to 25+ RESTful Endpoints</span>
                </div>
                <div class="console-body">
                  @for (log of consoleLogs(); track log) {
                    <div class="log-line">{{ log }}</div>
                  }
                  @if (consoleLogs().length === 0) {
                    <div class="log-line text-muted">&gt; Stream observer idle. Ready for events.</div>
                  }
                </div>
              </div>
            </div>
          </div>
        }

      </div>
    </section>
  `,
  styles: [`
    .arch-section {
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
    .badge-index {
      color: var(--theme-primary);
    }
    .badge-name {
      color: var(--text-dim);
    }
    .header-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      gap: 30px;
      margin-bottom: 36px;
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
    .lab-tabs {
      display: flex;
      gap: 8px;
      background: rgba(13, 18, 30, 0.7);
      padding: 6px;
      border: 1px solid var(--border-glass);
      border-radius: 12px;
    }
    .lab-tab {
      background: transparent;
      border: none;
      color: var(--text-dim);
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 600;
      padding: 8px 16px;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    .lab-tab:hover {
      color: #ffffff;
    }
    .lab-tab.active {
      background: var(--theme-primary);
      color: #06080d;
      box-shadow: 0 0 15px var(--theme-glow);
    }

    /* Lab Container */
    .lab-container {
      padding: 24px;
      border-radius: 20px;
      background: rgba(11, 15, 25, 0.75);
      border: 1px solid var(--border-bright);
    }
    .lab-top-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border-glass);
      margin-bottom: 24px;
      font-size: 0.76rem;
      flex-wrap: wrap;
      gap: 12px;
    }
    .bar-title {
      display: flex;
      align-items: center;
      gap: 8px;
      color: var(--text-dim);
    }
    .terminal-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--theme-primary);
      box-shadow: 0 0 8px var(--theme-primary);
    }
    .mode-toggle-group {
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .mode-label {
      color: var(--text-muted);
      font-size: 0.76rem;
      transition: color 0.2s ease;
    }
    .mode-label.active {
      color: #ffffff;
      font-weight: 700;
    }
    .mode-label.highlight.active {
      color: var(--theme-primary);
    }
    .toggle-switch {
      width: 48px;
      height: 26px;
      border-radius: 9999px;
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid var(--border-glass);
      position: relative;
      cursor: pointer;
      transition: all 0.25s ease;
      padding: 2px;
    }
    .toggle-slider {
      display: block;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: #ffffff;
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease;
    }
    .toggle-switch.active {
      background: var(--theme-primary);
      box-shadow: 0 0 15px var(--theme-glow);
    }
    .toggle-switch.active .toggle-slider {
      transform: translateX(22px);
      background: #06080d;
    }

    /* Benchmark Grid */
    .benchmark-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 28px;
    }
    .panel-heading {
      font-size: 0.88rem;
      color: var(--text-dim);
      margin-bottom: 16px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .metrics-cards {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .score-box {
      display: flex;
      align-items: center;
      gap: 20px;
      padding: 18px 24px;
      background: rgba(18, 24, 38, 0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 14px;
      transition: all 0.3s ease;
    }
    .score-box.high {
      border-color: rgba(56, 239, 125, 0.4);
      box-shadow: 0 0 30px -10px rgba(56, 239, 125, 0.2);
    }
    .score-circle {
      display: flex;
      align-items: baseline;
      justify-content: center;
      padding: 12px 18px;
      background: rgba(0, 0, 0, 0.4);
      border-radius: 12px;
      border: 1px solid rgba(255, 255, 255, 0.1);
    }
    .score-val {
      font-family: var(--font-mono);
      font-size: 2.2rem;
      font-weight: 800;
      color: #ff9900;
    }
    .score-box.high .score-val {
      color: #38ef7d;
      text-shadow: 0 0 15px rgba(56, 239, 125, 0.5);
    }
    .score-max {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-left: 2px;
    }
    .score-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .score-title {
      font-size: 0.85rem;
      font-weight: 700;
      color: #ffffff;
    }
    .score-desc {
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    .sub-metrics {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 12px;
    }
    .sub-metric-card {
      padding: 14px 16px;
      background: rgba(15, 20, 32, 0.5);
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .metric-name {
      font-size: 0.68rem;
      color: var(--text-muted);
    }
    .metric-val {
      font-family: var(--font-mono);
      font-size: 1.35rem;
      font-weight: 800;
      color: #ff5555;
    }
    .metric-val.positive {
      color: var(--theme-primary);
    }
    .metric-delta {
      font-size: 0.68rem;
      color: var(--text-dim);
    }

    /* Chunks Layout */
    .chunks-layout {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .chunk-card {
      padding: 14px 18px;
      border-radius: 12px;
      background: rgba(18, 24, 38, 0.7);
      border: 1px solid var(--border-glass);
      display: flex;
      flex-direction: column;
      gap: 4px;
    }
    .chunk-main {
      border-color: var(--theme-primary);
      box-shadow: 0 0 20px -8px var(--theme-glow);
    }
    .chunk-header {
      display: flex;
      justify-content: space-between;
      font-size: 0.68rem;
    }
    .chunk-tag {
      color: var(--theme-primary);
      font-weight: 700;
    }
    .chunk-tag.danger {
      color: #ff5555;
    }
    .chunk-size {
      color: var(--text-dim);
    }
    .chunk-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      color: #ffffff;
    }
    .chunk-desc {
      font-size: 0.78rem;
      color: var(--text-dim);
    }
    .chunks-subgrid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .chunk-danger {
      border-color: rgba(255, 85, 85, 0.4);
      background: rgba(255, 85, 85, 0.05);
    }
    .optimization-callout {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 16px;
      border-radius: 10px;
      background: rgba(56, 239, 125, 0.08);
      border: 1px solid rgba(56, 239, 125, 0.25);
      color: #38ef7d;
      font-size: 0.76rem;
      margin-top: 6px;
    }
    .optimization-callout.danger {
      background: rgba(255, 85, 85, 0.08);
      border-color: rgba(255, 85, 85, 0.25);
      color: #ff7777;
    }

    /* Tab 2: RxJS Styles */
    .rxjs-interactive-body {
      display: flex;
      flex-direction: column;
      gap: 24px;
    }
    .rxjs-controls {
      display: flex;
      align-items: center;
      gap: 16px;
      flex-wrap: wrap;
    }
    .control-label {
      font-size: 0.8rem;
      color: var(--text-dim);
    }
    .btn-group {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .pipeline-tracks {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .stream-track {
      background: rgba(13, 18, 30, 0.6);
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      padding: 14px 18px;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .result-track {
      border-color: rgba(0, 242, 254, 0.3);
      background: rgba(0, 242, 254, 0.03);
    }
    .track-label {
      font-size: 0.72rem;
      color: var(--text-dim);
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .track-num {
      color: var(--theme-primary);
      font-weight: 700;
    }
    .track-line {
      display: flex;
      align-items: center;
      gap: 10px;
      min-height: 44px;
      overflow-x: auto;
      padding: 4px 0;
    }
    .track-placeholder {
      font-size: 0.75rem;
      color: var(--text-muted);
      font-style: italic;
    }
    .marble {
      padding: 6px 14px;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 700;
      white-space: nowrap;
      animation: float-gentle 2s ease-in-out infinite;
    }
    .source-marble {
      background: rgba(255, 255, 255, 0.1);
      border: 1px solid rgba(255, 255, 255, 0.3);
      color: #ffffff;
    }
    .result-marble {
      background: var(--theme-tag-bg);
      border: 1px solid var(--theme-primary);
      color: var(--theme-primary);
      box-shadow: 0 0 15px var(--theme-glow);
    }
    .operators-row {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      font-size: 0.75rem;
      color: var(--text-dim);
      flex-wrap: wrap;
    }
    .operator-badge {
      padding: 5px 12px;
      border-radius: 6px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
    }
    .operator-badge.highlight {
      border-color: var(--theme-primary);
      color: var(--theme-primary);
    }
    .rxjs-console {
      background: #06080d;
      border: 1px solid var(--border-glass);
      border-radius: 12px;
      padding: 14px 18px;
      font-size: 0.78rem;
    }
    .console-head {
      display: flex;
      justify-content: space-between;
      color: var(--theme-primary);
      margin-bottom: 10px;
      font-weight: 700;
    }
    .console-body {
      display: flex;
      flex-direction: column;
      gap: 4px;
      max-height: 120px;
      overflow-y: auto;
    }
    .log-line {
      color: #38ef7d;
    }
    .text-dim { color: var(--text-dim); }
    .text-muted { color: var(--text-muted); }

    @media (max-width: 900px) {
      .benchmark-grid {
        grid-template-columns: 1fr;
      }
      .chunks-subgrid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ArchitecturePlaygroundComponent {
  public audio = inject(AudioService);
  public theme = inject(ThemeService);

  public activeTab = signal<'bundle' | 'rxjs'>('bundle');
  public archMode = signal<'optimized' | 'legacy'>('optimized');

  // RxJS Simulation State
  public sourceMarbles = signal<Marble[]>([]);
  public resultMarbles = signal<Marble[]>([]);
  public consoleLogs = signal<string[]>([]);

  private marbleCounter = 0;

  public setTab(tab: 'bundle' | 'rxjs') {
    this.audio.playClick();
    this.activeTab.set(tab);
  }

  public toggleArchMode() {
    this.audio.playClick();
    this.archMode.set(this.archMode() === 'optimized' ? 'legacy' : 'optimized');
  }

  public emitSearch(query: string) {
    this.audio.playClick();
    const id = ++this.marbleCounter;
    
    // Add to source stream
    this.sourceMarbles.update(list => [...list.slice(-5), { id, val: `"${query}"`, color: '#fff', progress: 0 }]);
    this.consoleLogs.update(logs => [`[Event] user keyup -> input: "${query}"`, ...logs.slice(0, 4)]);

    // Simulate debounceTime(300ms) and switchMap cancel
    setTimeout(() => {
      this.audio.playSuccess();
      this.resultMarbles.update(list => [...list.slice(-4), { id, val: `GET /api/v1/search?q=${query}`, color: 'cyan', progress: 100 }]);
      this.consoleLogs.update(logs => [`[RxJS switchMap] 200 OK -> Payload rendered in 95ms (30% latency cut)`, ...logs.slice(0, 4)]);
    }, 320);
  }

  public clearMarbles() {
    this.audio.playClick();
    this.sourceMarbles.set([]);
    this.resultMarbles.set([]);
    this.consoleLogs.set([]);
  }
}
