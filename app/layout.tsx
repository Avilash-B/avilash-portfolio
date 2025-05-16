import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Avilash Bharti | Software Engineer & .NET Developer',
  description: 'Portfolio website of Avilash Bharti, a Software Engineer and .NET Developer specializing in full-stack development. View projects, skills, and experience.',
  keywords: 'Avilash Bharti, Software Engineer, .NET Developer, Full Stack Developer, Web Development, Portfolio',
  authors: [{ name: 'Avilash Bharti' }],
  creator: 'Avilash Bharti',
  publisher: 'Avilash Bharti',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://avilashbharti.in',
    title: 'Avilash Bharti | Software Engineer & .NET Developer',
    description: 'Portfolio website of Avilash Bharti, a Software Engineer and .NET Developer specializing in full-stack development.',
    siteName: 'Avilash Bharti Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Avilash Bharti | Software Engineer & .NET Developer',
    description: 'Portfolio website of Avilash Bharti, a Software Engineer and .NET Developer specializing in full-stack development.',
  },
  verification: {
    google: 'your-google-site-verification', // You'll need to add your Google Search Console verification code
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico"/>
      </head>      
      <body>{children}</body>
    </html>
  )
}
