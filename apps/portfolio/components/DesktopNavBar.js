import React, { useState, useRef, useEffect } from "react";

const DesktopNavBar = ({ toggleLanguage, isEnglish }) => {
  const [cvMenuOpen, setCvMenuOpen] = useState(false);
  const cvMenuRef = useRef(null);

  // Cierra el menú si haces clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cvMenuRef.current && !cvMenuRef.current.contains(event.target)) {
        setCvMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full bg-navbar text-white h-20 px-8 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center">
        <img src="/Logo.png" alt="Logo JE" className="h-32 w-auto rounded-lg" />
      </div>

      <div className="absolute left-[48%] transform -translate-x-1/2 flex space-x-14">
        <a
          href="https://www.linkedin.com/in/jorge-esquiva-llobregat-614565131/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--link-hover)] transition-all"
        >
          <img src="/linkedin.png" alt="LinkedIn" className="w-10 h-10" />
        </a>

        <a
          href="https://github.com/Jorgesq9"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--link-hover)] transition-all"
        >
          <img src="/github.png" alt="GitHub" className="w-10 h-10" />
        </a>

        <div className="relative" ref={cvMenuRef}>
          <button
            onClick={() => setCvMenuOpen(!cvMenuOpen)}
            className="hover:text-[var(--link-hover)] transition-all"
          >
            <img src="/cv-icon.png" alt="Descargar CV" className="w-10 h-10" />
          </button>

          {cvMenuOpen && (
            <div className="absolute top-12 left-0 rounded shadow-lg py-2 z-50 w-40 bg-[#162842] text-white">
              <a
                href="/cv-es.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-opacity-90"
              >
                CV Español
              </a>
              <a
                href="/cv-en.html"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-4 py-2 hover:bg-opacity-90"
              >
                CV English
              </a>
            </div>
          )}
        </div>
      </div>

      <div className="flex space-x-8 text-lg">
        <a
          href="#projects"
          className="hover:text-[var(--link-hover)] transition-all"
        >
          Proyectos
        </a>
        <a
          href="#contact"
          className="hover:text-[var(--link-hover)] transition-all"
        >
          Contacto
        </a>
        <button onClick={toggleLanguage} className="transition-all">
          <img
            src={isEnglish ? "/uk-flag.png" : "/spain-flag.png"}
            alt={isEnglish ? "English" : "Español"}
            className="w-8 h-6 rounded-lg flag-btn"
          />
        </button>
      </div>
    </nav>
  );
};

export default DesktopNavBar;
