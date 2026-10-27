import { Injectable } from '@angular/core';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'enterprise' | 'analytics' | 'ecommerce';
  categoryLabel: string;
  tagline: string;
  description: string;
  metrics: string;
  techStack: string[];
  icon: string;
  highlights: string[];
  architecturePoints: string[];
  link?: string;
}

export interface ExperienceItem {
  role: string;
  company: string;
  location: string;
  period: string;
  type: string;
  achievements: string[];
  technologies: string[];
  keyMetric: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: {
    name: string;
    level: number;
    experience: string;
    tag: string;
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioDataService {
  readonly profile = {
    name: 'K. Surya Prasath',
    headline: 'Senior Front-End Developer',
    subheadline: 'Angular Architecture • RxJS Reactive Systems • High-Velocity Web Apps',
    experienceYears: '4+ Years',
    location: 'Coimbatore, Tamil Nadu, India',
    phone: '+91 8300066557',
    email: 'Suryaskprasath14@gmail.com',
    linkedin: 'https://linkedin.com/in/surya-sk-9b834b24b',
    github: 'https://github.com/suryaprasath14/portfolio',
    avatar: 'images/surya_ai.jpg',
    avatarAi: 'images/surya_ai.jpg',
    avatarOriginal: 'images/surya.jpg',
    availability: 'Available for Senior Engineering Roles & High-Impact Consulting',
    summary: 'Senior Front-End Developer with 4 years of professional experience engineering responsive, high-performance web applications and enterprise portals. Proficient in Angular (v10–v18+), TypeScript, JavaScript (ES6+), and RESTful API integration. Experienced in improving page load speeds by 35%, implementing secure role-based user workflows, and enforcing WCAG accessibility standards across healthcare, analytical, monitoring, and e-commerce platforms.'
  };

  readonly keyMetrics = [
    { label: 'Production Experience', value: '4+ Years', detail: 'Enterprise SPA Engineering' },
    { label: 'Page Load Speedup', value: '35%', detail: 'Via Modular Lazy Loading' },
    { label: 'RESTful Endpoints', value: '25+', detail: 'Optimized Data Pipelines' },
    { label: 'Accessibility & QA', value: '40%', detail: 'Fewer UI/UX Defects' }
  ];

  readonly projects: ProjectItem[] = [
    {
      id: 'clinang',
      title: 'ClinaNG — Clinic Management System',
      category: 'enterprise',
      categoryLabel: 'Healthcare & Enterprise',
      tagline: 'End-to-end clinical workflow platform with real-time EMR and RBAC scheduling',
      description: 'Engineered an enterprise healthcare portal that unified patient appointments, Electronic Medical Records (EMRs), clinical invoicing, and doctor workflows with zero-latency record switching.',
      metrics: '40% Reduction in UI defects & 99.9% RBAC access integrity',
      techStack: ['Angular 18', 'TypeScript', 'RxJS', 'HTML5/SCSS', 'Bootstrap 4', 'RESTful APIs'],
      icon: 'stethoscope',
      highlights: [
        'Implemented strict Role-Based Access Control (RBAC) separating doctors, clinical admins, nurses, and billing staff',
        'Built real-time interactive calendar scheduler supporting drag-and-drop clinic appointment slots',
        'Architected asynchronous EMR data caching with RxJS BehaviorSubjects for instantaneous record lookup'
      ],
      architecturePoints: [
        'Modular Feature Routing with route guards for authenticated role enforcement',
        'Custom reactive forms with dynamic validation for medical prescription entries',
        'Micro-optimizations avoiding memory leaks on high-frequency appointment updates'
      ]
    },
    {
      id: 'variex',
      title: 'VARIEX — Scientific Analytics Web App',
      category: 'analytics',
      categoryLabel: 'Analytics & Visualization',
      tagline: 'High-density experimental data visualization and interactive scientific dashboard',
      description: 'Designed dynamic charting modules that convert massive scientific experimental datasets into intuitive graphical dashboards, multi-series comparisons, and exportable reports.',
      metrics: '30% Latency reduction across complex visual queries',
      techStack: ['Angular', 'TypeScript', 'JavaScript', 'Data Visualization', 'SCSS', 'Bootstrap'],
      icon: 'line-chart',
      highlights: [
        'Engineered responsive charting canvases handling hundreds of data points with smooth 60fps rendering',
        'Collaborated closely with investigative analysts to translate complex experimental requirements into performant UI features',
        'Developed custom filtering algorithms for multi-dimensional experimental parameter slicing'
      ],
      architecturePoints: [
        'Decoupled rendering layer using pure presentation components and OnPush change detection',
        'Custom canvas & SVG rendering pipelines for instant zoom and pan operations',
        'Streamlined state management for multi-dataset side-by-side comparisons'
      ]
    },
    {
      id: 'pharmacy-delivery',
      title: 'Pharmacy Management & Delivery System',
      category: 'enterprise',
      categoryLabel: 'Healthcare E-Commerce',
      tagline: 'Prescription upload, inventory orchestration, and automated refill tracking',
      description: 'Built an automated healthcare logistics system managing digital prescription uploads, real-time inventory levels, courier dispatches, and direct customer notifications.',
      metrics: '+20% Patient medication adherence via automated refill schedules',
      techStack: ['Angular', 'TypeScript', 'HTML5', 'CSS3', 'Bootstrap 4', 'REST APIs', 'Postman'],
      icon: 'package',
      highlights: [
        'Configured automated SMS and email notification triggers for recurring prescription refill schedules',
        'Created a drag-and-drop digital prescription scanner with client-side image compression',
        'Constructed warehouse inventory alert dashboards notifying dispatchers of critical low stock'
      ],
      architecturePoints: [
        'Optimized asset loading and image processing prior to network transmission',
        'Asynchronous courier dispatch tracking with periodic polling and websocket fallbacks',
        'Strict WCAG AA accessibility compliance across consumer-facing checkout'
      ]
    },
    {
      id: 'vehicle-tracking',
      title: 'Smart Vehicle Tracking Admin Panel',
      category: 'analytics',
      categoryLabel: 'Fleet Management & Telemetry',
      tagline: 'Real-time GPS telemetry dashboard with route playback and geo-fence alerts',
      description: 'Developed a centralized fleet management console monitoring live vehicle coordinates, speed telemetry, historical route replays, and automated alerts for fleet supervisors.',
      metrics: 'Real-time telemetry ingestion with 0.5s ping intervals',
      techStack: ['Angular 10', 'TypeScript', 'JavaScript', 'REST APIs', 'Maps Integration', 'SCSS'],
      icon: 'navigation',
      highlights: [
        'Integrated interactive maps displaying live marker positions with smooth heading rotations',
        'Engineered route history playback scrubbers with variable speed (1x, 2x, 5x)',
        'Built dynamic alert banners flagging unauthorized route deviations or idling vehicles'
      ],
      architecturePoints: [
        'RxJS debouncing and buffer operators to prevent UI stutter during telemetry bursts',
        'Modular lazy loaded map modules to keep core administrative bundle ultra light',
        'Resilient error boundary interceptors for continuous field connectivity'
      ]
    },
    {
      id: 'curevc-biotech',
      title: 'Curevc Group — Biotech Web Suite',
      category: 'enterprise',
      categoryLabel: 'Corporate Biotech Systems',
      tagline: 'Clinical pipelines and corporate platforms for Crosslink, Tortugasneuro, and Galaxigenomics',
      description: 'Delivered responsive multi-brand portals for biotechnology research leaders, showcasing clinical pipelines, executive leadership, patent portfolios, and discovery initiatives.',
      metrics: '99+ PageSpeed score & cross-device responsive excellence',
      techStack: ['HTML5', 'CSS3/SCSS', 'JavaScript', 'WordPress', 'Custom Theme Engineering'],
      icon: 'dna',
      highlights: [
        'Architected modular brand systems maintaining unified security and distinct visual identity',
        'Optimized media payloads and vector graphics delivering sub-second global page loads',
        'Engineered WCAG accessible interactive pipeline charts for institutional investors'
      ],
      architecturePoints: [
        'Mobile-first grid systems with fluid typography and dark mode elegance',
        'Custom clean-coded lightweight theme with zero third-party plugin bloat',
        'Secure multi-site architecture with hardened REST endpoints'
      ]
    },
    {
      id: 'delish-ecommerce',
      title: 'Delish With Love & Multi-Vendor E-Commerce',
      category: 'ecommerce',
      categoryLabel: 'E-Commerce & Retail',
      tagline: 'High-converting storefront with faceted filtering, cart drawer, and frictionless checkout',
      description: 'Launched custom storefronts for organic products and multi-vendor catalogs with instant keyword search, dynamic category filtering, and mobile-optimized cart flows.',
      metrics: '35% Higher mobile conversion rate via streamlined checkout',
      techStack: ['Shopify', 'Liquid', 'HTML5', 'CSS3', 'JavaScript', 'Git'],
      icon: 'shopping-bag',
      highlights: [
        'Engineered fast instant search with real-time product suggestions and inventory tags',
        'Created custom responsive product variants selector and high-res image zoom galleries',
        'Developed seamless slide-out cart drawer with free-shipping progress indicators'
      ],
      architecturePoints: [
        'Zero layout shifts (CLS < 0.01) with responsive picture elements and webp compression',
        'Custom Liquid templates optimized for minimum server response time',
        'Cross-browser tested across Safari, Chrome, Firefox, and Edge'
      ]
    }
  ];

  readonly experience: ExperienceItem[] = [
    {
      role: 'Front End Developer',
      company: 'Latlon Technologies',
      location: 'Coimbatore, India',
      period: 'May 2022 – Present',
      type: 'Full-Time',
      keyMetric: '35% Page Load Reduction',
      achievements: [
        'Architected and deployed responsive single-page applications (SPAs) using Angular, TypeScript, and RxJS, delivering modular component architectures across client platforms.',
        'Optimized application performance by implementing modular lazy loading and front-end best practices, resulting in a 35% reduction in page load times and improved runtime efficiency.',
        'Integrated front-end modules with 25+ RESTful endpoints, collaborating with backend engineers to establish reliable data pipelines that cut data synchronization latency by 30%.',
        'Enforced WCAG accessibility standards and resolved critical UI/UX defects across multiple release cycles, reducing customer-reported layout issues by 40%.',
        'Maintained software stability by executing comprehensive unit and integration test suites, alongside peer code reviews that decreased post-deployment defects by 25%.'
      ],
      technologies: ['Angular (v10-v18)', 'TypeScript', 'RxJS', 'SCSS', 'Bootstrap 4/5', 'REST APIs', 'GitLab', 'Postman']
    }
  ];

  readonly education = {
    degree: 'B.Sc. in Computer Science',
    institution: 'Kaamadenu Arts and Science College, Sathyamangalam',
    affiliation: 'Affiliated with Bharathiar University',
    period: 'Aug 2019 – Mar 2022',
    score: 'CGPA: 7.0 / 10',
    coursework: ['Data Structures & Algorithms', 'Web Development', 'Object-Oriented Programming', 'Database Systems', 'Software Engineering']
  };

  readonly skillCategories: SkillCategory[] = [
    {
      category: 'Core Frameworks & Languages',
      description: 'Extensive production expertise building high-performance SPAs and reactive pipelines',
      skills: [
        { name: 'Angular (v10–v18+)', level: 95, experience: '4 Years', tag: 'Expert' },
        { name: 'TypeScript', level: 92, experience: '4 Years', tag: 'Expert' },
        { name: 'RxJS Reactive Streams', level: 90, experience: '4 Years', tag: 'Advanced' },
        { name: 'JavaScript (ES6+)', level: 94, experience: '4+ Years', tag: 'Expert' },
        { name: 'Node.js & Express.js', level: 78, experience: '2 Years', tag: 'Proficient' }
      ]
    },
    {
      category: 'Architecture, State & Performance',
      description: 'Scalable software architecture, performance tuning, and secure data contracts',
      skills: [
        { name: 'Modular Lazy Loading', level: 96, experience: '4 Years', tag: '35% Speedup' },
        { name: 'RESTful API Integration', level: 95, experience: '4 Years', tag: '25+ Endpoints' },
        { name: 'Role-Based Access (RBAC)', level: 90, experience: '3 Years', tag: 'Security' },
        { name: 'State Management (Signals/RxJS)', level: 92, experience: '4 Years', tag: 'Advanced' },
        { name: 'Web Performance Optimization', level: 94, experience: '4 Years', tag: 'High-Velocity' }
      ]
    },
    {
      category: 'UI, Styling & Standards',
      description: 'Pixel-perfect responsive interfaces, custom design systems, and inclusive access',
      skills: [
        { name: 'HTML5 & Semantic Web', level: 98, experience: '4+ Years', tag: 'Mastery' },
        { name: 'CSS3 & SCSS/Sass', level: 94, experience: '4+ Years', tag: 'Expert' },
        { name: 'Bootstrap 4 & 5', level: 92, experience: '4 Years', tag: 'Expert' },
        { name: 'WCAG Accessibility Standards', level: 90, experience: '3 Years', tag: '40% Defect Cut' },
        { name: 'Responsive & Mobile-First Design', level: 95, experience: '4 Years', tag: 'Expert' }
      ]
    },
    {
      category: 'Tools, CMS & Databases',
      description: 'Modern development workflows, version control, and multi-platform CMS',
      skills: [
        { name: 'Git & GitLab', level: 92, experience: '4 Years', tag: 'Advanced' },
        { name: 'Postman & API Testing', level: 90, experience: '4 Years', tag: 'Advanced' },
        { name: 'VS Code & DevTools', level: 95, experience: '4+ Years', tag: 'Expert' },
        { name: 'Shopify & Liquid', level: 82, experience: '2 Years', tag: 'E-Commerce' },
        { name: 'WordPress Custom Styling', level: 85, experience: '3 Years', tag: 'CMS' },
        { name: 'MongoDB', level: 75, experience: '2 Years', tag: 'Database' }
      ]
    }
  ];

  readonly terminalCommands: Record<string, string> = {
    help: `Available Commands:
  - about       : Brief overview of Surya Prasath
  - skills      : Technical competencies and mastery levels
  - projects    : Production projects built & outcomes achieved
  - exp         : Professional employment history & impact
  - perf        : Performance optimization methodology (35% speedup)
  - contact     : Direct email, phone, and social links
  - theme       : Switch theme (theme cyan | theme violet | theme emerald | theme amber)
  - matrix      : Toggle matrix digital rain mode
  - cat resume  : Quick summary of credentials
  - hire        : Connect with Surya to discuss engineering opportunities
  - clear       : Clear terminal window`,
    about: `K. SURYA PRASATH — Senior Front-End Developer
Specialized in Angular (v10-v18+), RxJS, TypeScript, and high-performance SPAs.
Based in Coimbatore, Tamil Nadu, India with 4 years of proven production success.
Currently engineering mission-critical platforms at Latlon Technologies.`,
    skills: `PRIMARY STACK:
  • Frameworks: Angular (v10-v18+), RxJS, Bootstrap 4/5, Node.js
  • Languages: TypeScript, JavaScript (ES6+), HTML5, CSS3, SCSS
  • Architecture: Modular Lazy Loading, RBAC, RESTful APIs (25+ endpoints)
  • Quality: WCAG Accessibility Compliance, Unit/Integration Testing`,
    exp: `LATLON TECHNOLOGIES (May 2022 - Present) | Front End Developer
  • 35% reduction in page load times via modular lazy loading
  • 30% latency reduction across 25+ RESTful API endpoints
  • 40% drop in user-reported UI defects via WCAG standards
  • 25% decrease in post-deployment defects via test suites & peer review`,
    perf: `PERFORMANCE BLUEPRINT BY SURYA:
  1. Fine-grained Lazy Loading of route bundles & defer blocks
  2. Pure OnPush change detection & RxJS switchMap cancellation
  3. Image & asset payload minimization (webp, SVG optimization)
  4. Memory leak prevention by rigorous subscription management
  Result: 35% average page speed improvement across client SPAs!`,
    contact: `CONNECT WITH SURYA:
  • Email   : Suryaskprasath14@gmail.com
  • Phone   : +91 8300066557
  • LinkedIn: linkedin.com/in/surya-sk-9b834b24b
  • Location: Coimbatore, Tamil Nadu, India`,
    hire: `Surya Prasath is available for Senior Front-End Engineering roles and high-impact web consulting.
Please reach out at Suryaskprasath14@gmail.com or call +91 8300066557!`,
    'sudo hire': `Surya Prasath is available for Senior Front-End Engineering roles and high-impact web consulting.
Please reach out at Suryaskprasath14@gmail.com or call +91 8300066557!`
  };
}
