import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import heroImage from '@/assets/hero-chess.jpg';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current || !imageRef.current) return;

    // Parallax effect on scroll
    const handleScroll = () => {
      const scrolled = window.scrollY;
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          y: scrolled * 0.5,
          duration: 0.5,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Initial animation
    gsap.from(heroRef.current.querySelectorAll('.animate-item'), {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out'
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      {/* Background Image with Parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content */}
      <div ref={heroRef} className="container relative z-10 px-4 py-32 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="animate-item">
            <span className="inline-block rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Est. 2021 • FIDE Rated Coaches
            </span>
          </div>
          
          <h1 className="animate-item text-6xl font-bold tracking-tight sm:text-7xl lg:text-8xl">
            <span className="bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Chan Chess Club
            </span>
          </h1>
          
          <p className="animate-item text-2xl font-light text-muted-foreground sm:text-3xl">
            Shaping Global Thinkers Through Chess
          </p>
          
          <p className="animate-item mx-auto max-w-2xl text-lg text-muted-foreground">
            Premier online academy dedicated to nurturing young minds through world-class chess training. 
            Expert coaches, small batches, and personalized guidance.
          </p>

          <div className="animate-item flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="group min-w-[200px] bg-primary text-lg hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              onClick={() => window.open('https://wa.me/916379597908', '_blank')}
            >
              Book a Free Trial
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="min-w-[200px] border-2 text-lg hover:bg-primary/10"
              onClick={() => document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' })}
            >
              View Programs
            </Button>
          </div>

          <div className="animate-item flex items-center justify-center gap-8 pt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Online & Offline Classes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span>Age 5+ Years</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
