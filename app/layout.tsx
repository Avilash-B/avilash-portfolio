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
    images: ['/images/avilash-share.jpg'], // You'll need to create this image
    creator: '@avilashbharti', // Replace with your actual Twitter handle
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
      "https://www.instagram.com/avilash_bharti/"
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
        <link rel="icon" href="/favicon.ico" />
        {/* <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" /> */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="google-site-verification" content="zdQFYxKVBv3AoLlMTfXFm3zBeftFUoFsqW9mZsvT3Xs" />
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
