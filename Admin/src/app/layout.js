import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebare";
import { Footer } from "./components/Footer";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Modern admin dashboard built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={geist.className}>
      <body className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex flex-col flex-1">
            <Header />
            <main className="flex-1 p-6">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}