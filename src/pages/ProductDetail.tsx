
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { getProductById, Product } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, Check, ChevronRight } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImage, setActiveImage] = useState<number>(0);
  const { toast } = useToast();

  // Fetch product data
  useEffect(() => {
    if (productId) {
      const foundProduct = getProductById(productId);
      if (foundProduct) {
        setProduct(foundProduct);
        setSelectedColor(foundProduct.colors[0]);
        setSelectedSize(null);
      }
    }
  }, [productId]);

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-2xl">Product not found</h2>
          <Button className="mt-4" asChild>
            <Link to="/products">Return to Shop</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        variant: "destructive",
        title: "Please select a size",
        description: "You need to select a size before adding to cart",
      });
      return;
    }

    // Add to cart logic would go here
    toast({
      title: "Added to Cart",
      description: `${product.name} (Size: ${selectedSize}, Qty: ${quantity}) added to your cart`,
      action: (
        <Link to="/cart" className="bg-navy text-white py-1 px-2 rounded-md text-sm hover:bg-opacity-90">
          View Cart
        </Link>
      ),
    });
  };

  const handleAddToWishlist = () => {
    toast({
      title: "Added to Wishlist",
      description: `${product.name} has been added to your wishlist`,
    });
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center">
            <li>
              <Link to="/" className="text-gray-500 hover:text-navy">Home</Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <li>
              <Link to="/products" className="text-gray-500 hover:text-navy">Products</Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <li>
              <Link to={`/products/${product.category}`} className="text-gray-500 hover:text-navy">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </Link>
            </li>
            <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
            <li className="text-gray-900 font-medium">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                    activeImage === index ? 'border-navy' : 'border-transparent'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.name} - View ${index + 1}`}
                    className="w-full h-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            {/* Title and Price */}
            <h1 className="text-3xl font-bold text-navy mb-2">{product.name}</h1>
            <div className="flex items-center mb-4">
              <div className="flex mr-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) 
                        ? "text-yellow-400" 
                        : i < product.rating 
                          ? "text-yellow-400" // For half stars (would need custom SVG)
                          : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 15.585l-5.158 2.713 0.985-5.74-4.172-4.068 5.768-0.839L10 2.5l2.577 5.151 5.768 0.839-4.172 4.068 0.985 5.74z"
                      clipRule="evenodd"
                    />
                  </svg>
                ))}
              </div>
              <span className="text-gray-500 text-sm">{product.reviewCount} reviews</span>
            </div>
            
            <div className="mb-6">
              {product.originalPrice ? (
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-brick mr-2">${product.price.toFixed(2)}</span>
                  <span className="text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                  <span className="ml-2 bg-brick text-white text-xs px-2 py-1 rounded-full">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
              )}
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color ? 'border-navy' : 'border-transparent'
                    } flex items-center justify-center`}
                    style={{ backgroundColor: color }}
                  >
                    {selectedColor === color && (
                      <svg 
                        width="16" 
                        height="16" 
                        viewBox="0 0 16 16" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M12 5L6.5 10.5L4 8" 
                          stroke={color === '#FFFFFF' || color === '#FFFF00' || color === '#00FF00' ? '#000000' : '#FFFFFF'} 
                          strokeWidth="2" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Size</h3>
                <Button 
                  variant="link" 
                  className="text-teal p-0 h-auto"
                >
                  Size Guide
                </Button>
              </div>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 rounded-md border ${
                      selectedSize === size 
                        ? 'bg-navy text-white border-navy' 
                        : 'bg-white text-navy border-gray-300 hover:border-navy'
                    }`}
                    aria-label={`Size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md hover:bg-gray-100"
                >
                  -
                </button>
                <div className="w-14 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </div>
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Button
                onClick={handleAddToCart}
                className="bg-brick hover:bg-coral transition-colors flex items-center justify-center gap-2"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5" />
                Add to Cart
              </Button>
              <Button
                onClick={handleAddToWishlist}
                variant="outline"
                className="border-gray-300 hover:border-navy hover:text-navy flex items-center justify-center gap-2"
                size="lg"
              >
                <Heart className="h-5 w-5" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-bold text-lg mb-4">Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-teal mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
