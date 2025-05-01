
import React, { useState } from 'react';
import { Product, products } from '@/data/products';
import FormModal from '@/components/admin/FormModal';
import DataTable from '@/components/admin/DataTable';
import { toast } from "@/components/ui/use-toast";
import ProductForm from './ProductForm';
import { getProductColumns } from './ProductColumns';

const ProductsManager: React.FC = () => {
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

  const columns = getProductColumns();

  return (
    <>
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
        <ProductForm
          product={currentProduct || {}}
          onInputChange={handleInputChange}
          onSelectChange={handleSelectChange}
          onFeaturesChange={handleFeaturesChange}
        />
      </FormModal>
    </>
  );
};

export default ProductsManager;
