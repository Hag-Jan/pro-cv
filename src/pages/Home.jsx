
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Target, Download, Star, FileText, TrendingUp, Users, Award, Globe, Shield, Zap, Clock, CheckCircle, ChevronRight, Play, Check, ArrowUpRight, ChevronLeft } from "lucide-react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";

// Import the three resume template components
import ModernProfessionalTemplate from "../components/home/ModernProfessionalTemplate";
import CreativePortfolioTemplate from "../components/home/CreativePortfolioTemplate";
import TraditionalProfessionalTemplate from "../components/home/TraditionalProfessionalTemplate";

// Live Counter Component
function LiveCounter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration, inView]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// Resume Templates Carousel Component
function ResumeTemplatesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const templates = [
    {
      id: 'modern-professional',
      name: 'Modern Professional',
      component: ModernProfessionalTemplate,
      description: 'Perfect for product managers and tech professionals'
    },
    {
      id: 'creative-portfolio',
      name: 'Creative Portfolio',
      component: CreativePortfolioTemplate,
      description: 'Stand out with a bold, visual design'
    },
    {
      id: 'traditional',
      name: 'Traditional Professional',
      component: TraditionalProfessionalTemplate,
      description: 'Classic format for corporate roles'
    }
  ];

  const CurrentTemplate = templates[currentIndex].component;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % templates.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + templates.length) % templates.length);
  };

  // Auto-advance carousel every 4 seconds with smooth transitions
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000); // Changed from 5000 to 4000ms (4 seconds)

    return () => clearInterval(interval);
  }, [currentIndex]); // Include currentIndex to restart timer after manual navigation

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="relative perspective-1000"
    >
      {/* Main 3D Card Container */}
      <motion.div
        animate={{ 
          y: [-20, 20, -20],
          rotateX: [0, 2, 0],
          rotateY: [0, -3, 0]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        style={{
          transformStyle: "preserve-3d",
          perspective: "1000px"
        }}
        className="relative w-[380px] h-[520px]"
      >
        {/* 3D Shadow layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2.5rem] blur-3xl transform translate-y-8 scale-95" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-[2.5rem] blur-2xl transform translate-y-4 scale-97" />
        
        {/* Main Card with Resume Template */}
        <div className="relative w-full h-full rounded-[2.5rem] shadow-2xl overflow-hidden transform-gpu">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-sm" />
          
          {/* Resume Template Content - Miniature Preview */}
          <div className="relative w-full h-full overflow-hidden rounded-[2.5rem] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ 
                  duration: 0.6, 
                  ease: [0.25, 0.1, 0.25, 1.0],
                  opacity: { duration: 0.5 }
                }}
                className="w-full h-full flex items-center justify-center"
              >
                <div 
                  className="bg-white shadow-lg rounded-lg"
                  style={{ 
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <div style={{
                    width: '222%',
                    height: '222%',
                    transform: 'scale(0.45)',
                    transformOrigin: 'center center',
                    imageRendering: 'crisp-edges',
                    backfaceVisibility: 'hidden',
                    WebkitFontSmoothing: 'antialiased'
                  }}>
                    <CurrentTemplate />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 z-10"
            aria-label="Previous template"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/95 hover:bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-200 hover:scale-110 z-10"
            aria-label="Next template"
          >
            <ChevronRight className="w-5 h-5 text-gray-900" />
          </button>

          {/* Dots Indicator with Smooth Transitions */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {templates.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all duration-300 ease-out ${
                  idx === currentIndex 
                    ? 'bg-white w-8 shadow-lg' 
                    : 'bg-white/50 w-2 hover:bg-white/75'
                }`}
                aria-label={`Go to template ${idx + 1}`}
              />
            ))}
          </div>

          {/* Template Name Badge with Smooth Fade */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, y: -15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                transition={{ 
                  duration: 0.4, 
                  ease: [0.25, 0.1, 0.25, 1.0]
                }}
                className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200"
              >
                <p className="text-xs font-bold text-gray-900">{templates[currentIndex].name}</p>
                <p className="text-[10px] text-gray-600">{templates[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [-20, -60, -20],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0, 1, 0],
            scale: [0, 1, 0]
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeInOut"
          }}
          className="absolute w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-purple-400"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + Math.sin(i) * 30}%`
          }}
        />
      ))}
    </motion.div>
  );
}

// Enhanced Testimonial Carousel with Auto-play
function PremiumTestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Software Engineer",
      company: "Google",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
      text: "Landed my dream job at Google in 3 weeks. The AI suggestions were incredibly accurate and saved me hours of work!",
      rating: 5,
      highlight: "3 weeks"
    },
    {
      name: "Michael Rodriguez",
      role: "Product Manager",
      company: "Meta",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      text: "Got 3x more interviews after using ResumeCraft. The ATS optimization really works - I'm now at Meta!",
      rating: 5,
      highlight: "3x interviews"
    },
    {
      name: "Priya Sharma",
      role: "Data Scientist",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "From 0 responses to 5 interviews in 2 weeks. Absolutely game-changing platform that delivers real results!",
      rating: 5,
      highlight: "5 interviews"
    }, // Corrected: Added missing comma here
    {
      name: "MIAAAAAAA",
      role: "HR",
      company: "Microsoft",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      text: "From 0 responses to 4 interviews in 2 weeks. Absolutely game-changing platform that delivers real results!",
      rating: 5,
      highlight: "5 interviews"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative max-w-5xl mx-auto">
      <div className="relative h-80 overflow-hidden">
        <AnimatePresence mode="wait">
          {testimonials.map((testimonial, index) => (
            current === index && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: -100, scale: 0.95 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0"
              >
                <div className="relative bg-gradient-to-br from-white to-blue-50/50 rounded-3xl p-10 shadow-2xl border border-blue-100/50 backdrop-blur-sm overflow-hidden">
                  {/* Decorative gradient */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
                  
                  <div className="relative flex flex-col md:flex-row items-start gap-8">
                    {/* Avatar with gradient border */}
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-md" />
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="relative w-24 h-24 rounded-2xl object-cover ring-4 ring-white shadow-xl"
                      />
                      {/* Company logo placeholder */}
                      <div className="absolute -bottom-3 -right-3 w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Award className="w-6 h-6 text-white" />
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      {/* Rating */}
                      <div className="flex gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: i * 0.1, type: "spring" }}
                          >
                            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Testimonial text */}
                      <p className="text-xl md:text-2xl text-slate-800 leading-relaxed font-medium">
                        "{testimonial.text}"
                      </p>
                      
                      {/* Highlight badge */}
                      <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full shadow-lg">
                        <Zap className="w-4 h-4" />
                        <span className="font-bold text-sm">{testimonial.highlight}</span>
                      </div>
                      
                      {/* Author info */}
                      <div className="pt-4 border-t border-slate-200">
                        <p className="font-bold text-lg text-slate-900">{testimonial.name}</p>
                        <p className="text-slate-600 font-medium">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
      
      {/* Navigation dots with progress */}
      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className="relative group"
          >
            <div className={`transition-all duration-300 rounded-full ${
              current === index 
                ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg' 
                : 'w-3 h-3 bg-slate-300 hover:bg-slate-400 hover:scale-125'
            }`}>
              {current === index && (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 6, ease: "linear" }}
                  className="h-full bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"
                />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// Enhanced Timeline Step with connecting lines
function PremiumTimelineStep({ step, index, isLast }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative"
    >
      <div className="flex items-center gap-8">
        {/* Icon with badge */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className="relative flex-shrink-0 z-10"
        >
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50" />
          
          {/* Icon container */}
          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
            <step.icon className="w-10 h-10 text-white drop-shadow-lg" />
          </div>
          
          {/* Step number badge */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span className="text-white font-black text-sm">{index + 1}</span>
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div
          whileHover={{ scale: 1.02, y: -4 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex-1 bg-gradient-to-br from-white to-blue-50/50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-blue-100/50 group cursor-pointer relative overflow-hidden"
        >
          {/* Decorative gradient */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          
          <div className="relative">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-6xl font-black text-slate-100">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
              {step.title}
            </h3>
            <p className="text-slate-600 leading-relaxed text-lg">
              {step.description}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-10 top-24 z-0">
          <motion.div
            initial={{ height: 0 }}
            animate={inView ? { height: "100%" } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
            className="w-1 h-24 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full relative"
          >
            {/* Animated dots on line */}
            <motion.div
              animate={{ y: [0, 96, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              className="absolute w-3 h-3 bg-white rounded-full shadow-lg border-2 border-blue-500"
              style={{ left: "-4px" }}
            />
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  const steps = [
    {
      icon: FileText,
      title: "Choose Your Template",
      description: "Pick from 40+ ATS-optimized templates designed by hiring experts and recruiters"
    },
    {
      icon: Sparkles,
      title: "AI Writes Your Content",
      description: "Our AI generates compelling, keyword-rich bullet points tailored to your industry"
    },
    {
      icon: Download,
      title: "Download & Apply",
      description: "Export as PDF and start applying immediately. Land interviews 2x faster"
    }
  ];

  return (
    <div className="min-h-screen bg-white transition-colors duration-300 overflow-x-hidden">

      {/* Hero Section - Enhanced with animated gradient background */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
              'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0"
        />

        {/* Floating gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 100, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -80, 0],
            y: [0, 80, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, delay: 5 }}
          className="absolute bottom-20 right-20 w-[500px] h-[500px] bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl opacity-30"
        />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="container mx-auto max-w-7xl relative z-10 py-20"
        >
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-10 text-center lg:text-left"
            >
              {/* Badge */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 px-5 py-2.5 rounded-full border border-blue-200 backdrop-blur-sm shadow-lg"
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AI-Powered Resume Builder
                </span>
              </motion.div>

              {/* Main Headline with gradient text */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.05] text-slate-900 tracking-tight"
              >
                Get Hired
                <motion.span
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                  className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent bg-[length:200%_auto]"
                  style={{ WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  2x Faster
                </motion.span>
                <span className="block text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mt-2">
                  with AI Resumes
                </span>
              </motion.h1>

              {/* Sub-headline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl sm:text-2xl text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0"
              >
                AI-optimized resumes that beat ATS systems. Join{' '}
                <span className="font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <LiveCounter end={52000} />+
                </span>{' '}
                professionals who landed their dream jobs.
              </motion.p>

              {/* Live Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-6"
              >
                {[
                  { icon: Target, value: 98, suffix: '%', label: 'ATS Pass', gradient: 'from-green-500 to-emerald-500' },
                  { icon: Clock, value: 2, suffix: ' min', label: 'Setup', gradient: 'from-blue-500 to-cyan-500' },
                  { icon: TrendingUp, value: 94, suffix: '%', label: 'Success', gradient: 'from-purple-500 to-pink-500' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-20 rounded-2xl blur-xl group-hover:opacity-40 transition-opacity`} />
                    <div className="relative bg-white/80 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-slate-200 group-hover:border-slate-300 transition-all">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-md`}>
                          <stat.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-3xl font-black text-slate-900">
                            <LiveCounter end={stat.value} />{stat.suffix}
                          </div>
                          <div className="text-xs text-slate-600 font-bold uppercase tracking-wide">
                            {stat.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTAs with gradient backgrounds */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start pt-6"
              >
                <Link to={createPageUrl("Templates")}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                    
                    <Button
                      size="lg"
                      className="relative w-full sm:w-auto bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-12 py-8 rounded-2xl text-xl font-black shadow-2xl transition-all"
                    >
                      <Play className="w-6 h-6 mr-2 group-hover:scale-125 transition-transform" />
                      Start Building Free
                      <ArrowRight className="w-6 h-6 ml-2 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>

                <Link to={createPageUrl("Jobs")}>
                  <motion.div
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="w-full sm:w-auto border-2 border-slate-300 hover:border-blue-500 px-12 py-8 rounded-2xl text-xl font-bold bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-lg hover:shadow-xl"
                    >
                      <Sparkles className="w-6 h-6 mr-2" />
                      Browse AI-Matched Jobs
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="flex flex-wrap items-center justify-center lg:justify-start gap-8 pt-8 text-sm text-slate-600"
              >
                {[
                  { icon: CheckCircle, text: "No Credit Card" },
                  { icon: Shield, text: "GDPR Compliant" },
                  { icon: Zap, text: "Free Forever" }
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className="flex items-center gap-2 font-bold"
                  >
                    <item.icon className="w-5 h-5 text-green-600" />
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right - Resume Templates Carousel */}
            <div className="flex items-center justify-center">
              <ResumeTemplatesCarousel />
            </div>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 hidden lg:block"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 border-3 border-slate-400 rounded-full p-2 flex items-start justify-center shadow-lg"
          >
            <div className="w-2 h-4 bg-gradient-to-b from-blue-600 to-purple-600 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Logos */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white border-y border-slate-200">
        <div className="container mx-auto px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-sm font-bold text-slate-500 mb-12 tracking-wider uppercase"
          >
            Trusted by professionals at
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
            className="flex flex-wrap items-center justify-center gap-16 opacity-60"
          >
            {["Google", "Meta", "Amazon", "Microsoft", "Apple", "Netflix"].map((company, index) => (
              <motion.div
                key={company}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ opacity: 1, scale: 1.1, y: -4 }}
                className="text-3xl font-black text-slate-700 cursor-pointer transition-all"
              >
                {company}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works - Enhanced Timeline with connecting lines */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-24"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-5 py-2 rounded-full border border-blue-200 mb-6"
            >
              <Zap className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-bold text-blue-600">Quick & Easy</span>
            </motion.div>
            
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-8">
              Build Your Resume in{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                3 Simple Steps
              </span>
            </h2>
            <p className="text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              From zero to interview-ready in minutes. No experience required.
            </p>
          </motion.div>

          <div className="space-y-16">
            {steps.map((step, index) => (
              <PremiumTimelineStep 
                key={index} 
                step={step} 
                index={index}
                isLast={index === steps.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials - Enhanced with auto-play carousel */}
      <section className="py-32 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 px-5 py-2 rounded-full border border-green-200 mb-6"
            >
              <Star className="w-5 h-5 text-green-600 fill-green-600" />
              <span className="text-sm font-bold text-green-600">Real Success Stories</span>
            </motion.div>

            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-8">
              Loved by{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                <LiveCounter end={52000} />+
              </span>{' '}
              Job Seekers
            </h2>
            <p className="text-2xl text-slate-600 max-w-2xl mx-auto">
              Real success stories from real people who transformed their careers
            </p>
          </motion.div>

          <PremiumTestimonialCarousel />

          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-16"
          >
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="w-8 h-8 fill-yellow-400 text-yellow-400 drop-shadow-sm" />
              ))}
            </div>
            <div className="text-center sm:text-left">
              <span className="text-3xl font-black text-slate-900">4.9/5</span>
              <span className="text-slate-600 text-lg ml-2">from 12,000+ reviews</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA - Premium Glassmorphism */}
      <section className="relative py-32 overflow-hidden">
        {/* Animated gradient background */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(147, 51, 234, 0.15) 100%)',
              'linear-gradient(135deg, rgba(147, 51, 234, 0.15) 0%, rgba(236, 72, 153, 0.15) 100%)',
              'linear-gradient(135deg, rgba(236, 72, 153, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)'
            ]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute inset-0"
        />
        
        {/* Backdrop blur */}
        <div className="absolute inset-0 backdrop-blur-3xl" />

        {/* Animated gradient orbs */}
        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.6, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ duration: 15, repeat: Infinity, delay: 3 }}
          className="absolute bottom-0 right-1/4 w-[700px] h-[700px] bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl"
        />

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            {/* Glassmorphic card */}
            <div className="bg-white/60 backdrop-blur-2xl rounded-3xl p-16 shadow-2xl border border-white/80">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 mb-8 leading-tight">
                Ready to 2x Your Interview Rate?
              </h2>
              <p className="text-2xl text-slate-700 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                Join 52,000+ professionals who landed their dream jobs. Start building your winning resume today—completely free.
              </p>

              <Link to={createPageUrl("Templates")}>
                <motion.div
                  whileHover={{ scale: 1.05, y: -6 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-block relative group"
                >
                  {/* Multiple glow layers */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-2xl opacity-60 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-opacity" />
                  
                  <Button
                    size="lg"
                    className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-16 py-10 rounded-2xl text-2xl font-black shadow-2xl transition-all"
                  >
                    <Sparkles className="w-8 h-8 mr-3 group-hover:rotate-12 transition-transform" />
                    <span>Create Your Resume Now</span>
                    <ArrowRight className="w-8 h-8 ml-3 group-hover:translate-x-3 transition-transform" />
                  </Button>
                </motion.div>
              </Link>

              <div className="flex flex-wrap items-center justify-center gap-10 mt-10 text-base text-slate-600 font-bold">
                {[
                  { icon: CheckCircle, text: "Free Forever" },
                  { icon: CheckCircle, text: "No Credit Card" },
                  { icon: CheckCircle, text: "2 Min Setup" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <item.icon className="w-6 h-6 text-green-600" />
                    <span>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile Sticky CTA */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-xl border-t border-slate-200 shadow-2xl z-50"
      >
        <Link to={createPageUrl("Templates")}>
          <Button
            size="lg"
            className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white py-7 rounded-2xl text-lg font-black shadow-xl"
          >
            <Play className="w-5 h-5 mr-2" />
            Start Building Free
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  );
}
