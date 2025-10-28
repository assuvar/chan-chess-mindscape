import { useEffect, useRef, useState } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';
import ChessboardPattern from './ChessboardPattern';

const reviews = [
  {
    id: 1,
    parent: "Priya Sharma",
    child: "Aarav (Age 7)",
    review: "My son improved focus and discipline in just 6 weeks! The personalized coaching made all the difference.",
    image: "https://source.unsplash.com/random/400x400/?family,child,1",
    rating: 5,
  },
  {
    id: 2,
    parent: "Arjun Patel",
    child: "Diya (Age 9)",
    review: "Best chess coaching experience, highly recommended! Diya won her first tournament last month.",
    image: "https://source.unsplash.com/random/400x400/?parent,kid,2",
    rating: 5,
  },
  {
    id: 3,
    parent: "Divya Reddy",
    child: "Rohan (Age 8)",
    review: "Live classes + personal attention = amazing results! We're so happy with the progress.",
    image: "https://source.unsplash.com/random/400x400/?family,happy,3",
    rating: 5,
  },
  {
    id: 4,
    parent: "Vikram Kumar",
    child: "Sara (Age 6)",
    review: "World-class coaching at home. The FIDE-rated coaches are exceptional with young children.",
    image: "https://source.unsplash.com/random/400x400/?child,portrait,4",
    rating: 5,
  },
  {
    id: 5,
    parent: "Meera Iyer",
    child: "Arjun (Age 10)",
    review: "Outstanding teaching methodology! Arjun's strategic thinking has improved in all areas of life.",
    image: "https://source.unsplash.com/random/400x400/?kid,smile,5",
    rating: 5,
  },
  {
    id: 6,
    parent: "Suresh Desai",
    child: "Ananya (Age 7)",
    review: "Small batch sizes ensure every child gets attention. Ananya looks forward to every class!",
    image: "https://source.unsplash.com/random/400x400/?family,child,6",
    rating: 5,
  },
  {
    id: 7,
    parent: "Kavita Singh",
    child: "Aditya (Age 9)",
    review: "The flexible scheduling and online options are perfect for our busy family. Highly recommend!",
    image: "https://source.unsplash.com/random/400x400/?parent,child,7",
    rating: 5,
  },
  {
    id: 8,
    parent: "Ramesh Nair",
    child: "Priya (Age 8)",
    review: "International-level coaching standards. Priya's confidence has skyrocketed!",
    image: "https://source.unsplash.com/random/400x400/?kid,happy,8",
    rating: 5,
  },
  {
    id: 9,
    parent: "Anjali Gupta",
    child: "Kabir (Age 6)",
    review: "Best decision we made this year! The coaches make learning chess enjoyable and engaging.",
    image: "https://source.unsplash.com/random/400x400/?child,joy,9",
    rating: 5,
  },
];

const ReviewCard = ({ review, index }: { review: typeof reviews[0]; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    gsap.from(cardRef.current, {
      opacity: 0,
      y: 50,
      scale: 0.9,
      duration: 0.6,
      delay: index * 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 85%',
      }
    });
  }, [index]);

  const handleFlip = () => {
    if (!cardRef.current) return;
    setIsFlipped(!isFlipped);

    gsap.to(cardRef.current, {
      rotationY: isFlipped ? 0 : 180,
      duration: 0.6,
      ease: 'power2.inOut',
    });
  };

  return (
    <div
      ref={cardRef}
      className="review-tile cursor-pointer"
      style={{ transformStyle: 'preserve-3d' }}
      onClick={handleFlip}
    >
      <div className={`relative h-full rounded-3xl transition-all duration-500 hover:scale-105 ${
        index % 2 === 0 ? 'bg-card/90' : 'bg-secondary/80'
      } backdrop-blur-sm border border-border/50 shadow-card hover:shadow-elegant overflow-hidden`}>
        {/* Front Side */}
        <div className={`absolute inset-0 p-8 flex flex-col justify-between ${isFlipped ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}>
          <div>
            <img 
              src={review.image}
              alt={review.parent}
              className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-primary/20"
            />
            <h4 className="font-bold text-xl text-foreground mb-1">{review.parent}</h4>
            <p className="text-sm text-primary font-semibold mb-4">{review.child}</p>
          </div>

          <div className="flex gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <svg key={i} className="w-5 h-5 text-primary fill-primary" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>

          <Quote className="absolute top-4 right-4 text-primary/10 h-16 w-16" />
        </div>

        {/* Back Side */}
        <div className={`absolute inset-0 p-8 flex items-center justify-center ${isFlipped ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
          style={{ transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <Quote className="text-primary/20 h-12 w-12 mx-auto mb-6" />
            <p className="text-foreground/90 text-lg leading-relaxed font-medium">
              "{review.review}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={sectionRef} className="relative py-32 overflow-hidden">
      {/* Chessboard Background Pattern */}
      <ChessboardPattern variant="light" opacity={0.08} />
      
      <div className="container px-4 relative z-10">
        <div className="text-center mb-20" data-aos="fade-up">
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            What Parents Say
          </h2>
          <p className="text-muted-foreground text-xl max-w-3xl mx-auto">
            Real experiences from families who trust us with their child's chess journey
          </p>
        </div>

        {/* 3x3 Chessboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {reviews.map((review, index) => (
            <ReviewCard key={review.id} review={review} index={index} />
          ))}
        </div>

        <div className="text-center mt-16" data-aos="fade-up" data-aos-delay="300">
          <p className="text-muted-foreground text-sm">
            Click any card to read the full testimonial
          </p>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
