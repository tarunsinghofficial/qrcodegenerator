import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

import SessionProvider from "../app/components/SessionProvider"
import { getServerSession } from 'next-auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'QR Code generator',
  description: 'Generate QR code in seconds! Application by Tarun Singh',
}

export default async function RootLayout({ children }) {

  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  )
}
