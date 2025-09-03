# 🚀 DevForge - Modular Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features include theme switching, editable content, and automatic deployment.

## ✨ Features

- 🎨 **Multiple Themes** - Purple Haze and Green Glass themes
- ✏️ **Editable Content** - Edit mode for easy content updates
- 📱 **Responsive Design** - Works perfectly on all devices
- 🚀 **Fast Performance** - Built with Vite for optimal speed
- 🌐 **Auto-Deployment** - CI/CD pipeline with GitHub Actions
- 🎭 **Smooth Animations** - Framer Motion powered interactions

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/zedted0112/Modular-Portfoilo.git
   cd Modular-Portfoilo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   npm start
   ```

4. **Open in browser**
   - Local: http://localhost:5173/
   - Network: Use `--host` flag to expose to network

### Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run test         # Run tests and build
npm run clean        # Clean build artifacts
npm run deploy       # Deploy to GitHub Pages (manual)
```

### Environment Variables

- `.env.development` - Development settings
- `.env.production` - Production settings

## 🚀 Deployment

### Automatic Deployment (CI/CD)

The project uses **GitHub Actions** for automatic deployment:

1. **Push to main branch** triggers automatic build and deployment
2. **Pull requests** trigger build tests
3. **Manual deployment** available via GitHub Actions

### Manual Deployment

If you need to deploy manually:

```bash
npm run deploy
```

### Deployment URLs

- **Production**: https://zedted0112.github.io/Modular-Portfoilo
- **Edit Mode**: Add `?edit=true` to enable editing

## 🎨 Customization

### Adding New Themes

1. Add theme colors to `tailwind.config.js`
2. Update `ThemeContext.jsx`
3. Add background images to `src/assets/backgrounds/`

### Editing Content

1. Enable edit mode with `?edit=true` URL parameter
2. Click edit icons on editable elements
3. Changes are saved to localStorage

### Adding Features

1. Create new components in `src/components/`
2. Add routes in `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
├── context/            # React context providers
├── pages/              # Page components
├── assets/             # Images, icons, backgrounds
├── hooks/              # Custom React hooks
├── services/           # API services
├── styles/             # Global styles
└── utils/              # Utility functions
```

## 🔧 Configuration

### Vite Configuration

- Base path configured for GitHub Pages
- Build optimization for production
- Development server with hot reload

### Tailwind CSS

- Custom color palette
- Responsive breakpoints
- Component-based design system

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

---

**Built with ❤️ using React, Vite, and Tailwind CSS - CI/CD Test Deployment**
