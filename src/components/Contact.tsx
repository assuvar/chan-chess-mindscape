import { Button } from './ui/button';
import { Card } from './ui/card';
import { MapPin, Phone, Mail, MessageCircle, Facebook, Twitter, Instagram } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4">
        <div className="mx-auto max-w-3xl text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Get in Touch
          </h2>
          <p className="text-lg text-muted-foreground">
            Ready to start your chess journey? Contact us today!
          </p>
        </div>

        <div className="mx-auto max-w-5xl grid gap-8 lg:grid-cols-2">
          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="border-2 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href="tel:+916379597908" className="text-muted-foreground hover:text-primary transition-colors">
                    +91 63795 97908
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border-2 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:chanchessclub64@gmail.com" className="text-muted-foreground hover:text-primary transition-colors break-all">
                    chanchessclub64@gmail.com
                  </a>
                </div>
              </div>
            </Card>

            <Card className="border-2 p-6">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-muted-foreground">
                    3/502-49 Thirumalai nagar<br />
                    Thottagiri road, Hosur
                  </p>
                </div>
              </div>
            </Card>

            {/* Social Links */}
            <div className="flex gap-4">
              <a 
                href="https://www.facebook.com/chan.chess.club/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-card border-2 p-3 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="https://x.com/Chanchessclub" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-card border-2 p-3 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="https://www.instagram.com/chan_chess_club/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="rounded-full bg-card border-2 p-3 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* CTA Card */}
          <Card className="border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 p-8 flex flex-col justify-center">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-bold">Start Your Free Trial</h3>
                <p className="text-muted-foreground">
                  Experience our teaching methodology firsthand. Book a complimentary trial session today!
                </p>
              </div>

              <Button 
                size="lg" 
                className="w-full bg-primary hover:shadow-lg hover:shadow-primary/50 transition-all duration-300"
                onClick={() => window.open('https://wa.me/916379597908', '_blank')}
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Message us on WhatsApp
              </Button>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>✓ Online & offline classes available</p>
                <p>✓ Flexible scheduling</p>
                <p>✓ Expert FIDE rated coaches</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;
