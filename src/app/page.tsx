"use client";

import { JSX, useState } from "react";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import Image from "next/image";

export default function Playground(): JSX.Element {
  const [isVisible, setIsVisible] = useState(true);
  const [expanded, setExpanded] = useState(false);
  const { scrollYProgress } = useScroll();

  const boxVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: -50 }, // Cambiado para que aparezcan de arriba hacia abajo
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };



  return (

    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 gap-8">
      {/* Barra de Progreso Scroll */}

      <motion.div
        className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md"

        style={{ scaleX: scrollYProgress, background: "purple", height: 10, width: "100%" }}
      />

      {/* Animación de Entrada */}
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Framer Motion Playground
      </motion.h1>

      {/* Hover y Tap */}
      <motion.button
        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        Hover & Click Me
      </motion.button>

      {/* Animación Repetitiva */}
      <motion.div
        className="w-32 h-32 bg-green-500 rounded-lg"
        animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Variants */}
      <motion.div
        className="w-40 h-40 bg-red-500 rounded-lg"
        variants={boxVariants}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5 }}
      >
        Variants Example
      </motion.div>

      {/* Drag */}
      <motion.div
        className="w-20 h-20 bg-yellow-500 rounded-full cursor-move"
        drag
        dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
      />

      {/* Layout Animations */}
      <motion.div layout className="flex flex-col items-center">
        <button
          onClick={() => setExpanded(!expanded)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-md mb-2"
        >
          Toggle Expand
        </button>
        {expanded && (
          <motion.div layout className="bg-indigo-300 p-4 rounded-md">
            Contenido Expandido
          </motion.div>
        )}
      </motion.div>

      {/* AnimatePresence */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="px-4 py-2 bg-teal-500 text-white rounded-md"
      >
        Toggle Visibility
      </button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="w-40 h-20 bg-teal-300 rounded-md mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            ¡Desaparezco suavemente!
          </motion.div>
        )}
      </AnimatePresence>

      <motion.svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M10 80 C 40 10, 65 10, 95 80 S 150 150, 180 80"
          fill="transparent"
          stroke="black"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
      </motion.svg>

      <motion.div
        style={{
          y: scrollYProgress,
          background: "linear-gradient(135deg, #ff9a9e, #fad0c4)",
          height: "300px",
          width: "100%",
        }}
      />

      <motion.div
        className="w-32 h-32 bg-purple-500"
        drag="x"
        dragElastic={0.5}
        onDragEnd={(event, info) => {
          if (info.offset.x > 100) alert("¡Swipe a la derecha!");
        }}
      />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, x: -50 },
          visible: { opacity: 1, x: 0, transition: { delay: 0.5 } },
        }}
      />

      <motion.div layoutId="shared-element" className="w-40 h-40 bg-pink-400" />

      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delayChildren: 0.3, staggerChildren: 0.1 }}
      >
        {["H", "e", "l", "l", "o"].map((char, index) => (
          <motion.span key={index}>{char}</motion.span>
        ))}
      </motion.h1>

      {/* Animación de Texto Compleja */}
      <motion.h1
        className="text-5xl font-extrabold text-center mb-16 bg-gray-100  py-5"
        initial="hidden"
        animate="visible"
      >
        {"Framer Motion".split("").map((char, index) => (
          <motion.span key={index} custom={index} variants={textVariants}>
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.h1>




    </div>
  );
}
