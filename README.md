# 🚀 Modern Angular Portfolio

A sleek, performant, and fully responsive portfolio website built with Angular 18+, featuring a dynamic blog system, smooth animations, and an elegant design system.

![Angular](https://img.shields.io/badge/Angular-18+-DD0031?style=flat&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?style=flat&logo=typescript)
![Material](https://img.shields.io/badge/Material-UI-0081CB?style=flat&logo=material-ui)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)

## ✨ Features

### 🎨 Design & User Experience
- **Modern Design System**: Clean, minimalist interface with a nature-inspired green color palette
- **Dark/Light Mode**: Seamless theme switching with user preference persistence
- **Smooth Animations**: Fluid page transitions and micro-interactions using Web Animations API
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Accessibility-First**: WCAG AA compliant color contrasts and semantic HTML

### 📝 Dynamic Blog System
- **Markdown-Powered**: Write blog posts in Markdown with full syntax support
- **Tag System**: Filter posts by technology, topic, or category
- **Search Functionality**: Real-time search across titles and descriptions
- **Reading Time Estimates**: Automatically calculated for each post
- **SEO Optimized**: Meta tags, structured data, and semantic markup

### ⚡ Performance & Modern Practices
- **Standalone Components**: Leveraging Angular's latest architecture patterns
- **Lazy Loading**: Route-based code splitting for optimal bundle sizes
- **Signal-Based State**: Using Angular Signals for reactive data management
- **Optimized Assets**: Compressed images and efficient resource loading
- **Fast Page Load**: Lighthouse scores optimized for performance

### 🛠️ Technical Highlights
- **Type-Safe**: Full TypeScript implementation with strict mode
- **Modular Architecture**: Clean separation of concerns with feature-based structure
- **Reusable Components**: Shared component library for consistency
- **Service-Based Logic**: Business logic abstracted into services
- **Modern Routing**: Angular's latest routing with animation support

## 🏗️ Project Structure

```
src/
├── app/
│   ├── core/                    # Core services and models
│   │   ├── models/              # TypeScript interfaces and types
│   │   └── services/            # Business logic services
│   ├── features/                # Feature modules
│   │   ├── home/                # Landing page
│   │   ├── projects/            # Project showcase
│   │   ├── blog/                # Blog system
│   │   │   ├── blog-list/       # All blog posts
│   │   │   └── blog-post/       # Individual post viewer
│   │   └── contact/             # Contact form
│   └── shared/                  # Shared resources
│       ├── components/          # Reusable components
│       ├── directives/          # Custom directives
│       ├── pipes/               # Custom pipes
│       └── utils/               # Helper functions
├── public/                      # Static assets
│   └── images/                  # Static Images
│   └── projects/                  # Projects Content
│   └── blog/                    # Blog content
│       ├── blog-metadata.json   # Post metadata
│       └── posts/               # Markdown files
└── styles/                      # Global styles
    ├── _theme.scss              # Material theme
    └── _variables.scss          # CSS custom properties
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Angular CLI 18+

### Installation

```bash
# Clone the repository
git clone https://github.com/gilbertoayala12/angular-portfolio.git
cd angular-portfolio

# Install dependencies
npm install

# Start development server
npm start
```

Navigate to `http://localhost:4200/` - the app will automatically reload when you make changes.

### Building for Production

```bash
# Build the project
npm run build

# The build artifacts will be stored in the `dist/` directory
```

## 📝 Adding Blog Posts

### 1. Create a Markdown File

Create a new `.md` file in `public/blog/posts/`:

```markdown
# Your Blog Post Title

Your introduction paragraph...

## Section Heading

Content goes here with **bold** and *italic* text.

### Code Examples

\`\`\`typescript
const example = 'Your code here';
\`\`\`
```

### 2. Update Metadata

Add an entry to `public/blog/blog-metadata.json`:

```json
{
  "id": "unique-id",
  "title": "Your Post Title",
  "slug": "url-friendly-slug",
  "date": "2024-12-15",
  "description": "Brief description for previews",
  "tags": ["Angular", "TypeScript"],
  "readTime": "5 min",
  "fileName": "your-post-file.md",
  "author": "Your Name"
}
```

### 3. Deploy

Push to your main branch and Vercel will automatically deploy!

## 🎨 Customization

### Color Theme

Edit `src/styles/_variables.scss` to customize colors:

```scss
:root {
  --color-accent: #059669;        // Primary green
  --color-accent-hover: #047857;  // Darker green
  // ... more variables
}
```

### Animations

Modify animation timings in `src/app/shared/utils/animations.ts`:

```typescript
export function fadeIn(element: HTMLElement, duration = 400): Animation {
  // Customize animation behavior
}
```

## 🛠️ Tech Stack

- **Framework**: Angular 18+
- **Language**: TypeScript 5.0+
- **Styling**: SCSS with CSS Custom Properties
- **UI Components**: Angular Material 18+
- **Markdown**: ngx-markdown
- **Icons**: Material Icons
- **Animations**: Web Animations API
- **Deployment**: Vercel
- **Version Control**: Git

## 📦 Key Dependencies

```json
{
  "@angular/core": "^18.0.0",
  "@angular/material": "^18.0.0",
  "ngx-markdown": "^18.0.0",
  "marked": "^12.0.0"
}
```

## 🌐 Deployment

This project is configured for seamless deployment on Vercel:

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel auto-detects Angular and configures build settings
4. Every push to `main` triggers an automatic deployment

### Environment Configuration

No environment variables are required for the base setup. The blog system uses static files served directly from the `public` folder.

## 📈 Performance Optimizations

- ✅ Lazy-loaded routes reduce initial bundle size
- ✅ Standalone components enable better tree-shaking
- ✅ Image optimization with lazy loading
- ✅ Efficient change detection with OnPush strategy
- ✅ Route-level code splitting
- ✅ Preload strategy for improved navigation

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run end-to-end tests
npm run e2e

# Generate code coverage
npm run test:coverage
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/gilbertoayala12/angular-portfolio/issues).

## 👨‍💻 Author

**Gilberto Ayala**
- GitHub: [@gilbertoayala12](https://github.com/gilbertoayala12)
- LinkedIn: [Carlos Gilberto Ayala Limon](https://www.linkedin.com/in/carlos-gilberto-ayala-limon-8a9413147)

## ⭐ Show Your Support

Give a ⭐️ if this project helped you!

---

Built with ❤️ using Angular and modern web technologies