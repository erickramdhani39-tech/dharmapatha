import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Beranda", path: "/" },
    { name: "Tentang", path: "/tentang" },
    { name: "Fresh Graduate", path: "/freshgraduate" },
    { name: "Switch Career", path: "/switch-career" },
    { name: "Konsultasi", path: "/konsultasi" },
    { name: "Kontak", path: "/kontak" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Dharmapatha
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  {link.name}
                </Button>
              </Link>
            ))}
            <Button className="ml-4 bg-gradient-primary hover:opacity-90">
              Mulai Konsultasi
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-muted"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
              >
                <Button
                  variant="ghost"
                  className="w-full justify-start text-foreground hover:text-primary"
                >
                  {link.name}
                </Button>
              </Link>
            ))}
            <Button className="w-full bg-gradient-primary hover:opacity-90">
              Mulai Konsultasi
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
