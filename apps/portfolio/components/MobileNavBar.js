import { useState } from "react";

const MobileNavbar = ({ toggleLanguage, isEnglish }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Función para cerrar el menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="md:hidden fixed top-0 left-0 w-full bg-navbar text-white h-20 px-6 flex justify-between items-center z-50 shadow-lg">
      <div className="flex items-center">
        <img src="/Logo.png" alt="Logo JE" className="h-20 w-auto rounded-lg" />
      </div>

      {/* Botón de menú hamburguesa */}
      <button
        className="text-white focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <img src="/menu-icon.png" alt="Menu" className="w-8 h-8" />
      </button>

      {/* Menú desplegable */}
      {menuOpen && (
        <div className="absolute top-20 left-0 w-full bg-navbar shadow-md flex flex-col items-center py-6 space-y-6">
          <a
            href="#projects"
            className="hover:text-[var(--link-hover)] transition-all"
            onClick={handleLinkClick}
          >
            Proyectos
          </a>
          <a
            href="#contact"
            className="hover:text-[var(--link-hover)] transition-all"
            onClick={handleLinkClick}
          >
            Contacto
          </a>
          <a
            href="https://www.linkedin.com/in/jorge-esquiva-llobregat-614565131/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--link-hover)] transition-all"
            onClick={handleLinkClick}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Jorgesq9"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--link-hover)] transition-all"
            onClick={handleLinkClick}
          >
            GitHub
          </a>
          <a
            href="/cv-es.pdf"
            download="CV_Jorge_Esquiva_ES.pdf"
            className="hover:text-[var(--link-hover)] transition-all"
            onClick={handleLinkClick}
          >
            Descargar CV (ES)
          </a>

          <a
            href="/cv-en.pdf"
            download="CV_Jorge_Esquiva_EN.pdf"
            className="hover:text-[var(--link-hover)] transition-all"
            onClick={handleLinkClick}
          >
            Download CV (EN)
          </a>
          <button
            onClick={() => {
              toggleLanguage();
              handleLinkClick();
            }}
            className="transition-all"
          >
            <img
              src={isEnglish ? "/uk-flag.png" : "/spain-flag.png"}
              alt={isEnglish ? "English" : "Español"}
              className="w-8 h-6 rounded-lg"
            />
          </button>
        </div>
      )}
    </nav>
  );
};

export default MobileNavbar;
