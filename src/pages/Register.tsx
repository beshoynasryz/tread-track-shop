
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import RegisterForm from '@/components/auth/RegisterForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Register = () => {
  const navigate = useNavigate();
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Button
          variant="ghost"
          className="mb-6 flex items-center text-navy"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to home
        </Button>
        
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-navy mb-2">Create an account</h1>
            <p className="text-gray-600">Join TreadTrack for the best shoe shopping experience</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <RegisterForm />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
