
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Users, 
  Settings, 
  BarChart,
  LogOut,
  ChevronRight,
  MessageSquare,
  PackageOpen,
  Tags
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // If not admin, redirect to home
  React.useEffect(() => {
    if (!isAdmin) {
      navigate('/');
    }
  }, [isAdmin, navigate]);
  
  if (!isAdmin) {
    return null; // Don't render anything if not admin (will redirect)
  }
  
  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/admin' },
    { name: 'Products', icon: <ShoppingBag className="h-5 w-5" />, path: '/admin/products' },
    { name: 'Categories', icon: <Tags className="h-5 w-5" />, path: '/admin/categories' },
    { name: 'Testimonials', icon: <MessageSquare className="h-5 w-5" />, path: '/admin/testimonials' },
    { name: 'Orders', icon: <PackageOpen className="h-5 w-5" />, path: '/admin/orders' },
    { name: 'Customers', icon: <Users className="h-5 w-5" />, path: '/admin/users' },
    { name: 'Analytics', icon: <BarChart className="h-5 w-5" />, path: '/admin/analytics' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/admin/settings' },
  ];
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-navy text-white">
        {/* Logo */}
        <div className="p-6">
          <h2 className="text-2xl font-bold">TreadTrack</h2>
          <p className="text-sm text-gray-400">Admin Panel</p>
        </div>
        
        {/* Nav Links */}
        <nav className="mt-6">
          {navItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={`w-full justify-start p-4 text-left text-white hover:bg-navy/90 ${
                location.pathname === item.path ? 'bg-teal/10 border-l-4 border-teal' : ''
              }`}
              onClick={() => navigate(item.path)}
            >
              <span className="flex items-center">
                {item.icon}
                <span className="ml-4">{item.name}</span>
              </span>
              {location.pathname === item.path && (
                <ChevronRight className="ml-auto h-5 w-5" />
              )}
            </Button>
          ))}
          
          <Button
            variant="ghost"
            className="w-full justify-start p-4 text-left text-white hover:bg-navy/90 mt-auto"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-4">Logout</span>
          </Button>
        </nav>
      </div>
      
      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="py-6 px-8">
            <h1 className="text-2xl font-semibold text-navy">{title}</h1>
          </div>
        </header>
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
