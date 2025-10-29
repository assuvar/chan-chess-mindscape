import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import ChessboardPattern from './ChessboardPattern';
import ChessCoinLayer from './ChessCoin/ChessCoinLayer';

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    id: 1,
    parent: "Priya S.",
    review: "My son became more focused within 2 months!",
    fullReview: "My son became more focused within just 2 months! The coaching methodology is excellent and the small batch size ensures personal attention. Highly recommend Chan Chess Club!",
    image: "https://source.unsplash.com/random/400x400/?family,child,1",
  },
  {
    id: 2,
    parent: "Arjun P.",
    review: "Excellent coaching and discipline.",
    fullReview: "Excellent coaching and discipline. The FIDE-rated coaches bring world-class standards to every session. My daughter has shown remarkable improvement in strategic thinking.",
    image: "https://source.unsplash.com/random/400x400/?parent,kid,2",
  },
  {
    id: 3,
    parent: "Deepa K.",
    review: "Great personal attention by the trainers!",
    fullReview: "Great personal attention by the trainers! They understand each child's unique learning style and adapt their teaching accordingly. Truly professional academy.",
    image: "https://source.unsplash.com/random/400x400/?family,happy,3",
  },
  {
    id: 4,
    parent: "Ravi M.",
    review: "Classes improved my daughter's confidence.",
    fullReview: "Classes improved my daughter's confidence tremendously. She's now participating in tournaments and winning! The flexible online and offline options are perfect for busy parents.",
    image: "https://source.unsplash.com/random/400x400/?child,portrait,4",
  },
  {
    id: 5,
    parent: "Sneha Rao",
    review: "World-class structured coaching!",
    fullReview: "World-class structured coaching! The curriculum is well-designed and progressive. My son looks forward to every class and his rating has improved significantly.",
    image: "https://source.unsplash.com/random/400x400/?kid,smile,5",
  },
  {
    id: 6,
    parent: "Krishnan N.",
    review: "Loved the live sessions!",
    fullReview: "Loved the live sessions! The interactive teaching style keeps kids engaged. The coaches are patient, knowledgeable, and truly passionate about chess education.",
    image: "https://source.unsplash.com/random/400x400/?family,child,6",
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 60,
      scale: 0.9,
      duration: 0.8,
      delay: index * 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
      }
    });
  }, [index]);

  const handleFlip = () => {
    if (!cardRef.current) return;
    
    const newFlipped = !isFlipped;
    setIsFlipped(newFlipped);

    gsap.to(cardRef.current.querySelector('.card-inner'), {
      rotationY: newFlipped ? 180 : 0,
      duration: 0.7,
      ease: 'power2.inOut',
    });
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={cardRef}
      className="review-card h-[380px] cursor-pointer perspective-1000"
      onClick={handleFlip}
    >
      <div 
        className="card-inner relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front Side */}
        <div 
          className={`absolute inset-0 rounded-3xl p-8 transition-all duration-500 ${
            isEven 
              ? 'bg-white border-2 border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.06)]' 
              : 'bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-[0_8px_30px_rgba(0,0,0,0.08)]'
          } hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)] backface-hidden`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(0deg)'
          }}
        >
          <div className="flex flex-col h-full">
            {/* Photo */}
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/10 shadow-lg">
                <img 
                  src={review.image}
                  alt={review.parent}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-lg">
                <Quote className="w-5 h-5 text-white" />
              </div>
            </div>

            {/* Review */}
            <div className="flex-1">
              <p className="text-foreground/90 text-lg leading-relaxed font-medium mb-6">
                "{review.review}"
              </p>
            </div>

            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <p className="font-bold text-foreground text-lg">{review.parent}</p>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-primary fill-primary" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>

            {/* Tap hint */}
            <p className="text-center text-xs text-muted-foreground mt-4 opacity-50">
              Tap to read more
            </p>
          </div>
        </div>

        {/* Back Side */}
        <div 
          className={`absolute inset-0 rounded-3xl p-8 ${
            isEven 
              ? 'bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20' 
              : 'bg-gradient-to-br from-purple-50 to-white border-2 border-primary/30'
          } shadow-[0_20px_60px_rgba(139,92,246,0.15)] backface-hidden`}
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="flex flex-col h-full justify-center items-center text-center">
            <Quote className="text-primary/30 h-16 w-16 mb-6" />
            <p className="text-foreground text-lg leading-relaxed font-medium mb-8">
              "{review.fullReview}"
            </p>
            <p className="font-bold text-primary text-xl">— {review.parent}</p>
            <p className="text-xs text-muted-foreground mt-6 opacity-50">
              Tap to flip back
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const ReviewsChess = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-32 bg-white overflow-hidden">
      <ChessCoinLayer section="testimonials" />
      {/* Subtle Chessboard Pattern */}
      <ChessboardPattern opacity={0.08} />
      
      {/* Floating Chess Pieces Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] text-8xl opacity-[0.02] select-none">♔</div>
        <div className="absolute top-[40%] right-[15%] text-7xl opacity-[0.03] select-none">♕</div>
        <div className="absolute bottom-32 left-[20%] text-6xl opacity-[0.02] select-none">♘</div>
        <div className="absolute top-[60%] left-[5%] text-5xl opacity-[0.03] select-none">♗</div>
        <div className="absolute bottom-[20%] right-[25%] text-7xl opacity-[0.02] select-none">♖</div>
      </div>

      <div className="container px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            What Parents Say
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto font-light">
            Real reviews from proud parents around the world
          </p>
        </div>

        {/* 3x2 Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20" data-aos="fade-up" data-aos-delay="400">
          <p className="text-muted-foreground text-sm mb-4">
            Join hundreds of satisfied families
          </p>
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary/10 to-purple-500/10 border border-primary/20">
            <span className="font-medium text-primary">✓</span>
            <span className="text-sm font-medium">100+ Success Stories</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsChess;
