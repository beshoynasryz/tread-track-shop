
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

interface Order {
  id: string;
  customer: {
    name: string;
    email: string;
  };
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  shippingAddress: string;
  paymentMethod: string;
}

// Mock orders data
const mockOrders: Order[] = [
  {
    id: 'ORD-2023-001',
    customer: {
      name: 'John Smith',
      email: 'john@example.com'
    },
    date: '2023-05-15',
    items: [
      { id: '1', productId: '1', name: 'Air Max Pulse', price: 149.99, quantity: 1 },
      { id: '2', productId: '3', name: 'Air Zoom Pegasus', price: 119.99, quantity: 1 }
    ],
    total: 269.98,
    status: 'delivered',
    shippingAddress: '123 Main St, New York, NY 10001',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-2023-002',
    customer: {
      name: 'Sarah Johnson',
      email: 'sarah@example.com'
    },
    date: '2023-05-16',
    items: [
      { id: '3', productId: '2', name: 'React Infinity Run', price: 129.99, quantity: 1 }
    ],
    total: 129.99,
    status: 'shipped',
    shippingAddress: '456 Park Ave, Boston, MA 02108',
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-2023-003',
    customer: {
      name: 'Michael Brown',
      email: 'michael@example.com'
    },
    date: '2023-05-17',
    items: [
      { id: '4', productId: '5', name: 'Force 1 LE', price: 79.99, quantity: 2 }
    ],
    total: 159.98,
    status: 'processing',
    shippingAddress: '789 Oak St, Chicago, IL 60007',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-2023-004',
    customer: {
      name: 'Emily Wilson',
      email: 'emily@example.com'
    },
    date: '2023-05-18',
    items: [
      { id: '5', productId: '4', name: 'ZoomX Vaporfly', price: 249.99, quantity: 1 },
      { id: '6', productId: '6', name: 'Dunk Low', price: 89.99, quantity: 1 }
    ],
    total: 339.98,
    status: 'pending',
    shippingAddress: '567 Pine St, San Francisco, CA 94102',
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-2023-005',
    customer: {
      name: 'David Lee',
      email: 'david@example.com'
    },
    date: '2023-05-19',
    items: [
      { id: '7', productId: '3', name: 'Air Zoom Pegasus', price: 119.99, quantity: 3 }
    ],
    total: 359.97,
    status: 'cancelled',
    shippingAddress: '890 Maple St, Seattle, WA 98101',
    paymentMethod: 'PayPal'
  }
];

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  
  const getStatusBadge = (status: OrderStatus) => {
    const statusConfig = {
      pending: { className: "bg-yellow-100 text-yellow-800", label: "Pending" },
      processing: { className: "bg-blue-100 text-blue-800", label: "Processing" },
      shipped: { className: "bg-purple-100 text-purple-800", label: "Shipped" },
      delivered: { className: "bg-green-100 text-green-800", label: "Delivered" },
      cancelled: { className: "bg-red-100 text-red-800", label: "Cancelled" }
    };
    
    const config = statusConfig[status];
    return (
      <Badge variant="outline" className={config.className}>
        {config.label}
      </Badge>
    );
  };
  
  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: newStatus };
      }
      return order;
    });
    
    setOrders(updatedOrders);
    
    toast({
      title: "Order Status Updated",
      description: `Order ${orderId} status changed to ${newStatus}.`,
    });
  };
  
  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  };
  
  const columns = [
    {
      key: 'id',
      header: 'Order ID',
    },
    {
      key: 'customer',
      header: 'Customer',
      render: (order: Order) => (
        <div>
          <div>{order.customer.name}</div>
          <div className="text-xs text-gray-500">{order.customer.email}</div>
        </div>
      )
    },
    {
      key: 'date',
      header: 'Order Date',
    },
    {
      key: 'total',
      header: 'Total',
      render: (order: Order) => `$${order.total.toFixed(2)}`
    },
    {
      key: 'status',
      header: 'Status',
      render: (order: Order) => (
        <Select
          defaultValue={order.status}
          onValueChange={(value) => handleStatusChange(order.id, value as OrderStatus)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pending">{getStatusBadge('pending')}</SelectItem>
            <SelectItem value="processing">{getStatusBadge('processing')}</SelectItem>
            <SelectItem value="shipped">{getStatusBadge('shipped')}</SelectItem>
            <SelectItem value="delivered">{getStatusBadge('delivered')}</SelectItem>
            <SelectItem value="cancelled">{getStatusBadge('cancelled')}</SelectItem>
          </SelectContent>
        </Select>
      )
    },
    {
      key: 'actions',
      header: 'Details',
      render: (order: Order) => (
        <button 
          onClick={() => viewOrderDetails(order)}
          className="text-sm text-teal hover:underline"
        >
          View Details
        </button>
      )
    }
  ];
  
  return (
    <AdminLayout title="Orders">
      <DataTable
        data={orders}
        columns={columns}
        keyExtractor={(item) => item.id}
      />
      
      {/* Order Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Order Details: {selectedOrder?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Customer</h4>
                  <p>{selectedOrder.customer.name}</p>
                  <p className="text-sm">{selectedOrder.customer.email}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Order Date</h4>
                  <p>{selectedOrder.date}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Status</h4>
                  <p>{getStatusBadge(selectedOrder.status)}</p>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-1">Payment Method</h4>
                  <p>{selectedOrder.paymentMethod}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-1">Shipping Address</h4>
                <p>{selectedOrder.shippingAddress}</p>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Order Items</h4>
                <div className="border rounded-md">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {selectedOrder.items.map(item => (
                        <tr key={item.id}>
                          <td className="px-4 py-3">{item.name}</td>
                          <td className="px-4 py-3">{item.quantity}</td>
                          <td className="px-4 py-3">${item.price.toFixed(2)}</td>
                          <td className="px-4 py-3">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-gray-50">
                      <tr>
                        <td colSpan={3} className="px-4 py-3 text-right font-medium">Order Total:</td>
                        <td className="px-4 py-3 font-bold">${selectedOrder.total.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminOrders;
