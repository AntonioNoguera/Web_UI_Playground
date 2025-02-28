"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const PageContent: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"], // Rango de animación basado en la posición
  });

  // Efecto de desvanecimiento del contenido al pasar sobre el video
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);

  // Desplazamiento del video hacia arriba
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <div className="relative">
      {/* Video de fondo con movimiento */}
      <motion.div
        className="fixed top-0 left-0 w-full h-screen overflow-hidden z-[-1]"
        style={{ y }}
      >
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
      </motion.div>

      {/* Sección de contenido que pasa sobre el video */}
      <motion.div
        ref={ref}
        className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 bg-white"
        style={{ opacity }}
      >
        <h1 className="text-4xl font-bold">Contenido sobre el video</h1>
        <p className="text-lg max-w-xl text-center mt-4">
          Este contenido pasará sobre el video y se desvanecerá al avanzar en el scroll.
        </p>
      </motion.div>

      {/* Nueva sección que aparece después del video */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-10 bg-gray-800 text-white">
        <h2 className="text-3xl font-semibold">Nueva Sección</h2>
        <p className="text-lg max-w-xl text-center mt-4">
          Cuando el contenido anterior desaparezca, esta sección aparecerá.
        </p>
      </div>
    </div>
  );
};

export default PageContent;