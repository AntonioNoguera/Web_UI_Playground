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
  const blueSectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("BLUE SECTION TRIGGERED");
          setVideoSrc("/video2.mp4"); // Cambia el video cuando esta sección aparece
        }
      },
      {
        root: null,
        threshold: 0.6, // Detecta cuando al menos el 60% de la sección está visible
      }
    );

    if (blueSectionRef.current) {
      observer.observe(blueSectionRef.current);
    }

    return () => {
      if (blueSectionRef.current) {
        observer.unobserve(blueSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="relative z-0">
      {/* Video de fondo dinámico */}
      <BackgroundVideo videoSrc={videoSrc} />

      {/* Primera sección - Contenido sobre el video */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white/40 backdrop-blur-md text-center">
        <h1 className="text-4xl font-bold text-gray-900">Contenido sobre el video</h1>
        <p className="text-lg max-w-xl mt-4 text-gray-700">
          Este contenido pasa sobre el video de fondo.
        </p>
      </div>

      {/* Segunda sección - No cambia el video aquí */}
      <div 
        ref={blueSectionRef}
         className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gray-800 text-center text-white">
        <h2 className="text-3xl font-semibold">Nueva Sección</h2>
        <p className="text-lg max-w-xl mt-4">
          Esta sección aparece cuando sigues haciendo scroll.
        </p>
      </div>

      {/* Sección Azul - Cambia el video cuando se muestra */}
      <div 
        className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-blue-500/40 backdrop-blur-md text-center text-white"
      >
        <h2 className="text-3xl font-semibold">Otra Sección</h2>
        <p className="text-lg max-w-xl mt-4">
          Esto confirma que el contenido sigue fluyendo sobre el video.
        </p>
      </div>
    </div>
  );
};

export default PageContent;