import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Naghma | Luxury WhatsApp Sales Assistant',
  description: 'Premium Moroccan perfume sales assistant for WhatsApp commerce.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
