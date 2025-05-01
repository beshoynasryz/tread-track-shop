
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import Categories from '@/components/home/Categories';
import PromoSection from '@/components/home/PromoSection';
import Testimonials from '@/components/home/Testimonials';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <Categories />
      <PromoSection />
      <Testimonials />
    </Layout>
  );
};

export default Index;
