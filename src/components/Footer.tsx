import React from 'react';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Newsletter from './Newsletter';

const Footer = () => {
  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/flourishednutrition', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/flourishednutr', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/flourishednutrition', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/flourished-nutrition', label: 'LinkedIn' },
    { icon: Youtube, href: 'https://youtube.com/flourishednutrition', label: 'YouTube' }
  ];

  const quickLinks = [
    { label: 'Menu', href: '/menu' },
    { label: 'Family Meals', href: '/family-meals' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'FAQ', href: '/faq' }
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <Newsletter />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Flourished Nutrition</h3>
            <p className="text-gray-400 mb-4">
              Making healthy eating accessible, enjoyable, and sustainable for everyone.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-emerald-400 transition-colors"
                  aria-label={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    to={href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {legalLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link 
                    to={href}
                    className="text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-emerald-400" />
                <a href="mailto:support@flourishednutrition.com" className="hover:text-emerald-400">
                  support@flourishednutrition.com
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>123 Nutrition St, Health City, HC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Flourished Nutrition. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
