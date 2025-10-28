import { useEffect, useRef, useState } from 'react';
import { Button } from './ui/button';
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const navRef = useRef<HTMLElement>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled(scrolled);
      
      if (navRef.current) {
        gsap.to(navRef.current, {
          height: scrolled ? 64 : 80,
          duration: 0.3,
          ease: 'power2.out'
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContact = () => {
    if (location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-xl shadow-elegant border-b border-border/50' 
          : 'bg-transparent'
      }`}
      style={{ height: '80px' }}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo & Brand */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg transition-transform group-hover:scale-110">
            C
          </div>
          <span className="font-bold text-lg hidden sm:inline-block bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
            CHAN CHESS CLUB
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link 
            to="/" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link 
            to="/blog" 
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Blog
          </Link>
          <button 
            onClick={scrollToContact}
            className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
          >
            Contact
          </button>
          <Button 
            size="sm"
            className="rounded-full bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
            onClick={() => window.open('https://wa.me/916379597908', '_blank')}
          >
            Book Free Trial
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-border shadow-lg">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link 
              to="/" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/blog" 
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <button 
              onClick={() => {
                scrollToContact();
                setIsMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 text-left"
            >
              Contact
            </button>
            <Button 
              size="sm"
              className="rounded-full bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
              onClick={() => {
                window.open('https://wa.me/916379597908', '_blank');
                setIsMobileMenuOpen(false);
              }}
            >
              Book Free Trial
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
