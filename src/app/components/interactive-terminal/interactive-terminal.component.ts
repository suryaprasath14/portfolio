import { Component, ElementRef, ViewChild, inject, signal, Input, Output, EventEmitter, AfterViewChecked, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioDataService } from '../../services/portfolio-data.service';
import { AudioService } from '../../services/audio.service';
import { ThemeService, CyberTheme } from '../../services/theme.service';

interface CommandEntry {
  command: string;
  output: string;
  type?: 'info' | 'success' | 'warn' | 'error';
}

@Component({
  selector: 'app-interactive-terminal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    @if (isOpen()) {
      <div class="terminal-modal-backdrop" (click)="closeTerminal()">
        <div class="terminal-window glass-card" (click)="$event.stopPropagation()">
          
          <!-- Terminal Titlebar -->
          <div class="terminal-titlebar font-mono">
            <div class="window-buttons">
              <button type="button" class="win-btn close" (click)="closeTerminal()" title="Close Terminal (Esc)"></button>
              <button type="button" class="win-btn minimize" (click)="minimizeTerminal()" title="Minimize"></button>
              <button type="button" class="win-btn maximize" (click)="toggleFullscreen()" title="Fullscreen"></button>
            </div>
            <div class="window-title">
              <span>surya&#64;angular-architect: ~ (ng-cli v21.1)</span>
            </div>
            <div class="status-tag">
              <span>ONLINE</span>
            </div>
          </div>

          <!-- Quick Suggestion Buttons -->
          <div class="suggestions-strip font-mono">
            <span class="sugg-label">QUICK_RUN:</span>
            <button type="button" class="sugg-chip" (click)="runCommand('help')">help</button>
            <button type="button" class="sugg-chip" (click)="runCommand('projects')">projects</button>
            <button type="button" class="sugg-chip" (click)="runCommand('perf')">perf</button>
            <button type="button" class="sugg-chip" (click)="runCommand('skills')">skills</button>
            <button type="button" class="sugg-chip" (click)="runCommand('contact')">contact</button>
            <button type="button" class="sugg-chip hire" (click)="runCommand('hire')">hire</button>
            <button type="button" class="sugg-chip" (click)="runCommand('clear')">clear</button>
          </div>

          <!-- Terminal Output Canvas -->
          <div #terminalBody class="terminal-body font-mono">
            <div class="welcome-banner">
              <pre class="ascii-art">
   _____ _    _ ______     __       _____  _____            _____       _______ _    _ 
  / ____| |  | |  __ \\   / /\\     |  __ \\|  __ \\   /\\    / ____|   /\\|__   __| |  | |
 | (___ | |  | | |__) | / /  \\    | |__) | |__) | /  \\  | (___    /  \\  | |  | |__| |
  \\___ \\| |  | |  _  / / / /\\ \\   |  ___/|  _  / / /\\ \\  \\___ \\  / /\\ \\ | |  |  __  |
  ____) | |__| | | \\ \\/ / ____ \\  | |    | | \\ \\/ ____ \\ ____) |/ ____ \\| |  | |  | |
 |_____/ \\____/|_|  \\/_/    \\_\\ |_|    |_|  \\_/_/    \\_\\_____//_/    \\_\\_|  |_|  |_|
              </pre>
              <div class="banner-text">
                Welcome to Surya Prasath's Interactive Developer Terminal.
                Type <span class="highlight">help</span> to list available operations or click any shortcut above.
              </div>
            </div>

            <!-- Command History -->
            @for (item of history(); track $index) {
              <div class="history-item">
                <div class="cmd-line">
                  <span class="prompt-user">surya&#64;portfolio</span>:<span class="prompt-dir">~</span>$ 
                  <span class="cmd-text">{{ item.command }}</span>
                </div>
                @if (item.output) {
                  <pre class="output-text" [class.success]="item.type === 'success'">{{ item.output }}</pre>
                }
              </div>
            }

            <!-- Current Input Line -->
            <div class="input-line">
              <span class="prompt-user">surya&#64;portfolio</span>:<span class="prompt-dir">~</span>$ 
              <input 
                #cmdInput
                type="text" 
                class="cmd-input font-mono" 
                [(ngModel)]="currentInput"
                (keydown.enter)="executeCurrentCommand()"
                (keydown.arrowup)="navigateHistory('up')"
                (keydown.arrowdown)="navigateHistory('down')"
                spellcheck="false"
                autocomplete="off"
                placeholder="type a command..." />
            </div>
          </div>

          <!-- Terminal Footer -->
          <div class="terminal-footer font-mono">
            <span>Tip: Press [Esc] to exit • [~] to toggle CLI</span>
            <span>Angular v21.1 • RxJS 7.8</span>
          </div>

        </div>
      </div>
    }
  `,
  styles: [`
    .terminal-modal-backdrop {
      position: fixed;
      inset: 0;
      background: rgba(3, 5, 8, 0.85);
      backdrop-filter: blur(14px);
      z-index: 5000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
      animation: fadeIn 0.2s ease;
    }
    .terminal-window {
      width: 100%;
      max-width: 860px;
      height: 600px;
      max-height: 90vh;
      background: rgba(8, 11, 18, 0.95);
      border: 1px solid var(--border-bright);
      border-radius: 16px;
      box-shadow: 0 40px 90px -20px rgba(0, 0, 0, 0.95),
                  0 0 50px -10px var(--theme-glow);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .terminal-titlebar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 18px;
      background: rgba(15, 20, 32, 0.95);
      border-bottom: 1px solid var(--border-glass);
      font-size: 0.75rem;
    }
    .window-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .win-btn {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
    }
    .win-btn.close { background: #ff5f56; }
    .win-btn.minimize { background: #ffbd2e; }
    .win-btn.maximize { background: #27c93f; }

    .window-title {
      color: var(--text-dim);
      font-weight: 600;
    }
    .status-tag {
      font-size: 0.65rem;
      color: #38ef7d;
      background: rgba(56, 239, 125, 0.1);
      padding: 2px 8px;
      border-radius: 4px;
      border: 1px solid rgba(56, 239, 125, 0.3);
    }

    .suggestions-strip {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 18px;
      background: rgba(11, 15, 25, 0.7);
      border-bottom: 1px solid var(--border-glass);
      overflow-x: auto;
      font-size: 0.75rem;
    }
    .sugg-label {
      color: var(--text-muted);
      font-size: 0.68rem;
    }
    .sugg-chip {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border-glass);
      color: var(--text-dim);
      padding: 3px 10px;
      border-radius: 6px;
      font-family: inherit;
      font-size: 0.72rem;
      cursor: pointer;
      transition: all 0.2s ease;
      white-space: nowrap;
    }
    .sugg-chip:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #ffffff;
      border-color: var(--theme-primary);
    }
    .sugg-chip.hire {
      border-color: #38ef7d;
      color: #38ef7d;
      background: rgba(56, 239, 125, 0.08);
    }

    .terminal-body {
      flex: 1;
      padding: 20px;
      overflow-y: auto;
      font-size: 0.85rem;
      line-height: 1.55;
      color: #e2e8f0;
    }
    .ascii-art {
      font-size: 0.52rem;
      line-height: 1.1;
      color: var(--theme-primary);
      margin-bottom: 12px;
      overflow-x: auto;
    }
    .banner-text {
      font-size: 0.82rem;
      color: var(--text-dim);
      padding-bottom: 16px;
      border-bottom: 1px dashed rgba(255, 255, 255, 0.1);
      margin-bottom: 16px;
    }
    .highlight {
      color: var(--theme-primary);
      font-weight: 700;
    }

    .history-item {
      margin-bottom: 14px;
    }
    .cmd-line {
      display: flex;
      align-items: center;
      gap: 6px;
      color: #ffffff;
    }
    .prompt-user {
      color: var(--theme-primary);
      font-weight: 700;
    }
    .prompt-dir {
      color: var(--theme-secondary);
    }
    .cmd-text {
      color: #ffffff;
      font-weight: 600;
    }
    .output-text {
      margin-top: 6px;
      padding-left: 14px;
      color: var(--text-dim);
      white-space: pre-wrap;
      font-family: inherit;
      border-left: 2px solid rgba(255, 255, 255, 0.08);
    }
    .output-text.success {
      color: #38ef7d;
      border-left-color: #38ef7d;
    }

    .input-line {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
    .cmd-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: #ffffff;
      font-size: 0.85rem;
      font-family: inherit;
    }

    .terminal-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 18px;
      background: rgba(11, 15, 25, 0.9);
      border-top: 1px solid var(--border-glass);
      font-size: 0.68rem;
      color: var(--text-muted);
    }

    @media (max-width: 640px) {
      .ascii-art {
        display: none;
      }
      .terminal-window {
        height: 85vh;
      }
    }
  `]
})
export class InteractiveTerminalComponent implements AfterViewChecked {
  @ViewChild('cmdInput') cmdInputRef!: ElementRef<HTMLInputElement>;
  @ViewChild('terminalBody') terminalBodyRef!: ElementRef<HTMLDivElement>;

  public data = inject(PortfolioDataService);
  public audio = inject(AudioService);
  public theme = inject(ThemeService);

  public isOpen = signal(false);
  public history = signal<CommandEntry[]>([]);
  public currentInput = '';

  private commandHistoryList: string[] = [];
  private historyIndex = -1;
  private shouldScroll = false;

  @HostListener('window:keydown', ['$event'])
  onGlobalKeyDown(e: KeyboardEvent) {
    if (e.key === '`' || e.key === '~') {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        // Ignore if user is typing in regular input
        if (e.target !== this.cmdInputRef?.nativeElement) return;
      }
      e.preventDefault();
      this.toggleTerminal();
    } else if (e.key === 'Escape' && this.isOpen()) {
      this.closeTerminal();
    }
  }

  ngAfterViewChecked() {
    if (this.shouldScroll && this.terminalBodyRef) {
      this.terminalBodyRef.nativeElement.scrollTop = this.terminalBodyRef.nativeElement.scrollHeight;
      this.shouldScroll = false;
    }
  }

  public openTerminal() {
    this.audio.playTerminal();
    this.isOpen.set(true);
    setTimeout(() => {
      this.cmdInputRef?.nativeElement?.focus();
    }, 100);
  }

  public closeTerminal() {
    this.audio.playClick();
    this.isOpen.set(false);
  }

  public toggleTerminal() {
    if (this.isOpen()) {
      this.closeTerminal();
    } else {
      this.openTerminal();
    }
  }

  public minimizeTerminal() {
    this.closeTerminal();
  }

  public toggleFullscreen() {
    // Handled via responsive styling
    this.audio.playClick();
  }

  public runCommand(cmd: string) {
    this.currentInput = cmd;
    this.executeCurrentCommand();
  }

  public executeCurrentCommand() {
    const raw = this.currentInput.trim();
    if (!raw) return;

    this.audio.playClick();
    this.commandHistoryList.push(raw);
    this.historyIndex = this.commandHistoryList.length;

    const lower = raw.toLowerCase();
    this.currentInput = '';

    if (lower === 'clear') {
      this.history.set([]);
      return;
    }

    if (lower === 'exit') {
      this.closeTerminal();
      return;
    }

    // Theme command
    if (lower.startsWith('theme ')) {
      const selected = lower.replace('theme ', '').trim() as CyberTheme;
      if (['cyan', 'violet', 'emerald', 'amber'].includes(selected)) {
        this.theme.setTheme(selected);
        this.addOutput(raw, `Theme switched to [${selected.toUpperCase()}]. UI palette updated.`, 'success');
        return;
      } else {
        this.addOutput(raw, `Invalid theme. Available options: cyan, violet, emerald, amber.`, 'warn');
        return;
      }
    }

    // Lookup command in dictionary
    if (this.data.terminalCommands[lower]) {
      const isSuccess = lower === 'sudo hire' || lower === 'perf';
      this.addOutput(raw, this.data.terminalCommands[lower], isSuccess ? 'success' : 'info');
      if (lower === 'sudo hire') {
        this.audio.playSuccess();
      }
      return;
    }

    // Fallback unknown command
    this.addOutput(raw, `Command not recognized: "${raw}". Type "help" to see valid commands.`, 'error');
  }

  private addOutput(command: string, output: string, type: 'info' | 'success' | 'warn' | 'error' = 'info') {
    this.history.update(h => [...h, { command, output, type }]);
    this.shouldScroll = true;
  }

  public navigateHistory(direction: 'up' | 'down') {
    if (this.commandHistoryList.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.currentInput = this.commandHistoryList[this.historyIndex];
      }
    } else {
      if (this.historyIndex < this.commandHistoryList.length - 1) {
        this.historyIndex++;
        this.currentInput = this.commandHistoryList[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistoryList.length;
        this.currentInput = '';
      }
    }
  }
}
