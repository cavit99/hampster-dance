import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'The Hampster Dance',
  description: 'Recreation of the original Hampster Dance from 1998 by Deidre LaCarte',
  authors: [{ name: 'Original by Deidre LaCarte' }],
  keywords: ['hampster dance', 'hamster dance', 'internet history', 'web nostalgia', '90s web', 'whistle stop'],
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://hampster-dance.vercel.app'),
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'The Hampster Dance',
    description: 'Recreation of the original Hampster Dance from 1998',
    type: 'website',
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body style={{ minWidth: '320px', maxWidth: '100dvw', overflowX: 'hidden' }}>
        <div style={{ margin: '0 auto', minHeight: '100dvh', width: '100%', maxWidth: '1200px' }}>
          {children}
        </div>
      </body>
    </html>
  )
}
