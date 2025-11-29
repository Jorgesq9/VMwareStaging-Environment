import { useState } from "react";
import DesktopNavBar from "./DesktopNavBar";
import MobileNavbar from "./MobileNavBar";

const Navbar = ({ setLanguage }) => {
  const [isEnglish, setIsEnglish] = useState(false);

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish);
    if (setLanguage) {
      setLanguage(isEnglish ? "en" : "es");
    } else {
      console.warn("setLanguage no está definido");
    }
  };

  return (
    <>
      <DesktopNavBar toggleLanguage={toggleLanguage} isEnglish={isEnglish} />
      <MobileNavbar toggleLanguage={toggleLanguage} isEnglish={isEnglish} />
    </>
  );
};

export default Navbar;
