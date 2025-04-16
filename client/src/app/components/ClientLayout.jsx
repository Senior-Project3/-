'use client';

import { AuthProvider } from '../Contexts/AuthContext';
import Navbar from './Navbar';

export default function ClientLayout({ children }) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
} 