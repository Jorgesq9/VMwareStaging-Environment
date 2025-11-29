import { motion } from "framer-motion";

const About = ({ language }) => {
  return (
    <motion.section
      id="about"
      className="min-h-screen flex flex-col justify-center items-center px-8 snap-start overflow-hidden"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      {/* TITLE */}
      <motion.h1
        className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center leading-tight"
        style={{ color: "#C29B39" }}
      >
        {language === "es" ? "¡Hola! Soy Jorge" : "Hello! I'm Jorge"}
      </motion.h1>

      {/* SUBTITLE */}
      <motion.p
        className="text-lg max-w-2xl text-center mb-10 font-semibold"
        style={{ color: "#C29B39" }}
      >
        {language === "es"
          ? "Ingeniero Cloud & DevOps especializado en servidores Linux, contenedores y automatización."
          : "Cloud & DevOps Engineer specialized in Linux servers, containerized deployments and automation."}
      </motion.p>

      {/* DESKTOP VERSION (HIDDEN ON MOBILE) */}
      <motion.div className="hidden md:block text-md max-w-2xl text-center space-y-4">
        {language === "es" ? (
          <>
            <p>
              Me formé en el bootcamp de Ironhack, trabajando con{" "}
              <span className="font-semibold text-highlight">
                JavaScript, React, Node.js, Express
              </span>{" "}
              y <span className="font-semibold text-highlight">MongoDB</span>.
            </p>

            <p>
              Con el tiempo orienté mi perfil hacia infraestructura y sistemas,
              gestionando servidores propios y desplegando aplicaciones en{" "}
              <span className="font-semibold text-highlight">AWS EC2</span>.
            </p>

            <p>
              Trabajo con{" "}
              <span className="font-semibold text-highlight">
                Docker, Nginx, Cloudflare, Linux y systemd
              </span>
              , creando entornos reproducibles, pipelines de despliegue,
              monitorización y automatización.
            </p>

            <p>
              También construyo laboratorios con{" "}
              <span className="font-semibold text-highlight">
                VMware y Ubuntu Server
              </span>
              , desarrollando infra en `/srv`, backups y despliegues reales.
            </p>

            <p>
              Actualmente curso{" "}
              <span className="font-semibold text-highlight">ASIR</span> para
              reforzar redes, virtualización y cloud computing.
            </p>
          </>
        ) : (
          <>
            <p>
              I trained at Ironhack's bootcamp, working with{" "}
              <span className="font-semibold text-highlight">
                JavaScript, React, Node.js, Express
              </span>{" "}
              and <span className="font-semibold text-highlight">MongoDB</span>.
            </p>

            <p>
              Over time I shifted toward infrastructure and systems, managing
              servers and deploying applications on{" "}
              <span className="font-semibold text-highlight">AWS EC2</span>.
            </p>

            <p>
              I work with{" "}
              <span className="font-semibold text-highlight">
                Docker, Nginx, Cloudflare, Linux and systemd
              </span>
              , building reproducible environments, pipelines, monitoring and
              automation.
            </p>

            <p>
              I also build labs using{" "}
              <span className="font-semibold text-highlight">
                VMware and Ubuntu Server
              </span>
              , designing `/srv` infra, backups and real deployments.
            </p>

            <p>
              I am currently studying{" "}
              <span className="font-semibold text-highlight">ASIR</span> to
              strengthen virtualization, networking and cloud computing.
            </p>
          </>
        )}
      </motion.div>

      {/* MOBILE VERSION (HIDDEN ON DESKTOP) */}
      <motion.div className="block md:hidden text-base max-w-xl text-center space-y-4">
        {language === "es" ? (
          <>
            <p>
              Ingeniero Cloud & DevOps con experiencia en{" "}
              <span className="font-semibold">Linux, Docker, Nginx y AWS</span>.
            </p>
            <p>
              Gestión de servidores, despliegues contenerizados y automatización
              con systemd y Cloudflare.
            </p>
            <p>
              Formado en Ironhack y actualmente cursando{" "}
              <span className="font-semibold">ASIR</span>.
            </p>
          </>
        ) : (
          <>
            <p>
              Cloud & DevOps Engineer experienced with{" "}
              <span className="font-semibold">
                Linux, Docker, Nginx and AWS
              </span>
              .
            </p>
            <p>
              Server management, containerized deployments and automation with
              systemd and Cloudflare.
            </p>
            <p>
              Trained at Ironhack and currently studying{" "}
              <span className="font-semibold">ASIR</span>.
            </p>
          </>
        )}
      </motion.div>
    </motion.section>
  );
};

export default About;
