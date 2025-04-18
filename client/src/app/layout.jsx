import { Inter } from 'next/font/google';
import './globals.css';
import ClientLayout from './components/ClientLayout';
import Footer from './components/Footer'; // Import Footer from components directory

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'My Website',
  description: 'A modern web application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <ClientLayout>
            <main className="flex-grow">{children}</main>
          </ClientLayout>
          <Footer />
        </div>
      </body>
    </html>
  );
}