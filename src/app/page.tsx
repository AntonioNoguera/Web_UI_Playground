"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue
} from "framer-motion"; // Corregida la importación de la biblioteca
import "./../styles/styles.css";

// Función para crear efectos de parallax con intensidad reducida
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance/3, distance/3]); // Reducida la intensidad del efecto
}

// Componente Navbar mejorado con Motion
const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleNavbarScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleNavbarScroll);
    return () => {
      window.removeEventListener("scroll", handleNavbarScroll);
    };
  }, []);
  
  return (
    <motion.nav
      className={`fixed top-0 left-0 w-full z-50 ${
        scrolled ? "bg-black/70 backdrop-blur-md" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ 
        y: 0,
        padding: scrolled ? "0.75rem 0" : "1.25rem 0"
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div 
          className="text-white font-bold text-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          Logo
        </motion.div>
        <ul className="flex space-x-6">
          <motion.li whileHover={{ y: -2 }}>
            <a href="#section1" className="text-white hover:text-gray-300 transition">Inicio</a>
          </motion.li>
          <motion.li whileHover={{ y: -2 }}>
            <a href="#section2" className="text-white hover:text-gray-300 transition">Puente</a>
          </motion.li>
          <motion.li whileHover={{ y: -2 }}>
            <a href="#section3" className="text-white hover:text-gray-300 transition">Final</a>
          </motion.li>
        </ul>
      </div>
    </motion.nav>
  );
};

// Componente de vídeo de fondo con Motion
const BackgroundVideo: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  return (
    <motion.div 
      className="fixed inset-0 w-full h-screen overflow-hidden -z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <video className="w-full h-full object-cover" autoPlay loop muted playsInline key={videoSrc}>
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </motion.div>
  );
};

// Componente de sección para cada pantalla completa
interface SectionProps {
  id: string;
  title: string;
  description: string;
  bgClass: string;
  textColor?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, description, bgClass, textColor = "text-gray-900" }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ 
    target: ref,
    // Modificado para que el efecto sea más suave y comience antes
    offset: ["start end", "end start"]
  });
  
  // Efectos de parallax con menor intensidad
  const y = useParallax(scrollYProgress, 50); // Reducido de 100 a 50
  
  return (
    <section
      id={id}
      ref={ref}
      className={`h-screen w-full ${bgClass} overflow-hidden`}
    >
      <div className="flex flex-col items-center justify-center h-full px-6 py-10 text-center relative">
        <motion.h2
          className={`text-4xl font-bold ${textColor} mb-4`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
        >
          {title}
        </motion.h2>
        <motion.p
          className={`text-lg max-w-xl ${textColor === "text-gray-900" ? "text-gray-700" : textColor}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.3 }}
          style={{ y }} // Aplicamos solo el efecto Y, sin cambiar otras propiedades
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

const PageContent: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState("/video.mp4");
  const containerRef = useRef<HTMLDivElement | null>(null);
  
  // Scroll progress para la barra de progreso
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  // Effect para cambiar el video según la sección actual
  // Optimizado para reducir renderizados innecesarios
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    let currentVideo = "/video.mp4";
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          if (sectionId === 'section1' && currentVideo !== "/video.mp4") {
            currentVideo = "/video.mp4";
            setVideoSrc(currentVideo);
          } else if (sectionId !== 'section1' && currentVideo !== "/video2.mp4") {
            currentVideo = "/video2.mp4";
            setVideoSrc(currentVideo);
          }
        }
      });
    }, { 
      threshold: 0.6  // Aumentado a 60% para reducir cambios rápidos
    });
    
    sections.forEach(section => {
      observer.observe(section);
    });
    
    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);
  
  // Navegación entre secciones con ajuste de scroll snap
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-snap-type: y mandatory; /* Cambiado de mandatory a proximity para menos rigidez */
        scroll-behavior: smooth;
      }
      
      body {
        overflow-y: scroll;
        margin: 0;
        padding: 0;
      }
      
      section {
        scroll-snap-align: start;
        scroll-snap-stop: always;
      }
    `;
    document.head.appendChild(style);
    
    // Función para evitar problemas durante el scroll rápido
    const handleWheel = (e: WheelEvent) => {
      // Ajustar la velocidad del scroll para que sea más suave
      if (Math.abs(e.deltaY) > 100) {
        e.preventDefault();
        window.scrollBy({
          top: Math.sign(e.deltaY) * 50,
          behavior: 'smooth'
        });
      }
    };
    
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      document.head.removeChild(style);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  return (
    <div className="relative z-0" ref={containerRef}>
      {/* Navbar */}
      <Navbar />
      
      {/* Video de fondo dinámico */}
      <BackgroundVideo videoSrc={videoSrc} />
      
      {/* Barra de progreso */}
      <motion.div 
        className="fixed left-0 bottom-10 right-0 h-1 bg-white z-50"
        style={{ scaleX, transformOrigin: "0%" }}
      />

      {/* Secciones */}
      <Section 
        id="section1"
        title="Sección 1"
        description="Este contenido pasa sobre el video de fondo."
        bgClass="bg-white/40 backdrop-blur-md"
      />

      <Section 
        id="section2"
        title="Sección 2 (Puente)"
        description="Al cruzar esta sección, el fondo cambiará permanentemente hasta regresar a la Sección 1."
        bgClass="bg-black"
        textColor="text-white"
      />

      <Section 
        id="section3"
        title="Sección 3"
        description="Esta sección hereda el fondo de la Sección 2, nunca vuelve al de la Sección 1."
        bgClass="bg-blue-500/40 backdrop-blur-md"
        textColor="text-white"
      />
    </div>
  );
};

export default PageContent;