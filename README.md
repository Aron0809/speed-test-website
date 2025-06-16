# SpeedPulse - Network Speed Test Website

🚀 A modern, real-time network speed testing website built with React and TypeScript.

## ✨ Features

- **Real-time Speed Testing**: Accurate download and upload speed measurements
- **Modern UI**: Clean and responsive design with smooth animations
- **Multi-language Support**: Built-in internationalization (i18n)
- **Mobile-first Design**: Optimized for all devices and screen sizes
- **Performance Analytics**: Detailed speed test history and analytics
- **Blog System**: Integrated blog for network-related content
- **PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Build Tool**: Vite
- **Router**: React Router v7
- **UI Components**: Radix UI, Lucide React
- **Deployment**: Vercel, Cloudflare Pages
- **Development**: ESLint, PostCSS

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aron0809/speed-test-website.git
   cd speed-test-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:5173` to see the application.

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
```bash
# The project is configured for automatic deployment via Vercel
# Push to main branch to trigger deployment
```

### Deploy to Cloudflare Pages
```bash
npm run deploy
```

## 📁 Project Structure

```
speed-test-website/
├── src/
│   ├── components/          # React components
│   │   ├── Layout.tsx      # Main layout component
│   │   ├── HomePage.tsx    # Speed test interface
│   │   ├── BlogPage.tsx    # Blog functionality
│   │   └── ...
│   ├── hooks/              # Custom React hooks
│   ├── utils/              # Utility functions
│   ├── styles/             # CSS and styling
│   ├── App.tsx             # Main application component
│   └── main.tsx            # Application entry point
├── public/                 # Static assets
├── api/                    # API endpoints (Vercel)
├── dist/                   # Build output
├── ads.txt                 # Google AdSense verification
└── ...config files
```

## 🎯 Key Features Explained

### Speed Testing Engine
- **Accurate Measurements**: Uses multiple test servers for precise results
- **Real-time Updates**: Live progress indicators and speed graphs
- **Comprehensive Metrics**: Download/Upload speeds, latency, jitter

### User Experience
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme detection and manual toggle
- **Accessibility**: Full keyboard navigation and screen reader support

### Performance Optimization
- **Code Splitting**: Automatic chunking for faster load times
- **Image Optimization**: WebP format with lazy loading
- **Caching Strategy**: Optimized cache headers for better performance

## 🌐 Deployment URLs

- **Primary**: [speed-test-website-sepia.vercel.app](https://speed-test-website-sepia.vercel.app)
- **Cloudflare**: Available via Cloudflare Pages

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to Cloudflare

## 🐛 Known Issues & Roadmap

### Current Version (v0.0.0)
- ✅ Basic speed testing functionality
- ✅ Responsive design
- ✅ Multi-language support

### Planned Features
- [ ] Speed test history storage
- [ ] User accounts and profiles
- [ ] Advanced analytics dashboard
- [ ] API for third-party integrations
- [ ] More test server locations

## 📊 Performance

The website is optimized for performance with:
- **Lighthouse Score**: 95+ (Performance, Accessibility, Best Practices, SEO)
- **Core Web Vitals**: Excellent ratings
- **Bundle Size**: Optimized for fast loading

## 🔧 Configuration

### Environment Variables
Create a `.env` file for local development:
```
VITE_API_BASE_URL=your_api_url
VITE_GA_TRACKING_ID=your_google_analytics_id
```

### AdSense Integration
The `ads.txt` file is properly configured for Google AdSense verification.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aron** - [GitHub Profile](https://github.com/Aron0809)

## 🙏 Acknowledgments

- React team for the excellent framework
- Vercel for hosting and deployment
- Cloudflare for CDN and edge computing
- The open-source community for amazing tools and libraries

---

⭐ **Star this repository if you found it helpful!** 