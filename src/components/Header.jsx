import { useState, useEffect } from "react";
import doubleyouLogo from "../assets/image-landing/file_logo_astika.png";

const Header = ({ isAlwaysScroll = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50); // Jika scroll lebih dari 50px, set isScrolled ke true
  };

  useEffect(() => {
    // Jika isAlwaysScroll true, set isScrolled menjadi true langsung
    if (!isAlwaysScroll) {
      // Menambahkan event listener saat komponen mount
      window.addEventListener("scroll", handleScroll);

      // Membersihkan event listener saat komponen unmount
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    } else {
      setIsScrolled(true); // Menyebabkan tampilan selalu seperti di-scroll
    }
  }, [isAlwaysScroll]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div className={`logo ${isScrolled ? "scrolled" : ""}`}>
        <img src={doubleyouLogo} alt="Doubleyou Homestay Logo" />
      </div>
      <nav className={`navigation ${menuOpen ? "active" : ""}`}>
        <a href={`${"/#home"}`} onClick={closeMenu}>
          Home
        </a>
        {/* <a href={`${"/#accommodation"}`} onClick={closeMenu}>
          Accommodation
        </a> */}
        <a href={`${"/#activities"}`} onClick={closeMenu}>
          Activities
        </a>
        <a href={`${"/#package"}`} onClick={closeMenu}>
          Package
        </a>
        <a href={`${"/#transport-rental"}`} onClick={closeMenu}>
          Transport
        </a>
        <a href={`${"/#about-us"}`} onClick={closeMenu}>
          About Us
        </a>
        {/* <a href="/book/accommodations" className="book-now" onClick={closeMenu}>
          Book Now
        </a> */}
      </nav>
      <div
        className={`hamburger ${isScrolled ? "scrolled" : ""} ${menuOpen ? "open" : ""}`}
        id="hamburger-menu"
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </header>
  );
};

export default Header;
