# Avilash Bharti Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Material-UI.

## 🚀 Features

- **Responsive Design** - Works perfectly on all devices
- **Dark/Light Mode** - Toggle between themes
- **SEO Optimized** - Enhanced search engine visibility
- **Contact Form** - Functional contact form with API integration
- **Smooth Animations** - Engaging user experience
- **Modern Tech Stack** - Next.js 14, TypeScript, Material-UI

## 🛠️ Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **UI Library:** Material-UI (MUI)
- **Styling:** MUI System + Custom CSS
- **Deployment:** Vercel/Netlify ready
- **MyDeployment:** Self hosted linux server with coolify

## 📦 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/avilash-b/avilash-portfolio.git
   cd avilash-portfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   # Copy the .env file and update with your values
   cp .env .env.local
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Base URL
NEXT_PUBLIC_API_BASE_URL
```

### Required Variables:
- `NEXT_PUBLIC_API_BASE_URL` - Base URL for the API 

### Environment Variables for Production:
Set these in your deployment platform:
- `NEXT_PUBLIC_API_BASE_URL=`

## 📁 Project Structure

```
├── app/
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── lib/                    # Utility functions
├── public/                 # Static assets
├── .env                    # Environment variables template
└── README.md
```

## 🎨 Components

- **Header** - Navigation and branding
- **Home** - Hero section with introduction
- **Projects** - Portfolio showcase
- **Skills** - Technical skills display
- **Experience** - Work experience timeline
- **Education** - Educational background
- **Contact** - Contact form and information
- **Footer** - Site footer with links

## 🔧 Development

### Available Scripts:
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style:
- TypeScript for type safety
- ESLint for code quality
- Consistent component structure
- Material-UI design system

## 📱 Features

### SEO Optimization:
- Meta tags and Open Graph
- Structured data (JSON-LD)
- Sitemap generation
- Social media integration

### Performance:
- Next.js optimization
- Image optimization
- Code splitting
- Lazy loading

### Accessibility:
- Semantic HTML
- ARIA labels
- Keyboard navigation
- Screen reader support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Contact

- **Email:** avilash.bharti@outlook.com
- **LinkedIn:** [linkedin.com/in/avilashbharti](https://linkedin.com/in/avilashbharti)
- **GitHub:** [github.com/avilash-b](https://github.com/avilash-b)
- **Website:** [avilashbharti.in](https://avilashbharti.in)

---

Built with ❤️ by Avilash Bharti