
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import DataTable from '@/components/admin/DataTable';
import FormModal from '@/components/admin/FormModal';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

// Initial testimonials data
const initialTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    role: 'Marathon Runner',
    content: "These running shoes completely transformed my training routine. The comfort and support they provide is unmatched. I've shaved minutes off my best time!",
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    name: 'Sarah Williams',
    role: 'Fitness Instructor',
    content: "As someone who's on their feet all day, finding comfortable shoes is essential. These are hands down the best athletic shoes I've ever owned.",
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    name: 'Michael Chen',
    role: 'Casual Wearer',
    content: "Not only are these shoes incredibly comfortable for daily wear, but they also look amazing. I get compliments everywhere I go. Definitely worth every penny!",
    avatar: 'https://randomuser.me/api/portraits/men/62.jpg'
  }
];

const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState<Partial<Testimonial> | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const handleAddTestimonial = () => {
    setCurrentTestimonial({
      name: '',
      role: '',
      content: '',
      avatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    });
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditTestimonial = (testimonial: Testimonial) => {
    setCurrentTestimonial({...testimonial});
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteTestimonial = (testimonial: Testimonial) => {
    if (window.confirm(`Are you sure you want to delete testimonial from ${testimonial.name}?`)) {
      const updatedTestimonials = testimonials.filter(t => t.id !== testimonial.id);
      setTestimonials(updatedTestimonials);
      toast({
        title: "Testimonial Deleted",
        description: `Testimonial from ${testimonial.name} has been deleted successfully.`,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      if (currentTestimonial) {
        if (isEditing) {
          // Update existing testimonial
          const updatedTestimonials = testimonials.map(t => 
            t.id === currentTestimonial.id ? { ...currentTestimonial as Testimonial } : t
          );
          setTestimonials(updatedTestimonials);
          toast({
            title: "Testimonial Updated",
            description: `Testimonial from ${currentTestimonial.name} has been updated successfully.`,
          });
        } else {
          // Add new testimonial
          const newTestimonial = {
            ...currentTestimonial,
            id: Date.now().toString(), // Generate a simple ID
          } as Testimonial;
          
          setTestimonials([...testimonials, newTestimonial]);
          toast({
            title: "Testimonial Added",
            description: `Testimonial from ${newTestimonial.name} has been added successfully.`,
          });
        }
      }
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      setCurrentTestimonial(null);
    }, 600);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCurrentTestimonial(prev => prev ? { ...prev, [name]: value } : null);
  };

  const columns = [
    {
      key: 'avatar',
      header: 'Avatar',
      render: (testimonial: Testimonial) => (
        <Avatar>
          <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
          <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )
    },
    {
      key: 'name',
      header: 'Name',
    },
    {
      key: 'role',
      header: 'Role',
    },
    {
      key: 'content',
      header: 'Testimonial',
      render: (testimonial: Testimonial) => (
        <div className="max-w-sm truncate">{testimonial.content}</div>
      )
    },
  ];

  return (
    <AdminLayout title="Testimonials">
      <DataTable
        data={testimonials}
        columns={columns}
        keyExtractor={(item) => item.id}
        onAdd={handleAddTestimonial}
        onEdit={handleEditTestimonial}
        onDelete={handleDeleteTestimonial}
        addButtonText="Add Testimonial"
      />

      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={isEditing ? `Edit Testimonial: ${currentTestimonial?.name}` : "Add New Testimonial"}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={currentTestimonial?.name || ''}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                name="role"
                value={currentTestimonial?.role || ''}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="avatar">Avatar URL</Label>
            <Input
              id="avatar"
              name="avatar"
              value={currentTestimonial?.avatar || ''}
              onChange={handleInputChange}
              required
            />
            {currentTestimonial?.avatar && (
              <div className="mt-2 flex items-center">
                <Avatar className="mr-2">
                  <AvatarImage src={currentTestimonial.avatar} alt="Avatar preview" />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                <span className="text-xs text-gray-500">Avatar preview</span>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="content">Testimonial Content</Label>
            <Textarea
              id="content"
              name="content"
              value={currentTestimonial?.content || ''}
              onChange={handleInputChange}
              rows={4}
              required
            />
          </div>
        </div>
      </FormModal>
    </AdminLayout>
  );
};

export default AdminTestimonials;
