import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'LABESNI - Your Style, Your Way',
  description: 'Discover the latest fashion trends at LABESNI - your ultimate clothing destination.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow bg-white">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
