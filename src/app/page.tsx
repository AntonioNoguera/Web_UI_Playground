"use client";

import { motion } from "framer-motion";


import "./../styles/styles.css";

const BackgroundVideo: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-screen overflow-hidden -z-10">
      <video className="w-full h-full object-cover" autoPlay loop muted playsInline>
        <source src="/video.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </div>
  );
};

const PageContent: React.FC = () => {
  return (
    <div className="relative z-0">
      {/* Video de fondo */}
      <BackgroundVideo />

      {/* Primera sección - Contenido sobre el video */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-white/80 backdrop-blur-md text-center">
        <h1 className="text-4xl font-bold text-gray-900">Contenido sobre el video</h1>
        <p className="text-lg max-w-xl mt-4 text-gray-700">
          Este contenido pasa sobre el video de fondo.
        </p>
      </div>

      {/* Segunda sección - Continúa después del video */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-gray-800 text-center text-white">
        <h2 className="text-3xl font-semibold">Nueva Sección</h2>
        <p className="text-lg max-w-xl mt-4">
          Esta sección aparece cuando sigues haciendo scroll.
        </p>
      </div>

      {/* Otra sección para probar el scroll */}
      <div className="relative flex flex-col items-center justify-center min-h-screen px-6 py-10 bg-blue-500 text-center text-white">
        <h2 className="text-3xl font-semibold">Otra Sección</h2>
        <p className="text-lg max-w-xl mt-4">
          Esto confirma que el contenido sigue fluyendo sobre el video.
        </p>
      </div>
    </div>
  );
};

export default PageContent;
