
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount: number;
}

// Initial categories data
const initialCategories: Category[] = [
  { id: '1', name: 'Men', slug: 'men', productCount: 12 },
  { id: '2', name: 'Women', slug: 'women', productCount: 8 },
  { id: '3', name: 'Kids', slug: 'kids', productCount: 5 },
  { id: '4', name: 'Running', slug: 'running', productCount: 7 },
  { id: '5', name: 'Casual', slug: 'casual', productCount: 9 },
];

const AdminCategories = () => {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Partial<Category> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddCategory = () => {
    setCurrentCategory({
      name: '',
      slug: '',
      productCount: 0,
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: Category) => {
    setCurrentCategory({...category});
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (category: Category) => {
    if (window.confirm(`Are you sure you want to delete ${category.name}?`)) {
      const updatedCategories = categories.filter(c => c.id !== category.id);
      setCategories(updatedCategories);
      toast({
        title: "Category Deleted",
        description: `${category.name} has been deleted successfully.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentCategory) {
        if (isEditing) {
          // Update existing category
          const updatedCategories = categories.map(c => 
            c.id === currentCategory.id ? { ...currentCategory as Category } : c
          );
          setCategories(updatedCategories);
          toast({
            title: "Category Updated",
            description: `${currentCategory.name} has been updated successfully.`,
          });
        } else {
          // Add new category
          const newCategory = {
            ...currentCategory,
            id: Date.now().toString(), // Generate a simple ID
            productCount: 0,
          } as Category;
          
          setCategories([...categories, newCategory]);
          toast({
            title: "Category Added",
            description: `${newCategory.name} has been added successfully.`,
          });
        }
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      setCurrentCategory(null);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Auto-generate slug from name if slug field is empty or we're editing the name
    if (name === 'name' && (!currentCategory?.slug || currentCategory.slug === '')) {
      setCurrentCategory(prev => 
        prev ? { 
          ...prev, 
          [name]: value,
          slug: value.toLowerCase().replace(/\s+/g, '-')
        } : null
      );
    } else {
      setCurrentCategory(prev => prev ? { ...prev, [name]: value } : null);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'slug',
      header: 'Slug',
    },
    {
      key: 'productCount',
      header: 'Products',
      render: (category: Category) => (
        <Badge variant="secondary">
          {category.productCount}
        </Badge>
      )
    },
  ];

  return (
    <AdminLayout title="Categories">
      <DataTable
        data={categories}
        columns={columns}
        keyExtractor={(item) => item.id}
        onAdd={handleAddCategory}
        onEdit={handleEditCategory}
        onDelete={handleDeleteCategory}
        addButtonText="Add Category"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? `Edit Category: ${currentCategory?.name}` : "Add New Category"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Category Name</Label>
            <Input
              id="name"
              name="name"
              value={currentCategory?.name || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <Label htmlFor="slug">Slug (URL-friendly name)</Label>
            <Input
              id="slug"
              name="slug"
              value={currentCategory?.slug || ''}
              onChange={handleInputChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              This will be used in the URL: /products/{currentCategory?.slug || 'example-slug'}
            </p>
          </div>
        </div>
      </FormModal>
    </AdminLayout>
  );
};

export default AdminCategories;
