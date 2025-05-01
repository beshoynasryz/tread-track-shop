
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Trash2, ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

// Mock cart data - in a real app this would come from context or state management
const initialCartItems = [
  {
    id: '1',
    name: 'Air Max Pulse',
    price: 149.99,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/8e40f1f5-0bea-4c94-94ff-473514e2cb6f/air-max-pulse-shoes-QShhG8.png',
    color: 'Black',
    size: 10,
    quantity: 1
  },
  {
    id: '3',
    name: 'Air Zoom Pegasus',
    price: 119.99,
    image: 'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/10fa2396-184e-479c-9d0a-11b9eac660e2/pegasus-40-road-running-shoes-JMjZ1F.png',
    color: 'Pink',
    size: 8,
    quantity: 1
  }
];

const Cart = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart"
    });
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-navy mb-8">Your Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-medium text-gray-800 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Button asChild className="bg-brick hover:bg-coral transition-colors">
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <table className="w-full">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th className="py-4 px-6 font-medium">Product</th>
                      <th className="py-4 px-6 font-medium hidden sm:table-cell">Price</th>
                      <th className="py-4 px-6 font-medium">Quantity</th>
                      <th className="py-4 px-6 font-medium hidden sm:table-cell">Total</th>
                      <th className="py-4 px-6 font-medium"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {cartItems.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover object-center mr-4 rounded"
                            />
                            <div>
                              <Link
                                to={`/product/${item.id}`}
                                className="font-medium text-navy hover:text-teal transition-colors"
                              >
                                {item.name}
                              </Link>
                              <div className="text-sm text-gray-500">
                                <span>Size: {item.size}</span> | <span>Color: {item.color}</span>
                              </div>
                              <div className="sm:hidden mt-1 font-medium">
                                ${item.price.toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 hidden sm:table-cell">
                          ${item.price.toFixed(2)}
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l hover:bg-gray-100"
                            >
                              -
                            </button>
                            <div className="w-8 h-8 flex items-center justify-center border-t border-b border-gray-300">
                              {item.quantity}
                            </div>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r hover:bg-gray-100"
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="py-4 px-6 font-medium hidden sm:table-cell">
                          ${(item.price * item.quantity).toFixed(2)}
                        </td>
                        <td className="py-4 px-6 text-right">
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-gray-500 hover:text-brick transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Continue Shopping */}
              <div className="mt-6">
                <Link
                  to="/products"
                  className="inline-flex items-center text-teal hover:text-navy transition-colors"
                >
                  <ChevronRight className="h-4 w-4 transform rotate-180 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${calculateSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Tax</span>
                    <span className="font-medium">${calculateTax().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                </div>
                
                <div className="flex justify-between py-2 text-lg font-bold">
                  <span>Total</span>
                  <span>${calculateTotal().toFixed(2)}</span>
                </div>
                
                <Button 
                  className="w-full mt-6 bg-brick hover:bg-coral transition-colors"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                {/* Payment Methods */}
                <div className="mt-6">
                  <p className="text-sm text-gray-500 mb-2 text-center">We accept:</p>
                  <div className="flex justify-center space-x-2">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/196/196578.png" 
                      alt="Visa" 
                      className="h-8" 
                    />
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/196/196561.png" 
                      alt="MasterCard" 
                      className="h-8" 
                    />
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/196/196565.png" 
                      alt="PayPal" 
                      className="h-8" 
                    />
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/196/196539.png" 
                      alt="American Express" 
                      className="h-8" 
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
