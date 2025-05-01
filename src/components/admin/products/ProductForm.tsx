
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Product } from '@/data/products';

interface ProductFormProps {
  product: Partial<Product>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onSelectChange: (name: string, value: string) => void;
  onFeaturesChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  product, 
  onInputChange, 
  onSelectChange, 
  onFeaturesChange 
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Product Name</Label>
          <Input
            id="name"
            name="name"
            value={product?.name || ''}
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            value={product?.price || 0}
            onChange={onInputChange}
            required
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select
          value={product?.category}
          onValueChange={(value) => onSelectChange('category', value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="men">Men</SelectItem>
            <SelectItem value="women">Women</SelectItem>
            <SelectItem value="kids">Kids</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={product?.description || ''}
          onChange={onInputChange}
          rows={3}
        />
      </div>

      <div>
        <Label htmlFor="features">Features (one per line)</Label>
        <Textarea
          id="features"
          name="features"
          value={product?.features?.join('\n') || ''}
          onChange={onFeaturesChange}
          rows={4}
          placeholder="Enter features, one per line"
        />
      </div>
    </div>
  );
};

export default ProductForm;
