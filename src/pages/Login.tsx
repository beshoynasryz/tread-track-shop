
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import LoginForm from '@/components/auth/LoginForm';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Login = () => {
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
            <h1 className="text-3xl font-bold text-navy mb-2">Welcome back</h1>
            <p className="text-gray-600">Log in to your TreadTrack account</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <LoginForm />
          </div>
          
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>
              Demo credentials:
            </p>
            <p className="mt-1">
              Admin: admin@treadtrack.com / admin123
            </p>
            <p className="mt-1">
              User: user@treadtrack.com / user123
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
