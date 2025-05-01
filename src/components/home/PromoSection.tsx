
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PromoSection = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="bg-sage rounded-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Text Content */}
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <span className="text-white text-sm font-semibold uppercase tracking-wider mb-2">Limited Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Get 25% Off On All Running Shoes
              </h2>
              <p className="text-white/90 mb-8">
                Don't miss out on our summer sale! Get premium running shoes at incredible prices for a limited time only.
              </p>
              <div>
                <Button 
                  asChild
                  size="lg"
                  className="bg-brick hover:bg-coral transition-colors"
                >
                  <Link to="/products">Shop The Sale</Link>
                </Button>
              </div>
            </div>
            
            {/* Image */}
            <div className="relative">
              <img 
                src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/cc3a56fa-3c89-420d-a84c-37f024a90555/react-infinity-3-road-running-shoes-fX3Tp1.png" 
                alt="Running shoes on sale"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute top-8 right-8 bg-white text-navy text-2xl font-bold rounded-full h-20 w-20 flex items-center justify-center transform rotate-12">
                25% OFF
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
