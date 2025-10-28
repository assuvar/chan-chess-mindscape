import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Medal, Award } from 'lucide-react';
import ChessboardPattern from './ChessboardPattern';
import FloatingChessPieces from './FloatingChessPieces';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    title: "State Level Silver",
    student: "Aditya",
    description: "Karnataka State Under-10 Championship",
    image: "https://source.unsplash.com/random/600x400/?chess,trophy,1",
    icon: Trophy,
  },
  {
    id: 2,
    title: "District U-10 Champion",
    student: "Aarav",
    description: "Hosur District Chess Tournament Winner",
    image: "https://source.unsplash.com/random/600x400/?chess,tournament,2",
    icon: Medal,
  },
  {
    id: 3,
    title: "FIDE Rating 1400",
    student: "Diya Kumar",
    description: "Achieved FIDE rating at age 9",
    image: "https://source.unsplash.com/random/600x400/?chess,competition,3",
    icon: Award,
  },
  {
    id: 4,
    title: "Rapid Chess Champion",
    student: "Sara",
    description: "Regional Rapid Chess Competition Winner",
    image: "https://source.unsplash.com/random/600x400/?chess,winner,4",
    icon: Trophy,
  },
  {
    id: 5,
    title: "National Qualifier",
    student: "Rohan",
    description: "Qualified for National U-12 Tournament",
    image: "https://source.unsplash.com/random/600x400/?chess,medal,5",
    icon: Medal,
  },
  {
    id: 6,
    title: "Youngest Rated Player",
    student: "Arjun",
    description: "Academy's youngest rated player at age 6",
    image: "https://source.unsplash.com/random/600x400/?chess,award,6",
    icon: Award,
  },
  {
    id: 7,
    title: "City Champion 2024",
    student: "Priya",
    description: "Bangalore City Chess Championship",
    image: "https://source.unsplash.com/random/600x400/?chess,trophy,7",
    icon: Trophy,
  },
  {
    id: 8,
    title: "Online Tournament Winner",
    student: "Kabir",
    description: "International Online Blitz Tournament",
    image: "https://source.unsplash.com/random/600x400/?chess,competition,8",
    icon: Medal,
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
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-gradient-to-b from-card to-background">
      {/* Dark Chessboard Background */}
      <ChessboardPattern variant="dark" opacity={0.15} />
      
      {/* Floating Chess Pieces */}
      <FloatingChessPieces />

      <div className="container px-4 h-full flex flex-col justify-center relative z-10">
        <div className="mb-12" data-aos="fade-up">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Student Achievements
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl">
            Celebrating the success stories of our young champions
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-10 pb-12"
          style={{ width: 'fit-content' }}
        >
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            return (
              <div
                key={achievement.id}
                className="flex-shrink-0 w-[450px] h-[520px] rounded-3xl overflow-hidden bg-card/90 backdrop-blur-xl border border-border/50 shadow-elegant hover:shadow-2xl transition-all duration-500 hover:scale-105 group"
              >
                {/* Achievement Image */}
                <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20">
                  <img 
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                </div>

                {/* Achievement Details */}
                <div className="p-8 flex flex-col justify-between h-[240px]">
                  <div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                      {achievement.title}
                    </h3>

                    <p className="text-primary font-bold text-lg mb-4">
                      {achievement.student}
                    </p>

                    <p className="text-muted-foreground leading-relaxed">
                      {achievement.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground pt-4 border-t border-border/50">
                    <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                    <span className="font-medium">Chan Chess Club</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Scroll Hint */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 text-sm text-muted-foreground/70 animate-pulse">
          <span className="font-medium">Scroll to explore achievements</span>
          <svg className="w-5 h-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
