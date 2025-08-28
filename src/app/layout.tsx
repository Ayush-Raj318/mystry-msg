import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '../context/AuthProvider';
import { Toaster } from 'sonner';
import ThemeProvider from '@/components/ThemeProvider';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Mystry Message',
  description: 'Real messages from real people.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
        <ThemeProvider>
          <body className={inter.className}>
            {children}
            <Toaster />
          </body>
        </ThemeProvider>
      </AuthProvider>
    </html>
  );
}

