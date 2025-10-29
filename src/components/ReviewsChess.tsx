import { useEffect, useRef, useState } from 'react';
import { Quote, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChessboardPattern from './ChessboardPattern';
import P1 from '@/assets/P1.jpg';
import P2 from '@/assets/P2.jpg';
import P3 from '@/assets/P3.jpg';
import P4 from '@/assets/P4.jpg';
import P5 from '@/assets/P5.jpg';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    child: 'Ananya',
    parent: "Ananya’s mom",
    text:
      "My daughter’s experience with Chan Chess Club has been truly transformative. Their deep knowledge and personalized approach have sharpened her tactical skills. Under their guidance, she’s gained confidence and strategic clarity. Highly recommend Chan Chess Club to anyone seeking chess excellence.",
    image: P1,
  },
  {
    id: 2,
    child: 'Smrithi',
    parent: "Smrithi’s mom",
    text:
      "I am thrilled to share my daughter's incredible progress in chess, thanks to the exceptional coaching at ChanChessClub. Personalized attention and focus on analytical thinking boosted her confidence and elevated her to an intermediate level.",
    image: P2,
  },
  {
    id: 3,
    child: 'Stuti',
    parent: "Stuti’s mom",
    text:
      "My daughter has shown remarkable improvement in chess under the guidance of Theju Sir. Her enthusiasm for the classes is evident. Thank you for your mentorship.",
    image: P3,
  },
  {
    id: 4,
    child: 'Liam',
    parent: "Liam’s mom",
    text:
      "My 7-year-old son Liam has been learning chess with Chan Chess Club for a year and we’re so happy with his progress. Charu teaches with patience and makes each class engaging.",
    image: P4,
  },
  {
    id: 5,
    child: '',
    parent: "Parent Review",
    text:
      "The experience has been fantastic. Coaches are patient and passionate. My son has improved in focus, strategy, and confidence. Proud to be part of this chess community!",
    image: P5,
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.6,
      delay: index * 0.12,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
      }
    });
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="pt-card min-w-[92%] sm:min-w-[560px] md:min-w-[640px] lg:min-w-[720px] max-w-[900px] rounded-[20px] border border-[#eaeaea] bg-white shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-300 overflow-hidden snap-start"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch md:min-h-[420px]">
        <div className="relative h-64 md:h-auto md:min-h-[420px]">
          <img src={review.image} alt={review.child || 'Student achievement'} className="absolute inset-0 w-full h-full object-cover object-top" />
        </div>
        <div className="p-6 sm:p-8 flex flex-col justify-center gap-4">
          <div>
            <p className="text-2xl font-bold text-foreground">{review.child || 'Student'}</p>
            <p className="text-sm text-muted-foreground">{review.parent}</p>
          </div>
          <p className="text-foreground/90 text-base sm:text-lg leading-relaxed">“{review.text}”</p>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewsChess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-24 bg-white overflow-hidden">
      <ChessboardPattern opacity={0.05} />
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <svg className="absolute -top-6 left-6 w-16 h-16 opacity-10" focusable="false">
          <use href="/chess-sprite.svg#chess-pawn" />
        </svg>
        <svg className="absolute bottom-10 right-8 w-20 h-20 opacity-10" focusable="false">
          <use href="/chess-sprite.svg#chess-pawn" />
        </svg>
        <svg className="absolute top-12 right-[20%] w-14 h-14 opacity-5" focusable="false">
          <use href="/chess-sprite.svg#chess-rook" />
        </svg>
        <svg className="absolute bottom-12 left-[22%] w-16 h-16 opacity-5" focusable="false">
          <use href="/chess-sprite.svg#chess-queen" />
        </svg>
      </div>

      <div className="container max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-14" data-aos="fade-up">
          <h2 className="text-5xl font-bold mb-3 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            What Parents Say
          </h2>
          <p className="text-muted-foreground text-lg">Trusted by Parents. Loved by Students.</p>
        </div>

        <div className="mb-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="hidden md:inline">Drag or scroll</span>
          <span className="md:hidden">Swipe</span>
          <span>to see more</span>
          <ArrowRight className="h-4 w-4" />
        </div>

        <div className="flex gap-8 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2 -mx-4 px-4" style={{ scrollbarWidth: 'none' }}>
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsChess;
