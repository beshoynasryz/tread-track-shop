
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative bg-navy text-white">
      <div className="container mx-auto px-4 py-20 md:py-32 flex flex-col md:flex-row items-center">
        {/* Hero Text */}
        <div className="md:w-1/2 z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Step Into <span className="text-coral">Comfort</span> & <span className="text-teal">Style</span>
          </h1>
          <p className="text-lg mb-8 max-w-md">
            Discover the perfect blend of innovation, comfort, and design with our latest collection of premium footwear.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              asChild
              size="lg"
              className="bg-brick hover:bg-coral transition-colors"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button 
              asChild 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-navy transition-colors"
            >
              <Link to="/products/new">New Arrivals</Link>
            </Button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="md:w-1/2 mt-10 md:mt-0 relative">
          <img 
            src="https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/10fa2396-184e-479c-9d0a-11b9eac660e2/pegasus-40-road-running-shoes-JMjZ1F.png" 
            alt="Featured shoe"
            className="w-full h-auto object-contain z-10 relative"
            style={{ transform: "rotate(-15deg)" }}
          />
          {/* Decorative circles */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-teal rounded-full opacity-20"></div>
          <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-coral rounded-full opacity-20"></div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-white" style={{ clipPath: "polygon(0 100%, 100% 0, 100% 100%, 0% 100%)" }}></div>
    </div>
  );
};

export default HeroSection;
