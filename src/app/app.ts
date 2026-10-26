import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeroComponent } from './components/hero/hero.component';
import { ArchitecturePlaygroundComponent } from './components/architecture-playground/architecture-playground.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';
import { InteractiveTerminalComponent } from './components/interactive-terminal/interactive-terminal.component';
import { InteractiveBackgroundComponent } from './components/interactive-background/interactive-background.component';
import { CustomCursorComponent } from './components/custom-cursor/custom-cursor.component';
import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    HeroComponent,
    ArchitecturePlaygroundComponent,
    ProjectsComponent,
    SkillsComponent,
    ExperienceComponent,
    ContactComponent,
    FooterComponent,
    InteractiveTerminalComponent,
    InteractiveBackgroundComponent,
    CustomCursorComponent
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  @ViewChild(InteractiveTerminalComponent) terminalComp?: InteractiveTerminalComponent;
  public themeService = inject(ThemeService);

  public openTerminal() {
    this.terminalComp?.openTerminal();
  }
}
