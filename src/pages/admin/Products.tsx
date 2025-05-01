
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import { Product, products } from '@/data/products';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from "@/components/ui/use-toast";
import { Badge } from '@/components/ui/badge';

const AdminProducts = () => {
  const [productsList, setProductsList] = useState<Product[]>(products);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddProduct = () => {
    setCurrentProduct({
      name: '',
      price: 0,
      category: 'men',
      images: [],
      colors: [],
      sizes: [],
      description: '',
      features: [],
      rating: 0,
      reviewCount: 0,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setCurrentProduct({...product});
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (product: Product) => {
    if (window.confirm(`Are you sure you want to delete ${product.name}?`)) {
      const updatedProducts = productsList.filter(p => p.id !== product.id);
      setProductsList(updatedProducts);
      toast({
        title: "Product Deleted",
        description: `${product.name} has been deleted successfully.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentProduct) {
        if (isEditing) {
          // Update existing product
          const updatedProducts = productsList.map(p => 
            p.id === currentProduct.id ? { ...currentProduct as Product } : p
          );
          setProductsList(updatedProducts);
          toast({
            title: "Product Updated",
            description: `${currentProduct.name} has been updated successfully.`,
          });
        } else {
          // Add new product
          const newProduct = {
            ...currentProduct,
            id: Date.now().toString(), // Generate a simple ID
            rating: 0,
            reviewCount: 0,
            images: ['/placeholder.svg'], // Default placeholder
          } as Product;
          
          setProductsList([...productsList, newProduct]);
          toast({
            title: "Product Added",
            description: `${newProduct.name} has been added successfully.`,
          });
        }
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      setCurrentProduct(null);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentProduct(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleSelectChange = (name: string, value: string) => {
    setCurrentProduct(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const features = e.target.value.split('\n').filter(f => f.trim() !== '');
    setCurrentProduct(prev => prev ? { ...prev, features } : null);
  };

  const columns = [
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

  return (
    <AdminLayout title="Products">
      <DataTable
        data={productsList}
        columns={columns}
        keyExtractor={(item) => item.id}
        onAdd={handleAddProduct}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
        addButtonText="Add Product"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? `Edit Product: ${currentProduct?.name}` : "Add New Product"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                name="name"
                value={currentProduct?.name || ''}
                onChange={handleInputChange}
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
                value={currentProduct?.price || 0}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Select
              value={currentProduct?.category}
              onValueChange={(value) => handleSelectChange('category', value)}
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
              value={currentProduct?.description || ''}
              onChange={handleInputChange}
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="features">Features (one per line)</Label>
            <Textarea
              id="features"
              name="features"
              value={currentProduct?.features?.join('\n') || ''}
              onChange={handleFeaturesChange}
              rows={4}
              placeholder="Enter features, one per line"
            />
          </div>
        </div>
      </FormModal>
    </AdminLayout>
  );
};

export default AdminProducts;
