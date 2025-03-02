"use client";

import { useEffect, useState, useRef } from "react";
import "./../styles/styles.css";

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
  const [isSection2Active, setIsSection2Active] = useState(false);

  const firstSectionRef = useRef<HTMLDivElement | null>(null);
  const secondSectionRef = useRef<HTMLDivElement | null>(null);

  // Observador para detectar la sección 2 (puente)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Sección 2 activa");
          setIsSection2Active(true);
          setVideoSrc("/video2.mp4"); // Cambia el fondo al pasar por la sección 2
        }
      },
      { root: null, threshold: 0.6 } // Detecta cuando al menos el 60% de la sección 2 está visible
    );

    if (secondSectionRef.current) {
      observer.observe(secondSectionRef.current);
    }

    return () => {
      if (secondSectionRef.current) {
        observer.unobserve(secondSectionRef.current);
      }
    };
  }, []);

  // Observador para detectar cuando la sección 1 vuelve a entrar
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("Sección 1 activa de nuevo");
          setIsSection2Active(false);
          setVideoSrc("/video.mp4"); // Regresa al fondo original
        }
      },
      { root: null, threshold: 0.6 }
    );

    if (firstSectionRef.current) {
      observer.observe(firstSectionRef.current);
    }

    return () => {
      if (firstSectionRef.current) {
        observer.unobserve(firstSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="relative z-0">
      {/* Video de fondo dinámico */}
      <BackgroundVideo videoSrc={videoSrc} />

      {/* Primera sección - Contenido sobre el video */}
      <div
        ref={firstSectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white/40 backdrop-blur-md text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900">Sección 1</h1>
        <p className="text-lg max-w-xl mt-4 text-gray-700">
          Este contenido pasa sobre el video de fondo.
        </p>
      </div>

      {/* Segunda sección - Puente que cambia el video */}
      <div
        ref={secondSectionRef}
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gray-800/20 text-center text-white"
      >
        <h2 className="text-3xl font-semibold">Sección 2 (Puente)</h2>
        <p className="text-lg max-w-xl mt-4">
          Al pasar por esta sección, el fondo cambia.
        </p>
      </div>

      {/* Sección 3 - Mantiene el último video */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-blue-500/40 backdrop-blur-md text-center text-white">
        <h2 className="text-3xl font-semibold">Sección 3</h2>
        <p className="text-lg max-w-xl mt-4">
          Esta sección mantiene el fondo de la sección 2.
        </p>
      </div>
    </div>
  );
};

export default PageContent;