import React from 'react';
import { ChefHat, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-charcoal-dark text-white-pure/80 pt-16 pb-8 px-6 border-t border-sage-medium/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-white-pure/10 flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-sage-medium" />
            </div>
            <span className="font-serif text-lg font-bold tracking-tight text-white-pure">
              Recipix
            </span>
          </div>
          <p className="text-sm text-charcoal-light leading-relaxed max-w-sm">
            Your daily dose of delicious recipes, crafted with love for food lovers and home chefs alike.
          </p>
        </div>

        {/* Explore Links */}
        <div className="space-y-4">
          <h4 className="font-serif text-white-pure font-bold text-sm uppercase tracking-wider">Explore</h4>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link to="/recipes" className="hover:text-sage-medium transition-colors duration-200">
                Menu
              </Link>
            </li>
            <li>
              <Link to="/reviews" className="hover:text-sage-medium transition-colors duration-200">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-sage-medium transition-colors duration-200">
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h4 className="font-serif text-white-pure font-bold text-sm uppercase tracking-wider">Contact</h4>
          <ul className="space-y-3 text-sm text-white-pure/70">
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-sage-medium shrink-0" />
              <span>support@recipix.com</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-sage-medium shrink-0" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-sage-medium shrink-0" />
              <span>Bangalore, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-white-pure/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-light">
        <p>© {new Date().getFullYear()} Recipix. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms" className="hover:underline">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
