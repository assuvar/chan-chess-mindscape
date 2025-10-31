import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Programs from '@/components/Programs';
import ReviewsChess from '@/components/ReviewsChess';
import AchievementsCarousel from '@/components/AchievementsCarousel';
import BookingForm from '@/components/BookingForm';
import FAQSection from '@/components/FAQSection';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { MessageCircle } from 'lucide-react';

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
      <FAQSection />
      <Contact />
      <Footer />
      <a
        href="https://wa.me/916379597908"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed right-6 bottom-6 z-50 rounded-full bg-green-500 text-white shadow-lg hover:shadow-green-500/40 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-500/30"
        aria-label="Chat on WhatsApp"
      >
        <div className="p-4">
          <MessageCircle className="h-7 w-7" />
        </div>
      </a>
    </main>
  );
};

export default Index;
