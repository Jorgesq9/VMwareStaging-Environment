import { useState } from "react";
import Navbar from "../components/NavBar";
import About from "./about";
import Projects from "./projects";
import Contact from "./contact";

const Home = () => {
  const [language, setLanguage] = useState("en");
  const [animate, setAnimate] = useState(false);

  return (
    <div className="bg-background text-textLight h-screen snap-y snap-mandatory overflow-y-scroll">
      <Navbar setLanguage={setLanguage} setAnimate={setAnimate} />
      <div className={`snap-container ${animate ? "animate-fade-in" : ""}`}>
        <About language={language} />
        <Projects language={language} />
        <Contact language={language} />
      </div>
    </div>
  );
};

export default Home;
