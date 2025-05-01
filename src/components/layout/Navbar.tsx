
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CartPreview from '../cart/CartPreview';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-navy text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold">
          TreadTrack
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link 
            to="/products" 
            className="hover:text-coral transition-colors"
          >
            All Shoes
          </Link>
          <Link 
            to="/products/men" 
            className="hover:text-coral transition-colors"
          >
            Men
          </Link>
          <Link 
            to="/products/women" 
            className="hover:text-coral transition-colors"
          >
            Women
          </Link>
          <Link 
            to="/products/kids" 
            className="hover:text-coral transition-colors"
          >
            Kids
          </Link>
        </nav>

        {/* Search, User and Cart */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="hover:text-coral">
            <Search className="h-5 w-5" />
          </Button>
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:text-coral relative">
                  <User className="h-5 w-5" />
                  {isAdmin && (
                    <span className="absolute -top-1 -right-1 bg-teal text-white text-xs rounded-full h-3 w-3"></span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-4 py-3 border-b">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                {isAdmin && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/admin')}>
                      Admin Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem onClick={() => navigate('/profile')}>
                  My Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/orders')}>
                  Order History
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              className="hover:text-coral"
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
          )}
          
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon" 
              className="hover:text-coral"
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-brick text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                0
              </span>
            </Button>
            {isCartOpen && <CartPreview onClose={() => setIsCartOpen(false)} />}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-navy border-t border-gray-700 py-4">
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <Link 
              to="/products" 
              className="hover:text-coral transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              All Shoes
            </Link>
            <Link 
              to="/products/men" 
              className="hover:text-coral transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Men
            </Link>
            <Link 
              to="/products/women" 
              className="hover:text-coral transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Women
            </Link>
            <Link 
              to="/products/kids" 
              className="hover:text-coral transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Kids
            </Link>
            
            {user ? (
              <>
                <div className="pt-2 border-t border-gray-700">
                  <p className="text-sm">{user.name}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="hover:text-coral transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <Button 
                  variant="ghost" 
                  className="justify-start hover:text-coral p-0 h-auto font-normal"
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </>
            ) : (
              <Link
                to="/login"
                className="hover:text-coral transition-colors border-t border-gray-700 pt-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Login / Register
              </Link>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-700">
              <Button variant="ghost" size="icon" className="hover:text-coral">
                <Search className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="hover:text-coral relative"
                onClick={() => {
                  setIsCartOpen(!isCartOpen);
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-brick text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  0
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
