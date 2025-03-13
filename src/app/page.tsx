"use client";

import { useEffect, useState, useRef } from "react";
import "./../styles/styles.css";

// Componente Navbar
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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-black/70 backdrop-blur-md py-3" : "bg-transparent py-5"
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="text-white font-bold text-xl">Logo</div>
        <ul className="flex space-x-6">
          <li><a href="#section1" className="text-white hover:text-gray-300 transition">Inicio</a></li>
          <li><a href="#section2" className="text-white hover:text-gray-300 transition">Puente</a></li>
          <li><a href="#section3" className="text-white hover:text-gray-300 transition">Final</a></li>
        </ul>
      </div>
    </nav>
  );
};

const BackgroundVideo: React.FC<{ videoSrc: string }> = ({ videoSrc }) => {
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden -z-10">
      <video className="w-full h-full object-cover" autoPlay loop muted playsInline key={videoSrc}>
        <source src={videoSrc} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </div>
  );
};

const PageContent: React.FC = () => {
  const [videoSrc, setVideoSrc] = useState("/video.mp4");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState<"section1" | "section2" | "section3">("section1");

  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const secondSectionRef = useRef<HTMLDivElement | null>(null);
  const thirdSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const direction = scrollY > lastScrollY ? "down" : "up"; // Determina dirección de navegación

      // Obtiene la posición de cada sección
      const section1Top = firstSectionRef.current?.offsetTop ?? 0;
      const section2Top = secondSectionRef.current?.offsetTop ?? 0;
      const section3Top = thirdSectionRef.current?.offsetTop ?? 0;
      const windowHeight = window.innerHeight;

      if (direction === "down") {
        if (scrollY >= section2Top && scrollY < section3Top) {
          if (currentSection !== "section2") {
            console.log("Entrando en la Sección 2");
            setCurrentSection("section2");
            setVideoSrc("/video2.mp4");
          }
        } else if (scrollY >= section3Top - 1) {
          if (currentSection !== "section3") {
            console.log("Entrando en la Sección 3");
            setCurrentSection("section3");
            setVideoSrc("/video2.mp4"); // La Sección 3 mantiene el video de la Sección 2
          }
        }
      } else {
        if (scrollY < section2Top) {
          if (currentSection !== "section1") {
            console.log("Volviendo a la Sección 1");
            setCurrentSection("section1");
            setVideoSrc("/video.mp4");
          }
        } else if (scrollY >= section2Top && scrollY < section3Top) {
          if (currentSection !== "section2") {
            console.log("Volviendo a la Sección 2");
            setCurrentSection("section2");
            setVideoSrc("/video2.mp4");
          }
        }
      }

      setLastScrollY(scrollY); // Guarda la última posición del scroll
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY, currentSection]);

  // Función para navegar suavemente a las secciones
  useEffect(() => {
    const handleSmoothScroll = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        e.preventDefault();
        const targetId = target.hash.substring(1);
        const element = document.getElementById(targetId);
        if (element) {
          window.scrollTo({
            top: element.offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    document.addEventListener('click', handleSmoothScroll);
    return () => {
      document.removeEventListener('click', handleSmoothScroll);
    };
  }, []);

  return (
    <div className="relative z-0">
      {/* Navbar */}
      <Navbar />
      
      {/* Video de fondo dinámico */}
      <BackgroundVideo videoSrc={videoSrc} />

      {/* Primera sección */}
      <div
        id="section1"
        ref={firstSectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white/40 backdrop-blur-md text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900">Sección 1</h1>
        <p className="text-lg max-w-xl mt-4 text-gray-700">
          Este contenido pasa sobre el video de fondo.
        </p>
      </div>

      {/* Segunda sección - PUENTE */}
      <div
        id="section2"
        ref={secondSectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-black text-center text-white"
      >
        <h2 className="text-3xl font-semibold">Sección 2 (Puente)</h2>
        <p className="text-lg max-w-xl mt-4">
          Al cruzar esta sección, el fondo cambiará permanentemente hasta regresar a la Sección 1.
        </p>
      </div>

      {/* Sección 3 - Mantiene el fondo cambiado */}
      <div
        id="section3"
        ref={thirdSectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-blue-500/40 backdrop-blur-md text-center text-white"
      >
        <h2 className="text-3xl font-semibold">Sección 3</h2>
        <p className="text-lg max-w-xl mt-4">
          Esta sección hereda el fondo de la Sección 2, nunca vuelve al de la Sección 1.
        </p>
      </div>
    </div>
  );
};

export default PageContent;