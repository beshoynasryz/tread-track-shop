
import React from 'react';
import { Product } from '@/data/products';
import { Badge } from '@/components/ui/badge';

export const getProductColumns = () => {
  return [
    {
      key: 'id',
      header: 'ID',
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'price',
      header: 'Price',
      render: (product: Product) => `$${product.price.toFixed(2)}`
    },
    {
      key: 'category',
      header: 'Category',
      render: (product: Product) => (
        <Badge variant="outline" className="capitalize">
          {product.category}
        </Badge>
      )
    },
    {
      key: 'rating',
      header: 'Rating',
      render: (product: Product) => `${product.rating} (${product.reviewCount} reviews)`
    },
  ];
};

export default getProductColumns;
