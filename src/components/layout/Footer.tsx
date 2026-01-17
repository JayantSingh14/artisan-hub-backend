import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-serif font-bold text-primary mb-4">Karigari</h3>
            <p className="text-muted-foreground max-w-md">
              Celebrating the art of Indian handicrafts. Each piece tells a story of tradition, 
              skill, and the hands that crafted it with love.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-muted-foreground hover:text-foreground transition-colors">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/products?category=pottery" className="text-muted-foreground hover:text-foreground transition-colors">
                  Pottery
                </Link>
              </li>
              <li>
                <Link to="/products?category=textiles" className="text-muted-foreground hover:text-foreground transition-colors">
                  Textiles
                </Link>
              </li>
              <li>
                <Link to="/products?category=jewelry" className="text-muted-foreground hover:text-foreground transition-colors">
                  Jewelry
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>hello@karigari.com</li>
              <li>+91 98765 43210</li>
              <li>Mumbai, India</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Karigari. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
