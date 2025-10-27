import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Programs from '@/components/Programs';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: 'ease-out',
    });
  }, []);

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Features />
      <Programs />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
