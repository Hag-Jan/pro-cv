import React, { useState } from "react";
import { motion } from "framer-motion";
import { Target, CheckCircle2, TrendingUp, Award } from "lucide-react";

export default function ModernBadge({ 
  label,
  value,
  icon: Icon = Target,
  color = "#2563EB",
  tooltip,
  index = 0
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.05, y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="relative inline-flex items-center gap-2 px-4 py-2 rounded-2xl cursor-pointer"
      style={{
        background: 'white',
        border: `1.5px solid ${color}30`,
        boxShadow: isHovered 
          ? `0 4px 16px ${color}25, 0 0 0 3px ${color}10`
          : `0 2px 8px ${color}15`
      }}
    >
      {/* Animated Background Pulse */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{ background: `${color}10` }}
        animate={{
          scale: isHovered ? [1, 1.02, 1] : 1,
          opacity: isHovered ? [0.5, 0.8, 0.5] : 0
        }}
        transition={{
          duration: 1.5,
          repeat: isHovered ? Infinity : 0,
          ease: "easeInOut"
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex items-center gap-2">
        <motion.div
          animate={{
            rotate: isHovered ? [0, -10, 10, -10, 0] : 0
          }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-4 h-4" style={{ color }} />
        </motion.div>
        
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold" style={{ color }}>
            {value}
          </span>
          {label && (
            <span className="text-xs text-gray-600 font-medium">
              {label}
            </span>
          )}
        </div>
      </div>

      {/* Tooltip */}
      {isHovered && tooltip && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg whitespace-nowrap z-20"
          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
        >
          {tooltip}
          <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
        </motion.div>
      )}
    </motion.div>
  );
}