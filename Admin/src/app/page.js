import Link from 'next/link';
import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css'; // this is the default style file

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-slate-800 dark:text-white mb-8">
        Admin Dashboard
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards */}
        <Link href="/inventory" 
          className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">Inventory</h2>
          <p className="text-slate-600 dark:text-slate-300">Manage your product inventory</p>
        </Link>

        <Link href="/products" 
          className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">Products</h2>
          <p className="text-slate-600 dark:text-slate-300">View and manage products</p>
        </Link>

        <Link href="/users" 
          className="p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all">
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white mb-2">Users</h2>
          <p className="text-slate-600 dark:text-slate-300">Manage user accounts</p>
        </Link>
      </div>
    </div>
  );
}
