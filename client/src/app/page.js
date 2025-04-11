import Hero from '@/components/home/Hero';
import CategorySection from '@/components/home/CategorySection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TestimonialSection from '@/components/home/TestimonialSection';
import './css/css.Home.css';

export default function Home() {
  return (
    <>
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <TestimonialSection />
    </>
  );
}
