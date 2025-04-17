// import { Inter } from "next/font/google";
// import "./globals.css";
// import { AuthProvider } from "../context/AuthContext";
// import Footer from "../components/Footer"; // Corrected import path for default export

// const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "E-commerce App",
//   description: "A simple e-commerce application",
// };

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <AuthProvider>
//           <div className="flex flex-col min-h-screen">
//             <main className="flex-grow">{children}</main>
//             <Footer />
//           </div>
//         </AuthProvider>
//       </body>
//     </html>
//   );
// }