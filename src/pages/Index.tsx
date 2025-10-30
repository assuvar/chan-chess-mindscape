import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Programs from '@/components/Programs';
import ReviewsChess from '@/components/ReviewsChess';
import AchievementsCarousel from '@/components/AchievementsCarousel';
import BookingForm from '@/components/BookingForm';
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
    <main className="overflow-x-hidden bg-white">
      <Hero />
      <Features />
      <Programs />
      <ReviewsChess />
      <AchievementsCarousel />
      <BookingForm />
      <Contact />
      <Footer />
    </main>
  );
};

export default Index;
