"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from "motion/react";
import "./../styles/styles.css";

// Función para crear efectos de parallax
function useParallax(value: MotionValue<number>, distance: number) {
  return useTransform(value, [0, 1], [-distance, distance]);
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
    offset: ["start start", "end start"]
  });
  
  // Efectos de parallax
  const y = useParallax(scrollYProgress, 100);
  
  return (
    <section
      id={id}
      ref={ref}
      className={`h-screen w-full snap-start ${bgClass} overflow-hidden`}
    >
      <div className="flex flex-col items-center justify-center h-full px-6 py-10 text-center">
        <motion.h2
          className={`text-4xl font-bold ${textColor}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
        >
          {title}
        </motion.h2>
        <motion.p
          className={`text-lg max-w-xl mt-4 ${textColor === "text-gray-900" ? "text-gray-700" : textColor}`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: false }}
          style={{ y }}
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
  useEffect(() => {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          
          if (sectionId === 'section1') {
            setVideoSrc("/video.mp4");
          } else {
            // Sección 2 y 3 comparten el mismo vídeo
            setVideoSrc("/video2.mp4");
          }
        }
      });
    }, { 
      threshold: 0.5  // Cuando al menos 50% de la sección es visible
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
  
  // Navegación suave entre secciones
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      html {
        scroll-snap-type: y mandatory;
        scroll-behavior: smooth;
      }
      
      body {
        overflow-y: scroll;
        margin: 0;
        padding: 0;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
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