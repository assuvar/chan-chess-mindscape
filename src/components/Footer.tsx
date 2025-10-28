import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t bg-white">
      <div className="container px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-xl font-bold mb-4">Chan Chess Club</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Shaping Global Thinkers Through Chess since 2021
            </p>
            <div className="flex gap-3">
              <a 
                href="https://www.facebook.com/chan.chess.club/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/Chanchessclub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/chan_chess_club/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-secondary p-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#programs" className="text-muted-foreground hover:text-primary transition-colors">
                  Programs
                </a>
              </li>
              <li>
                <a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="tel:+916379597908" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <address className="text-sm text-muted-foreground not-italic space-y-2">
              <p>3/502-49 Thirumalai nagar</p>
              <p>Thottagiri road, Hosur</p>
              <p>Phone: <a href="tel:+916379597908" className="hover:text-primary transition-colors">+91 63795 97908</a></p>
              <p>Email: <a href="mailto:chanchessclub64@gmail.com" className="hover:text-primary transition-colors">chanchessclub64@gmail.com</a></p>
            </address>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Chan Chess Club. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
