import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Linkedin, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">Dharmapatha</h3>
            <p className="text-sm opacity-90">
              Platform edukasi dan konsultasi karier untuk membantu Anda menemukan arah dan tujuan karier yang tepat.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Navigasi</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link to="/tentang" className="hover:text-accent transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link to="/freshgraduate" className="hover:text-accent transition-colors">
                  Fresh Graduate
                </Link>
              </li>
              <li>
                <Link to="/switch-career" className="hover:text-accent transition-colors">
                  Switch Career
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/konsultasi" className="hover:text-accent transition-colors">
                  Konsultasi Karier
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Tes Minat & Kepribadian
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Program Mentoring
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent transition-colors">
                  Kursus & Workshop
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2">
                <Mail className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>info@dharmapatha.id</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>+62 812-3456-7890</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 flex-shrink-0" />
                <span>Jakarta, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 mt-8 pt-8 text-center text-sm opacity-75">
          <p>&copy; {new Date().getFullYear()} Dharmapatha. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
