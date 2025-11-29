import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import Link from "next/link";
import { projectsData } from "../data/projectsData";
import { motion, AnimatePresence } from "framer-motion";

const Projects = ({ language }) => {
  const categories = [
    {
      id: "devops",
      title:
        language === "es"
          ? "DevOps e Infraestructura"
          : "DevOps & Infrastructure",
    },
    {
      id: "backend",
      title: language === "es" ? "Backend & APIs" : "Backend & APIs",
    },
    {
      id: "migrations",
      title:
        language === "es"
          ? "Migraciones de Infraestructura"
          : "Infra Migrations",
    },
    {
      id: "mendix",
      title:
        language === "es"
          ? "Proyectos Mendix (Low-code)"
          : "Mendix (Low-code) Projects",
    },
  ];

  const [activeCategory, setActiveCategory] = useState(categories[0].id);
  const filtered = projectsData.filter((p) => p.category === activeCategory);

  return (
    <motion.section
      id="projects"
      // En móvil: min-h-screen; en desktop: pantalla completa
      className="min-h-screen md:h-screen flex flex-col justify-center items-center px-4 sm:px-6 md:px-12 bg-background text-textLight snap-start py-16 md:py-10"
    >
      {/* TÍTULO */}
      <motion.h2
        className="flex-shrink-0 text-3xl md:text-4xl font-bold text-center mt-20 md:mt-32 mb-6 md:mb-8 text-[#C29B39]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.8 }}
      >
        {language === "es" ? "Mis Proyectos" : "My Projects"}
      </motion.h2>

      {/* BOTONES */}
      <motion.div
        className="flex-shrink-0 flex justify-center gap-2 sm:gap-4 mb-6 flex-wrap"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 py-2 rounded-full text-xs sm:text-sm font-semibold transition 
            ${
              activeCategory === cat.id
                ? "bg-[#C29B39] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            {cat.title}
          </button>
        ))}
      </motion.div>

      {/* CONTENIDO CENTRAL */}
      <div className="w-full flex justify-center flex-1 pb-6 md:pb-8 mt-2 md:mt-4">
        <div className="w-full max-w-md sm:max-w-lg md:max-w-3xl flex items-center">
          <AnimatePresence mode="wait">
            <Swiper
              key={activeCategory}
              modules={[Navigation]}
              navigation
              slidesPerView={1}
              autoHeight
            >
              {filtered.map((project) => (
                <SwiperSlide
                  key={project.id}
                  className="flex items-center justify-center !h-auto"
                >
                  <motion.div
                    className="w-full max-w-md sm:max-w-lg bg-gray-800 rounded-xl p-4 md:p-6 shadow-2xl transition-shadow flex flex-col justify-between mx-auto h-auto min-h-[360px] md:min-h-[420px] overflow-visible"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    {/* Cabecera */}
                    <div className="text-center mb-4 md:mb-6">
                      <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-[#C29B39]">
                        {language === "es"
                          ? project.title_es
                          : project.title_en}
                      </h3>
                      <p className="text-gray-300 text-sm md:text-base">
                        {language === "es"
                          ? project.description_es
                          : project.description_en}
                      </p>
                    </div>

                    {/* Características */}
                    <div className="mb-4 md:mb-6 w-full">
                      <div className="max-w-full mx-auto">
                        <ul className="list-disc pl-4 md:pl-8 pr-1 space-y-1.5 md:space-y-2 text-left">
                          {(language === "es"
                            ? project.features_es || []
                            : project.features_en || []
                          ).map((feature) => (
                            <li
                              key={feature}
                              className="text-gray-300 text-xs md:text-sm leading-snug"
                            >
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Tecnologías */}
                    <div className="flex flex-nowrap overflow-x-auto gap-2 mb-4 text-center pb-1">
                      {project.tech?.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-700 rounded-full text-[0.7rem] md:text-xs text-gray-300 whitespace-nowrap"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Botones */}
                    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                      {project.links?.demo && (
                        <Link
                          href={project.links.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#C29B39] hover:bg-[#ae8a34] text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm"
                        >
                          <span>🌐</span>
                          {language === "es"
                            ? "Demo Frontend"
                            : "Frontend Demo"}
                        </Link>
                      )}

                      {project.links?.documentation && (
                        <Link
                          href={project.links.documentation}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm"
                        >
                          <span>📚</span>
                          {language === "es"
                            ? "Documentación"
                            : "Documentation"}
                        </Link>
                      )}

                      {project.links?.docs && (
                        <Link
                          href={project.links.docs}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm"
                        >
                          <span>📚</span>
                          {language === "es" ? "Documentación API" : "API Docs"}
                        </Link>
                      )}

                      {project.links?.code_api && (
                        <Link
                          href={project.links.code_api}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#C29B39] hover:bg-[#ae8a34] text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm"
                        >
                          <span>🔑</span>
                          {language === "es" ? "Código API" : "API Code"}
                        </Link>
                      )}

                      {project.links?.code_frontend && (
                        <Link
                          href={project.links.code_frontend}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-blue-600 hover:bg-blue-500 text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm"
                        >
                          <span>🖥️</span>
                          {language === "es"
                            ? "Código Frontend"
                            : "Frontend Code"}
                        </Link>
                      )}

                      {project.links?.code && (
                        <Link
                          href={project.links.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#C29B39] hover:bg-[#ae8a34] text-white px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 text-xs md:text-sm"
                        >
                          <span>🖥️</span>
                          {language === "es" ? "Código" : "Code"}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </AnimatePresence>
        </div>
      </div>
    </motion.section>
  );
};

export default Projects;
