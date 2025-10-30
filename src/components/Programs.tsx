import { useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const programs = [
  {
    level: 'Beginner',
    description: 'Perfect for young minds starting their chess journey',
    features: [
      'Basic rules and piece movements',
      'Opening principles',
      'Simple tactics and strategies',
      'Fun learning approach'
    ],
    highlight: false
  },
  {
    level: 'Intermediate',
    description: 'For players ready to enhance their competitive edge',
    features: [
      'Advanced tactics and combinations',
      'Middle game strategies',
      'Endgame techniques',
      'Tournament preparation'
    ],
    highlight: true
  },
  {
    level: 'Advanced',
    description: 'Elite training for aspiring champions',
    features: [
      'Opening repertoire development',
      'Deep positional understanding',
      'Master-level analysis',
      'Competitive tournament training'
    ],
    highlight: false
  }
];

const Programs = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const cards = sectionRef.current.querySelectorAll('.program-card');
    
    gsap.from(cards, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
      scale: 0.9,
      duration: 0.8,
      stagger: 0.2,
      ease: 'back.out(1.2)'
    });
  }, []);

  return (
    <section id="programs" ref={sectionRef} className="py-24 bg-white relative overflow-hidden opacity-100">
      <div className="container px-4 relative z-10">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Our Programs
          </h2>
          <p className="text-lg text-foreground">
            Structured curriculum designed for every skill level
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {programs.map((program, index) => (
            <Card 
              key={index}
              className={`program-card relative overflow-hidden border-2 p-8 transition-all duration-300 hover:-translate-y-2 text-foreground opacity-100 ${
                program.highlight 
                  ? 'border-primary bg-primary/5 shadow-xl shadow-primary/20' 
                  : 'bg-card hover:shadow-xl'
              }`}
            >
              {program.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    Popular
                  </span>
                </div>
              )}
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2">{program.level}</h3>
                  <p className="text-foreground">{program.description}</p>
                </div>

                <ul className="space-y-3">
                  {program.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    program.highlight 
                      ? 'bg-primary hover:shadow-lg hover:shadow-primary/50' 
                      : ''
                  }`}
                  variant={program.highlight ? 'default' : 'outline'}
                  onClick={() => {
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Enroll Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Batch Info */}
        <div className="mt-16 mx-auto max-w-4xl">
          <Card className="border-2 bg-secondary/50 p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-xl font-semibold mb-3">Batch Size</h3>
                <p className="text-foreground">
                  Small groups of 3-4 students ensure personalized attention and rapid progress.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3">Age Group</h3>
                <p className="text-foreground">
                  Open to all ages 5+ years. Never too early or too late to start your chess journey!
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Programs;
