"use client";

import { motion } from "framer-motion";

const BackgroundVideo: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-screen overflow-hidden z-[-1]">
      <video
        className="w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/video.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
    </div>
  );
};

const PageContent: React.FC = () => {
  return (
    <div className="relative">
      {/* Video de fondo */}
      <BackgroundVideo />

      {/* Primera sección - Pasa sobre el video */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 bg-white bg-opacity-80 backdrop-blur-sm">
        <h1 className="text-4xl font-bold">Contenido sobre el video</h1>
        <p className="text-lg max-w-xl text-center mt-4">
          Este contenido pasa sobre el video de fondo.
        </p>
      </div>

      {/* Segunda sección - Continúa después del video */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 bg-gray-800 text-white">
        <h2 className="text-3xl font-semibold">Nueva Sección</h2>
        <p className="text-lg max-w-xl text-center mt-4">
          Esta sección aparece cuando sigues haciendo scroll.
        </p>
      </div>

      {/* Otra sección para probar el scroll */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 bg-blue-500 text-white">
        <h2 className="text-3xl font-semibold">Otra Sección</h2>
        <p className="text-lg max-w-xl text-center mt-4">
          Esto confirma que el contenido sigue fluyendo sobre el video.
        </p>
      </div>
    </div>
  );
};

export default PageContent;