
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, Users, DollarSign, TrendingUp } from 'lucide-react';

const Dashboard = () => {
  // Mock data for demonstration
  const stats = [
    { 
      title: 'Total Sales', 
      value: '$24,780', 
      change: '+12%', 
      icon: <DollarSign className="h-8 w-8 text-teal" /> 
    },
    { 
      title: 'New Customers', 
      value: '573', 
      change: '+5%', 
      icon: <Users className="h-8 w-8 text-coral" /> 
    },
    { 
      title: 'Products Sold', 
      value: '1,342', 
      change: '+18%', 
      icon: <ShoppingBag className="h-8 w-8 text-brick" /> 
    },
    { 
      title: 'Conversion Rate', 
      value: '3.8%', 
      change: '+2%', 
      icon: <TrendingUp className="h-8 w-8 text-sage" /> 
    }
  ];
  
  return (
    <AdminLayout title="Dashboard">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-sm text-green-600 mt-1">
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((order) => (
                <div
                  key={order}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div>
                    <p className="font-medium">Order #{order}2345</p>
                    <p className="text-sm text-gray-500">Customer: John Doe</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${Math.floor(Math.random() * 300) + 50}.00</p>
                    <p className="text-sm text-gray-500">3 items</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Top Products */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                'Air Max Pulse', 
                'Ultra Boost DNA', 
                'Zoom Pegasus 40', 
                'Classic Leather', 
                'Cloud Novus'
              ].map((product, idx) => (
                <div
                  key={product}
                  className="flex items-center justify-between border-b pb-4"
                >
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-200 rounded-md flex items-center justify-center mr-3">
                      {idx + 1}
                    </div>
                    <p className="font-medium">{product}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${Math.floor(Math.random() * 100) + 50}.00</p>
                    <p className="text-sm text-gray-500">{Math.floor(Math.random() * 50) + 10} sold</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
