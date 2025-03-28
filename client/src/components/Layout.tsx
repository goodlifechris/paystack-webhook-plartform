import { useState } from "react";
import { Link } from "wouter";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:flex md:flex-shrink-0 fixed md:static inset-0 z-20 bg-white md:z-0`}>
        <div className="flex flex-col w-64 border-r border-gray-200 bg-white">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <img src="https://website-assets.paystack.com/assets/img/logos/paystack-logo-min.png" alt="Paystack Logo" className="h-8" />
            <span className="ml-2 text-lg font-semibold">Webhook Manager</span>
          </div>
          <div className="h-0 flex-1 flex flex-col overflow-y-auto">
            {/* Navigation Links */}
            <nav className="flex-1 px-2 py-4 space-y-1">
              <Link href="/">
                <a className="flex items-center px-2 py-2 text-sm font-medium rounded-md bg-primary text-white">
                  <i className="fas fa-tachometer-alt w-6"></i>
                  <span>Dashboard</span>
                </a>
              </Link>
              <Link href="/">
                <a className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-textPrimary hover:bg-gray-100">
                  <i className="fas fa-history w-6"></i>
                  <span>Event History</span>
                </a>
              </Link>
              <Link href="/">
                <a className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-textPrimary hover:bg-gray-100">
                  <i className="fas fa-cog w-6"></i>
                  <span>Configuration</span>
                </a>
              </Link>
              <Link href="/">
                <a className="flex items-center px-2 py-2 text-sm font-medium rounded-md text-textPrimary hover:bg-gray-100">
                  <i className="fas fa-chart-line w-6"></i>
                  <span>Analytics</span>
                </a>
              </Link>
            </nav>
            
            {/* Server Status */}
            <div className="px-4 py-4 border-t border-gray-200">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="h-3 w-3 rounded-full bg-green-500 status-active"></div>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">Server Active</p>
                  <p className="text-xs text-gray-500">Webhook endpoint ready</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Close button for mobile */}
        <div className="md:hidden absolute top-4 right-4" onClick={() => setIsMobileMenuOpen(false)}>
          <i className="fas fa-times text-gray-500 text-xl p-2"></i>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
        {/* Top Navigation for mobile */}
        <div className="sticky top-0 z-10 flex-shrink-0 flex h-16 bg-white shadow md:hidden">
          <button 
            type="button" 
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <i className="fas fa-bars"></i>
          </button>
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex items-center">
              <img src="https://website-assets.paystack.com/assets/img/logos/paystack-logo-min.png" alt="Paystack Logo" className="h-6" />
              <span className="ml-2 text-base font-semibold">Webhook Manager</span>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <h1 className="text-2xl font-semibold text-gray-900">Paystack Webhook Manager</h1>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
