import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Target, TrendingUp, RefreshCw, CheckCircle2, Sparkles } from "lucide-react";

export default function ModernScoreCard({ 
  score, 
  title = "ATS Score", 
  subtitle = "Optimization",
  icon: Icon = Target,
  showLiveIndicator = true,
  showCelebration = true,
  color = "#2563EB"
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showCelebration && score >= 95) {
      const timer = setTimeout(() => setShowConfetti(true), 500);
      const hideTimer = setTimeout(() => setShowConfetti(false), 2500);
      return () => {
        clearTimeout(timer);
        clearTimeout(hideTimer);
      };
    }
  }, [score, showCelebration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative"
    >
      {/* Blueprint Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none rounded-[20px] overflow-hidden">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Main Card */}
      <div 
        className="relative rounded-[20px] p-6 transition-all duration-300"
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.98) 100%)',
          boxShadow: isHovered 
            ? '0 12px 48px rgba(37,99,235,0.12), 0 2px 8px rgba(0,0,0,0.06)'
            : '0 8px 36px rgba(37,99,235,0.08), 0 1.5px 6px rgba(0,0,0,0.04)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(37,99,235,0.1)'
        }}
      >
        {/* Glassmorphism Highlight */}
        <div 
          className="absolute top-0 left-0 right-0 h-[40%] rounded-t-[20px] pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)',
            filter: 'blur(8px)'
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Header with Icon and Live Indicator */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <motion.div 
                className="w-12 h-12 rounded-2xl flex items-center justify-center"
                style={{ 
                  background: `linear-gradient(135deg, ${color}20 0%, ${color}10 100%)`,
                  border: `1.5px solid ${color}30`
                }}
                animate={{
                  boxShadow: isHovered 
                    ? [`0 0 0 0 ${color}40`, `0 0 0 8px ${color}00`]
                    : '0 0 0 0 rgba(0,0,0,0)'
                }}
                transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
              >
                <Icon className="w-6 h-6" style={{ color }} />
              </motion.div>
              <div>
                <h3 className="font-bold text-sm" style={{ color: '#1F2937' }}>
                  {title}
                </h3>
                <p className="text-xs text-gray-500">{subtitle}</p>
              </div>
            </div>

            {/* Live Indicator */}
            {showLiveIndicator && (
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="cursor-pointer"
                title="Real-time score"
              >
                <RefreshCw 
                  className="w-4 h-4 text-gray-400 hover:text-blue-600 transition-colors" 
                  aria-label="Refresh score"
                />
              </motion.div>
            )}
          </div>

          {/* Score Display */}
          <motion.div 
            className="mb-4"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <div className="flex items-baseline gap-2">
              <span 
                className="text-5xl font-bold tracking-tight"
                style={{ color }}
              >
                {score}
              </span>
              <span className="text-2xl font-semibold text-gray-400">%</span>
            </div>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-4">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full relative"
              style={{ 
                background: `linear-gradient(90deg, ${color} 0%, ${color}dd 100%)`
              }}
            >
              {/* Shimmer Effect */}
              <motion.div
                className="absolute inset-0 w-full h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                }}
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </div>

          {/* Status Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl"
            style={{
              background: 'white',
              border: `1.5px solid ${color}30`,
              boxShadow: `0 2px 8px ${color}15`
            }}
          >
            <TrendingUp className="w-4 h-4" style={{ color }} />
            <span className="text-sm font-semibold" style={{ color }}>
              {score >= 95 ? 'Excellent' : score >= 80 ? 'Great' : score >= 60 ? 'Good' : 'Needs Work'}
            </span>
            {score >= 95 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <CheckCircle2 className="w-4 h-4 text-green-500" />
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Confetti for High Scores */}
        {showConfetti && score >= 95 && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[20px]">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: ['#2563EB', '#8B5CF6', '#F59E0B', '#10B981'][i % 4],
                  left: `${Math.random() * 100}%`,
                  top: '-10%'
                }}
                animate={{
                  y: ['0%', '120%'],
                  x: [0, (Math.random() - 0.5) * 100],
                  rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
                  opacity: [1, 0]
                }}
                transition={{
                  duration: 2 + Math.random(),
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
              />
            ))}
          </div>
        )}

        {/* Tooltip on Hover */}
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20"
            style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
          >
            {score >= 95 
              ? 'Outstanding! Your resume is highly optimized.'
              : score >= 80 
              ? 'Great job! Keep refining for even better results.'
              : score >= 60
              ? 'Good start! Consider adding more keywords.'
              : 'Needs improvement. Focus on relevant skills and experience.'}
            <div 
              className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"
            />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}