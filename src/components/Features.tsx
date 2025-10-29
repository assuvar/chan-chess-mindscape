import { useEffect, useRef } from 'react';
import { Award, Users, Target, Trophy } from 'lucide-react';
import { Card } from './ui/card';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChessCoinLayer from './ChessCoin/ChessCoinLayer';

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    icon: Award,
    title: 'International Coaches',
    description: 'Learn from FIDE rated coaches with proven track records in competitive chess.'
  },
  {
    icon: Users,
    title: 'Small Batches',
    description: 'Personalized attention with only 3-4 students per batch for optimal learning.'
  },
  {
    icon: Target,
    title: 'Strategic Thinking',
    description: 'Build confidence, discipline, and critical thinking skills that last a lifetime.'
  },
  {
    icon: Trophy,
    title: 'Proven Results',
    description: 'Track record of students excelling in tournaments and academic performance.'
  }
];

const Features = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.feature-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out'
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <ChessCoinLayer section="features" />
      <div className="container px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Why Choose Chan Chess Club?
          </h2>
          <p className="text-lg text-muted-foreground">
            World-class training designed to develop champions both on and off the board.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="feature-card group relative overflow-hidden border-2 bg-card p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative space-y-4">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
