
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  joinDate: string;
  lastLogin: string;
}

// Mock users data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@treadtrack.com',
    role: 'admin',
    isActive: true,
    joinDate: '2023-01-15',
    lastLogin: '2023-05-20'
  },
  {
    id: '2',
    name: 'Regular User',
    email: 'user@treadtrack.com',
    role: 'user',
    isActive: true,
    joinDate: '2023-02-10',
    lastLogin: '2023-05-18'
  },
  {
    id: '3',
    name: 'John Smith',
    email: 'john@example.com',
    role: 'user',
    isActive: true,
    joinDate: '2023-03-05',
    lastLogin: '2023-05-15'
  },
  {
    id: '4',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'user',
    isActive: true,
    joinDate: '2023-03-12',
    lastLogin: '2023-05-19'
  },
  {
    id: '5',
    name: 'Michael Brown',
    email: 'michael@example.com',
    role: 'user',
    isActive: false,
    joinDate: '2023-04-03',
    lastLogin: '2023-04-25'
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleAddUser = () => {
    setCurrentUser({
      name: '',
      email: '',
      role: 'user',
      isActive: true,
      joinDate: new Date().toISOString().split('T')[0],
      lastLogin: '',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditUser = (user: User) => {
    setCurrentUser({...user});
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (user: User) => {
    // Prevent deleting the admin user
    if (user.email === 'admin@treadtrack.com') {
      toast({
        variant: "destructive",
        title: "Action Denied",
        description: "The default admin user cannot be deleted.",
      });
      return;
    }
    
    if (window.confirm(`Are you sure you want to delete user ${user.name}?`)) {
      const updatedUsers = users.filter(u => u.id !== user.id);
      setUsers(updatedUsers);
      toast({
        title: "User Deleted",
        description: `${user.name} has been deleted successfully.`,
      });
    }
  };
  
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map(user => {
      if (user.id === userId) {
        // Prevent deactivating the admin user
        if (user.email === 'admin@treadtrack.com' && user.isActive) {
          toast({
            variant: "destructive",
            title: "Action Denied",
            description: "The default admin user cannot be deactivated.",
          });
          return user;
        }
        
        const newStatus = !user.isActive;
        toast({
          title: `User ${newStatus ? 'Activated' : 'Deactivated'}`,
          description: `${user.name} has been ${newStatus ? 'activated' : 'deactivated'}.`,
        });
        return { ...user, isActive: newStatus };
      }
      return user;
    });
    
    setUsers(updatedUsers);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentUser) {
        if (isEditing) {
          // Update existing user
          const updatedUsers = users.map(u => 
            u.id === currentUser.id ? { ...currentUser as User } : u
          );
          setUsers(updatedUsers);
          toast({
            title: "User Updated",
            description: `${currentUser.name} has been updated successfully.`,
          });
        } else {
          // Add new user
          const newUser = {
            ...currentUser,
            id: Date.now().toString(), // Generate a simple ID
            joinDate: new Date().toISOString().split('T')[0],
            lastLogin: '',
          } as User;
          
          setUsers([...users, newUser]);
          toast({
            title: "User Added",
            description: `${newUser.name} has been added successfully.`,
          });
        }
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      setCurrentUser(null);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurrentUser(prev => prev ? { ...prev, [name]: value } : null);
  };
  
  const handleRoleChange = (role: 'user' | 'admin') => {
    setCurrentUser(prev => prev ? { ...prev, role } : null);
  };
  
  const handleActiveChange = (isActive: boolean) => {
    setCurrentUser(prev => prev ? { ...prev, isActive } : null);
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'email',
      header: 'Email',
    },
    {
      key: 'role',
      header: 'Role',
      render: (user: User) => (
        <Badge variant={user.role === 'admin' ? 'default' : 'outline'}>
          {user.role === 'admin' ? 'Admin' : 'User'}
        </Badge>
      )
    },
    {
      key: 'status',
      header: 'Status',
      render: (user: User) => (
        <div className="flex items-center space-x-2">
          <Switch 
            checked={user.isActive} 
            onCheckedChange={() => toggleUserStatus(user.id)}
          />
          <span className={user.isActive ? 'text-green-600' : 'text-red-600'}>
            {user.isActive ? 'Active' : 'Inactive'}
          </span>
        </div>
      )
    },
    {
      key: 'joinDate',
      header: 'Join Date',
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
    },
  ];

  return (
    <AdminLayout title="Users">
      <DataTable
        data={users}
        columns={columns}
        keyExtractor={(item) => item.id}
        onAdd={handleAddUser}
        onEdit={handleEditUser}
        onDelete={handleDeleteUser}
        addButtonText="Add User"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? `Edit User: ${currentUser?.name}` : "Add New User"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                value={currentUser?.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={currentUser?.email || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="block mb-2">Role</Label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-user"
                    name="role"
                    checked={currentUser?.role === 'user'}
                    onChange={() => handleRoleChange('user')}
                    className="mr-2"
                  />
                  <Label htmlFor="role-user">User</Label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="role-admin"
                    name="role"
                    checked={currentUser?.role === 'admin'}
                    onChange={() => handleRoleChange('admin')}
                    className="mr-2"
                  />
                  <Label htmlFor="role-admin">Admin</Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label className="block mb-2">Status</Label>
              <div className="flex items-center space-x-2">
                <Switch 
                  checked={currentUser?.isActive || false} 
                  onCheckedChange={handleActiveChange}
                  id="user-status"
                />
                <Label htmlFor="user-status">
                  {currentUser?.isActive ? 'Active' : 'Inactive'}
                </Label>
              </div>
            </div>
          </div>
          
          {isEditing && (
            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded">
              <p className="mb-1"><strong>User ID:</strong> {currentUser?.id}</p>
              <p className="mb-1"><strong>Join Date:</strong> {currentUser?.joinDate}</p>
              <p><strong>Last Login:</strong> {currentUser?.lastLogin || 'Never'}</p>
            </div>
          )}
        </div>
      </FormModal>
    </AdminLayout>
  );
};

export default AdminUsers;
