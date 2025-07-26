import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://avilashbharti.in'),
  title: {
    default: 'Avilash Bharti | Software Engineer & .NET Developer Portfolio',
    template: '%s | Avilash Bharti'
  },
  description: 'Experienced Software Engineer and .NET Developer specializing in full-stack web development, C#, ASP.NET, React, and modern web technologies. View my projects, skills, and professional experience.',
  keywords: [
    'Avilash Bharti',
    'Software Engineer',
    '.NET Developer',
    'Full Stack Developer',
    'C# Developer',
    'ASP.NET Developer',
    'React Developer',
    'Web Development',
    'Portfolio',
    'Software Development',
    'Backend Developer',
    'Frontend Developer',
    'API Development',
    'Database Design',
    'Microsoft Technologies'
  ],
  authors: [{ name: 'Avilash Bharti', url: 'https://avilashbharti.in' }],
  creator: 'Avilash Bharti',
  publisher: 'Avilash Bharti',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avilashbharti.in',
    title: 'Avilash Bharti | Full Stack Software Engineer',
    description: 'Experienced Software Engineer and .NET Developer specializing in full-stack web development. Explore my projects, technical skills, and professional journey.',
    siteName: 'Avilash Bharti Portfolio',
    images: [
      {
        url: '/images/avilash-share.jpg', // You'll need to create this image
        width: 1200,
        height: 630,
        alt: 'Avilash Bharti - Software Engineer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avilash Bharti | Full Stack Software Engineer',
    description: 'Experienced Software Engineer and .NET Developer specializing in full-stack web development. View my portfolio and projects.',
    images: ['/images/avilash-share.jpg'],
    creator: '@AviCorpse',
    site: '@AviCorpse',
  },
  // Additional social media and platform metadata
  other: {
    // LinkedIn
    'linkedin:owner': 'avilashbharti',
    'linkedin:title': 'Avilash Bharti | Full Stack Software Engineer',
    'linkedin:description': 'Experienced Software Engineer and .NET Developer specializing in full-stack web development. Connect with me on LinkedIn.',
    'linkedin:image': '/images/avilash-share.jpg',

    // Instagram
    'instagram:title': 'Avilash Bharti | Software Engineer',
    'instagram:description': 'Follow my journey as a Software Engineer and .NET Developer. Behind-the-scenes of coding life.',
    'instagram:image': '/images/avilash-share.jpg',
    'instagram:creator': '@avilash_bharti',

    // Facebook
    'facebook:title': 'Avilash Bharti | Full Stack Software Engineer Portfolio',
    'facebook:description': 'Experienced Software Engineer and .NET Developer. Explore my projects and professional journey.',
    'facebook:image': '/images/avilash-share.jpg',
    'facebook:type': 'website',
    'facebook:url': 'https://avilashbharti.in',

    // Discord (for tech communities)
    'discord:title': 'Avilash Bharti | Software Engineer',
    'discord:description': 'Full Stack Developer specializing in .NET and React. Available for tech discussions and collaborations.',
    'discord:image': '/images/avilash-share.jpg',

    // Microsoft/GitHub specific
    'github:user': 'avilash-b',
    'github:title': 'Avilash Bharti - Software Engineer',
    'github:description': 'Check out my open source projects and contributions on GitHub.',

    // Professional platforms
    // 'stackoverflow:user': 'avilash-bharti', // Replace with actual Stack Overflow profile
    // 'dev.to:username': 'avilashbharti', // Replace with actual Dev.to username if you have one

    // WhatsApp sharing
    'whatsapp:title': 'Avilash Bharti | Software Engineer Portfolio',
    'whatsapp:description': 'Check out this amazing portfolio of a Full Stack Software Engineer!',

    // Telegram sharing
    'telegram:title': 'Avilash Bharti | Software Engineer',
    'telegram:description': 'Portfolio of an experienced .NET and React developer.',
    'telegram:image': '/images/avilash-share.jpg',

    // Pinterest
    'pinterest:title': 'Avilash Bharti | Software Engineer Portfolio',
    'pinterest:description': 'Professional portfolio showcasing software development projects and skills.',
    'pinterest:image': '/images/avilash-share.jpg',

    // Reddit
    'reddit:title': 'Avilash Bharti | Full Stack Software Engineer',
    'reddit:description': 'Portfolio of an experienced Software Engineer specializing in .NET and React development.',

    // YouTube (if you have tech content)
    // 'youtube:channel': 'avilashbharti', // Replace with actual YouTube channel if you have one
    // 'youtube:title': 'Avilash Bharti | Software Engineer',
    // 'youtube:description': 'Tech tutorials and software development insights.',

    // Skype
    // 'skype:username': 'avilash.bharti', // Replace with actual Skype username

    // Medium (if you write articles)
    // 'medium:username': '@avilashbharti', // Replace with actual Medium username if you have one
    // 'medium:title': 'Avilash Bharti | Software Engineer',
    // 'medium:description': 'Read my articles about software development, .NET, and web technologies.',

    // General sharing metadata
    'sharing:title': 'Avilash Bharti | Software Engineer Portfolio',
    'sharing:description': 'Experienced Full Stack Developer specializing in .NET and React. View projects and professional experience.',
    'sharing:image': '/images/avilash-share.jpg',
    'sharing:url': 'https://avilashbharti.in',
  },
  alternates: {
    canonical: 'https://avilashbharti.in',
  },
  verification: {
    google: 'zdQFYxKVBv3AoLlMTfXFm3zBeftFUoFsqW9mZsvT3Xs', // Replace with your actual Google Search Console verification code
    // yandex: 'your-yandex-verification', // Add if needed
    // bing: 'your-bing-verification', // Add if needed
  },
  category: 'technology',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Avilash Bharti",
    "jobTitle": "Software Engineer",
    "description": "Experienced Software Engineer and .NET Developer specializing in full-stack web development",
    "url": "https://avilashbharti.in",
    "sameAs": [
      "https://linkedin.com/in/avilashbharti",
      "https://github.com/avilash-b",
      "https://x.com/AviCorpse",
      "https://www.instagram.com/avilash_bharti/",
      "https://stackoverflow.com/users/13072887/avilash-bharti",
      "https://www.facebook.com/avi.corpse",
    ],
    "knowsAbout": [
      "Software Engineering",
      ".NET Development",
      "C# Programming",
      "ASP.NET",
      "React",
      "JavaScript",
      "Web Development",
      "Full Stack Development",
      "Database Design",
      "API Development"
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "C-DAC"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Ahead"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  }

  return (
    <html lang="en">
      <head>
        {/* Favicon and app icons */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon48.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="zdQFYxKVBv3AoLlMTfXFm3zBeftFUoFsqW9mZsvT3Xs" />

        {/* Additional social media meta tags */}
        {/* <meta property="fb:app_id" content="your-facebook-app-id" /> */}
        <meta name="linkedin:owner" content="avilashbharti" />
        {/* <meta name="pinterest-rich-pin" content="true" /> */}
        <meta name="theme-color" content="#1976d2" />
        <meta name="msapplication-TileColor" content="#1976d2" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Avilash Bharti" />

        {/* WhatsApp specific meta tags */}
        <meta property="whatsapp:title" content="Avilash Bharti | Software Engineer Portfolio" />
        <meta property="whatsapp:description" content="Check out this amazing portfolio of a Full Stack Software Engineer!" />
        <meta property="whatsapp:image" content="https://avilashbharti.in/images/avilash-share.jpg" />

        {/* Telegram specific meta tags */}
        {/* <meta property="telegram:title" content="Avilash Bharti | Software Engineer" />
        <meta property="telegram:description" content="Portfolio of an experienced .NET and React developer." />
        <meta property="telegram:image" content="https://avilashbharti.in/images/avilash-share.jpg" /> */}

        {/* Discord embed meta tags */}
        <meta property="discord:title" content="Avilash Bharti | Software Engineer" />
        <meta property="discord:description" content="Full Stack Developer specializing in .NET and React. Available for tech discussions and collaborations." />
        <meta property="discord:image" content="https://avilashbharti.in/images/avilash-share.jpg" />

        {/* Rich snippets for professional profiles */}
        <link rel="me" href="https://linkedin.com/in/avilashbharti" />
        <link rel="me" href="https://github.com/avilash-b" />
        <link rel="me" href="https://x.com/AviCorpse" />
        <link rel="me" href="https://www.instagram.com/avilash_bharti/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
