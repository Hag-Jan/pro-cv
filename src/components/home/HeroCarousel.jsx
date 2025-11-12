import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Check, ChevronLeft, ChevronRight } from "lucide-react";

// 5 Modern CV Template Previews
const cvTemplates = [
  {
    id: 1,
    name: "Modern Professional",
    color: "from-blue-500 to-indigo-600",
    preview: (
      <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="h-24 bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
          <div className="h-3 w-32 bg-white/90 rounded mb-2"></div>
          <div className="h-2 w-24 bg-white/70 rounded"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-2 w-full bg-gray-200 rounded"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
          <div className="mt-4 space-y-2">
            <div className="h-2 w-2/3 bg-blue-100 rounded"></div>
            <div className="h-2 w-3/4 bg-blue-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 2,
    name: "Elegant Minimal",
    color: "from-purple-500 to-pink-600",
    preview: (
      <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-6 border-b-4 border-purple-500">
          <div className="h-4 w-36 bg-gray-800 rounded mb-2"></div>
          <div className="h-2 w-28 bg-purple-500 rounded"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-purple-100 rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="h-2 w-full bg-gray-200 rounded"></div>
              <div className="h-2 w-4/5 bg-gray-200 rounded"></div>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-purple-100 rounded-full"></div>
            <div className="flex-1 space-y-1">
              <div className="h-2 w-full bg-gray-200 rounded"></div>
              <div className="h-2 w-3/5 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    name: "Creative Bold",
    color: "from-orange-500 to-red-600",
    preview: (
      <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden flex">
        <div className="w-1/3 bg-gradient-to-b from-orange-500 to-red-600 p-3">
          <div className="w-12 h-12 bg-white/90 rounded-full mb-3"></div>
          <div className="space-y-2">
            <div className="h-1.5 w-full bg-white/80 rounded"></div>
            <div className="h-1.5 w-4/5 bg-white/80 rounded"></div>
            <div className="h-1.5 w-3/5 bg-white/80 rounded"></div>
          </div>
        </div>
        <div className="flex-1 p-4 space-y-2">
          <div className="h-3 w-24 bg-orange-500 rounded mb-2"></div>
          <div className="h-2 w-full bg-gray-200 rounded"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  },
  {
    id: 4,
    name: "Tech Developer",
    color: "from-cyan-500 to-blue-600",
    preview: (
      <div className="w-full h-full bg-gray-900 rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 border-l-4 border-cyan-500">
          <div className="h-3 w-32 bg-cyan-400 rounded mb-2"></div>
          <div className="h-2 w-24 bg-gray-400 rounded"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="h-2 w-full bg-gray-700 rounded"></div>
          <div className="h-2 w-5/6 bg-gray-700 rounded"></div>
          <div className="flex gap-2 mt-3">
            <div className="h-6 px-2 bg-cyan-500/20 rounded text-[6px] flex items-center"></div>
            <div className="h-6 px-2 bg-cyan-500/20 rounded text-[6px] flex items-center"></div>
            <div className="h-6 px-2 bg-cyan-500/20 rounded text-[6px] flex items-center"></div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 5,
    name: "Executive Classic",
    color: "from-slate-600 to-slate-800",
    preview: (
      <div className="w-full h-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-4 text-center border-b-2 border-slate-600">
          <div className="h-4 w-36 bg-slate-800 rounded mx-auto mb-2"></div>
          <div className="h-2 w-28 bg-slate-500 rounded mx-auto"></div>
        </div>
        <div className="p-4 space-y-3">
          <div className="text-center">
            <div className="h-2 w-20 bg-slate-600 rounded mx-auto mb-2"></div>
          </div>
          <div className="h-2 w-full bg-gray-200 rounded"></div>
          <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
          <div className="h-2 w-4/6 bg-gray-200 rounded"></div>
          <div className="mt-4 space-y-1">
            <div className="h-1.5 w-full bg-gray-100 rounded"></div>
            <div className="h-1.5 w-5/6 bg-gray-100 rounded"></div>
          </div>
        </div>
      </div>
    )
  }
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  // Auto-rotate carousel every 4 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % cvTemplates.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % cvTemplates.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + cvTemplates.length) % cvTemplates.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -100, 0],
            y: [0, 50, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-12">
            
            {/* LEFT SIDE - CTA Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full border border-blue-200 dark:border-blue-700"
              >
                <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                  AI-Powered Resume Builder
                </span>
              </motion.div>

              {/* Main Headline */}
              <div className="space-y-4">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-tight"
                >
                  Create Your
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                    Perfect Resume
                  </span>
                  in Minutes
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0"
                >
                  Build a professional resume with AI assistance, choose from 40+ templates, and land your dream job 2x faster.
                </motion.p>
              </div>

              {/* Features List */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row items-center gap-4 text-left"
              >
                {[
                  "40+ ATS-Optimized Templates",
                  "AI Content Generation",
                  "Export to PDF Instantly"
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link to={createPageUrl("Templates")}>
                  <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-10 py-7 rounded-2xl text-lg font-bold shadow-lg group"
                    >
                      <Sparkles className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                      Start Building Free
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>

                <Link to={createPageUrl("Dashboard")}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 px-10 py-7 rounded-2xl text-lg font-bold"
                    >
                      View Examples
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Signal */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-sm text-slate-500 dark:text-slate-400"
              >
                ✨ Join 50,000+ professionals who landed their dream jobs
              </motion.p>
            </motion.div>

            {/* RIGHT SIDE - 3D Carousel */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative h-[500px] lg:h-[600px] flex items-center justify-center">
                {/* 3D Carousel Container */}
                <div className="relative w-full max-w-md aspect-[3/4]">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={currentIndex}
                      custom={direction}
                      initial={{
                        rotateY: direction > 0 ? 90 : -90,
                        opacity: 0,
                        scale: 0.8
                      }}
                      animate={{
                        rotateY: 0,
                        opacity: 1,
                        scale: 1
                      }}
                      exit={{
                        rotateY: direction > 0 ? -90 : 90,
                        opacity: 0,
                        scale: 0.8
                      }}
                      transition={{
                        duration: 0.6,
                        ease: "easeInOut"
                      }}
                      style={{
                        perspective: "1000px",
                        transformStyle: "preserve-3d"
                      }}
                      className="absolute inset-0"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.05,
                          rotateY: 5,
                          rotateX: 5,
                          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                        }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full cursor-pointer"
                        style={{
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                          {/* Gradient border effect */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${cvTemplates[currentIndex].color} opacity-20 blur-xl`}></div>
                          
                          {/* Template preview */}
                          <div className="relative w-full h-full bg-white rounded-2xl overflow-hidden">
                            {cvTemplates[currentIndex].preview}
                          </div>

                          {/* Template name badge */}
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                              <p className="text-sm font-bold text-slate-800">
                                {cvTemplates[currentIndex].name}
                              </p>
                              <p className="text-xs text-slate-500">Professional Template</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigation Arrows */}
                <button
                  onClick={goToPrevious}
                  className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform border border-slate-200 dark:border-slate-700 z-10"
                >
                  <ChevronLeft className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform border border-slate-200 dark:border-slate-700 z-10"
                >
                  <ChevronRight className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                  {cvTemplates.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`transition-all duration-300 rounded-full ${
                        currentIndex === index
                          ? 'w-8 h-2 bg-blue-600 dark:bg-blue-500'
                          : 'w-2 h-2 bg-slate-300 dark:bg-slate-600 hover:bg-blue-400 dark:hover:bg-blue-400'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Auto-play indicator */}
              {isAutoPlaying && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute -bottom-20 left-1/2 -translate-x-1/2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2"
                >
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  Auto-rotating templates
                </motion.div>
              )}
            </motion.div>

          </div>
        </div>
      </div>
    </div>
  );
}