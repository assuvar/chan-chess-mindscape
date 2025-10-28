import { useEffect, useRef } from 'react';
import { Quote } from 'lucide-react';
import gsap from 'gsap';

const reviews = [
  {
    id: 1,
    parent: "Priya Sharma",
    child: "Aarav (Age 7)",
    review: "My son's concentration has improved drastically. The coaches are patient and make chess fun!",
    rating: 5,
  },
  {
    id: 2,
    parent: "Rajesh Kumar",
    child: "Diya (Age 9)",
    review: "Best decision we made! Diya now thinks strategically in everything she does.",
    rating: 5,
  },
  {
    id: 3,
    parent: "Anita Desai",
    child: "Rohan (Age 6)",
    review: "The small batch size ensures personal attention. Rohan loves his classes!",
    rating: 5,
  },
  {
    id: 4,
    parent: "Vikram Reddy",
    child: "Sara (Age 8)",
    review: "World-class coaching at home. Sara has won her first tournament already!",
    rating: 5,
  },
  {
    id: 5,
    parent: "Meera Iyer",
    child: "Arjun (Age 10)",
    review: "The FIDE-rated coaches bring international standards to every lesson.",
    rating: 5,
  },
  {
    id: 6,
    parent: "Suresh Patel",
    child: "Ananya (Age 7)",
    review: "Chess has boosted her confidence and problem-solving skills tremendously.",
    rating: 5,
  },
];

const Reviews = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tiles = sectionRef.current?.querySelectorAll('.review-tile');
    if (!tiles) return;

    // Staggered fade-in animation
    gsap.from(tiles, {
      opacity: 0,
      y: 50,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      }
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            What Parents Say
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real experiences from families who trust us with their child's chess journey
          </p>
        </div>

        {/* Chessboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className={`review-tile group relative overflow-hidden rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-elegant cursor-pointer ${
                index % 2 === 0
                  ? 'bg-card border border-border'
                  : 'bg-secondary/50 border border-border/50'
              }`}
              style={{ perspective: '1000px' }}
            >
              {/* Front Content */}
              <div className="relative z-10 transition-transform duration-500 group-hover:scale-105">
                <Quote className="text-primary/20 h-12 w-12 mb-4" />
                
                <p className="text-foreground/90 mb-6 leading-relaxed font-medium">
                  "{review.review}"
                </p>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
                    {review.parent.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.parent}</p>
                    <p className="text-sm text-muted-foreground">{review.child}</p>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="flex gap-1 mt-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-primary fill-primary"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
