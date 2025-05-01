
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface CartPreviewProps {
  onClose: () => void;
}

const CartPreview = ({ onClose }: CartPreviewProps) => {
  // This would be fetched from a cart context or state in a real app
  const cartItems: any[] = [];

  return (
    <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold text-navy">Your Cart</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-navy">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Button 
              onClick={onClose} 
              className="bg-teal hover:bg-navy transition-colors"
            >
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="max-h-60 overflow-y-auto">
              {/* Cart items would go here */}
              <p className="text-gray-500 text-center py-4">
                No items in cart yet
              </p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Subtotal:</span>
                <span className="font-bold">$0.00</span>
              </div>
              
              <div className="grid grid-cols-1 gap-2">
                <Link 
                  to="/cart" 
                  className="bg-navy text-white py-2 px-4 rounded-md text-center hover:bg-opacity-90 transition-colors"
                  onClick={onClose}
                >
                  View Cart
                </Link>
                <Link 
                  to="/checkout" 
                  className="bg-brick text-white py-2 px-4 rounded-md text-center hover:bg-coral transition-colors"
                  onClick={onClose}
                >
                  Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPreview;
