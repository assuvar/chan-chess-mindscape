import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy } from 'lucide-react';
import ChessboardPattern from './ChessboardPattern';

gsap.registerPlugin(ScrollTrigger);

const achievements = [
  {
    id: 1,
    student: "Aarav",
    title: "District U10 Champion",
    image: "https://source.unsplash.com/random/600x400/?chess,tournament,1",
  },
  {
    id: 2,
    student: "Meera",
    title: "State Silver Medalist",
    image: "https://source.unsplash.com/random/600x400/?chess,player,2",
  },
  {
    id: 3,
    student: "Dev",
    title: "Rapid Chess U12 Winner",
    image: "https://source.unsplash.com/random/600x400/?chess,winner,3",
  },
  {
    id: 4,
    student: "Rohan",
    title: "Inter-school Finalist",
    image: "https://source.unsplash.com/random/600x400/?chess,competition,4",
  },
  {
    id: 5,
    student: "Isha",
    title: "U8 Gold Medal",
    image: "https://source.unsplash.com/random/600x400/?chess,trophy,5",
  },
  {
    id: 6,
    student: "Akash",
    title: "National Qualifier",
    image: "https://source.unsplash.com/random/600x400/?chess,match,6",
  },
  {
    id: 7,
    student: "Nikhil",
    title: "Blitz Tournament Winner",
    image: "https://source.unsplash.com/random/600x400/?chess,champion,7",
  },
];

const AchievementsScroll = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !scrollRef.current) return;

    const scrollContainer = scrollRef.current;
    const scrollWidth = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    // Horizontal scroll animation
    const scrollTrigger = gsap.to(scrollContainer, {
      x: -scrollWidth,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: () => `+=${scrollWidth * 1.5}`,
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      }
    });

    // Card entrance animations
    const cards = scrollContainer.querySelectorAll('.achievement-card');
    gsap.from(cards, {
      opacity: 0,
      scale: 0.85,
      y: 40,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
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
    <section ref={sectionRef} className="h-screen relative overflow-hidden bg-white">
      {/* Subtle Chessboard Pattern */}
      <ChessboardPattern opacity={0.06} />

      {/* Purple Gradient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-radial from-primary/10 via-purple-500/5 to-transparent blur-3xl pointer-events-none" />

      <div className="container px-4 h-full flex flex-col justify-center relative z-10">
        {/* Header */}
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            Student Achievements
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl font-light">
            Celebrating victories and milestones of our young champions
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-10 pb-16"
          style={{ width: 'fit-content' }}
        >
          {achievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className="achievement-card flex-shrink-0 w-[420px] rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl border-2 border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_80px_rgba(139,92,246,0.2)] transition-all duration-500 hover:scale-105 hover:-translate-y-2 group"
            >
              {/* Image Container */}
              <div className="relative h-[280px] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-50">
                <img 
                  src={achievement.image}
                  alt={achievement.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                
                {/* Trophy Icon */}
                <div className="absolute top-4 right-4 w-14 h-14 rounded-2xl bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <Trophy className="w-7 h-7" />
                </div>

                {/* Gradient Overlay */}
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
              </div>

              {/* Content */}
              <div className="p-8">
                <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent group-hover:from-primary group-hover:to-purple-600 transition-all duration-300">
                  {achievement.student}
                </h3>
                
                <p className="text-lg text-muted-foreground font-medium mb-6">
                  {achievement.title}
                </p>

                {/* Stats/Badge */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="flex-1">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20 text-sm font-medium text-primary">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      2024 Winner
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-pulse opacity-60">
          <p className="text-sm font-medium text-muted-foreground">Scroll to explore</p>
          <div className="flex gap-1">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <div className="w-2 h-2 rounded-full bg-primary/50" />
            <div className="w-2 h-2 rounded-full bg-primary/30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AchievementsScroll;
