
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductsManager from '@/components/admin/products/ProductsManager';

const AdminProducts = () => {
  return (
    <AdminLayout title="Products">
      <ProductsManager />
    </AdminLayout>
  );
};

export default AdminProducts;
