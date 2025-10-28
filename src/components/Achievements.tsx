import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    title: "State Champion 2024",
    student: "Aarav Sharma",
    description: "Won Karnataka State Under-10 Championship",
    icon: Trophy,
  },
  {
    id: 2,
    title: "FIDE Rating 1400",
    student: "Diya Kumar",
    description: "Achieved FIDE rating at age 9",
    icon: Medal,
  },
  {
    id: 3,
    title: "District First Place",
    student: "Rohan Desai",
    description: "Hosur District Chess Tournament Winner",
    icon: Award,
  },
  {
    id: 4,
    title: "Rapid Chess Champion",
    student: "Sara Reddy",
    description: "Won Regional Rapid Chess Competition",
    icon: Trophy,
  },
  {
    id: 5,
    title: "Youngest Rated Player",
    student: "Arjun Iyer",
    description: "Youngest rated player in academy history",
    icon: Medal,
  },
  {
    id: 6,
    title: "National Qualifier",
    student: "Ananya Patel",
    description: "Qualified for National Under-12 Tournament",
    icon: Award,
  },
];

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const cards = scrollContainer.children;
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Horizontal scroll animation
    const scrollTrigger = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Card entrance animations
    gsap.from(cards, {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      stagger: 0.1,
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });

    return () => {
      scrollTrigger.scrollTrigger?.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-gradient-to-b from-background to-secondary/30">
      <div className="container px-4 h-full flex flex-col justify-center">
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Student Achievements
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Celebrating the success stories of our young champions
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-8 pb-8"
          style={{ width: 'fit-content' }}
        >
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className="flex-shrink-0 w-[400px] h-[320px] rounded-3xl p-8 bg-card/80 backdrop-blur-xl border border-border shadow-card hover:shadow-elegant transition-all duration-500 hover:scale-105 group"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--card)), hsl(var(--secondary)))',
                }}
              >
                <div className="flex flex-col h-full justify-between">
                  <div>
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>

                    <p className="text-primary font-semibold mb-4">
                      {achievement.student}
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <span>Chan Chess Club</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 text-sm text-muted-foreground opacity-50">
          <span>Scroll to explore</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
