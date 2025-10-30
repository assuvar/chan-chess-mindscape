import { useEffect, useState } from 'react';
import a1 from '@/assets/a1.jpg';
import a2 from '@/assets/a2.jpg';
import a3 from '@/assets/a3.jpg';
import a4 from '@/assets/a4.jpg';
import a5 from '@/assets/a5.jpg';
import a6 from '@/assets/a6.jpg';

const images = [a1, a2, a3, a4, a5, a6];

const AchievementsCarousel = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative bg-white py-20">
      <div className="container px-4">
        <div className="mb-10 text-center">
          <h2 className="text-5xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            Student Achievements
          </h2>
          <p className="text-muted-foreground text-lg sm:text-xl">
            Highlights from our recent tournaments and milestones
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl aspect-[4/3] sm:aspect-[16/9] rounded-3xl overflow-hidden border border-gray-200 shadow-[0_12px_40px_rgba(0,0,0,0.08)] bg-black/5">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Achievement ${i + 1}`}
              className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-700 ${i === index ? 'opacity-100' : 'opacity-0'}`}
              loading={i === 0 ? 'eager' : 'lazy'}
            />
          ))}
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-2 w-2 rounded-full transition-colors ${i === index ? 'bg-primary' : 'bg-primary/30'}`}
            />)
          )}
        </div>
      </div>
    </section>
  );
};

export default AchievementsCarousel;

