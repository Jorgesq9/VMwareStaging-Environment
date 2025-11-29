import { motion } from "framer-motion";
import { useState } from "react";

const Contact = ({ language }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://formspree.io/f/xovjebar", {
        // Reemplaza {TU_FORM_ID}
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        throw new Error(
          language === "es"
            ? "Error al enviar el mensaje. Inténtalo de nuevo."
            : "Failed to send message. Please try again."
        );
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.section
      id="contact"
      className="min-h-screen flex flex-col justify-center items-center px-4 sm:px-8 pt-6 sm:pt-10 bg-background text-textLight snap-start"
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-center leading-tight"
        style={{ color: "#C29B39" }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {language === "es" ? "Contáctame" : "Contact Me"}
      </motion.h2>

      <motion.p
        className="text-center text-lg mb-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {language === "es" ? "Puedes escribirme a" : "You can reach me at"}{" "}
        <a
          href="mailto:jorgeesquivait@gmail.com"
          className="text-blue-400 hover:underline"
        >
          jorgeesquivait@gmail.com
        </a>
      </motion.p>

      {!isSubmitted ? (
        <motion.form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-300 mb-1 sm:mb-2">
              {language === "es" ? "Nombre" : "Name"}
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded bg-gray-600 text-white focus:outline-none"
              required
            />
          </div>

          <div className="mb-3 sm:mb-4">
            <label className="block text-gray-300 mb-1 sm:mb-2">
              {language === "es" ? "Correo Electrónico" : "Email"}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded bg-gray-600 text-white focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-1 sm:mb-2">
              {language === "es" ? "Mensaje" : "Message"}
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 rounded bg-gray-600 text-white focus:outline-none h-24 sm:h-32"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 sm:py-3 rounded font-bold transition"
          >
            {language === "es" ? "Enviar" : "Send"}
          </button>
        </motion.form>
      ) : (
        <motion.p
          className="text-green-400 font-bold text-lg mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {language === "es"
            ? "¡Mensaje enviado con éxito! Me pondré en contacto contigo pronto."
            : "Message sent successfully! I will get in touch with you soon."}
        </motion.p>
      )}
    </motion.section>
  );
};

export default Contact;
