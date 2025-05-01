
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="relative overflow-hidden rounded-lg bg-gray-100">
        {/* Product Image */}
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-72 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-teal text-white text-xs font-semibold px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-brick text-white text-xs font-semibold px-2 py-1 rounded-full">
              Sale
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="mt-3">
        <h3 className="text-lg font-medium text-navy">{product.name}</h3>
        <div className="flex items-center mt-1">
          {product.originalPrice ? (
            <>
              <span className="text-brick font-semibold">${product.price.toFixed(2)}</span>
              <span className="ml-2 text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-semibold">${product.price.toFixed(2)}</span>
          )}
        </div>
        <div className="flex items-center mt-1">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`h-4 w-4 ${
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
          <span className="ml-1 text-sm text-gray-500">({product.reviewCount})</span>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
