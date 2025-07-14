'use client';

import { motion } from 'framer-motion';
import { Github, Heart } from 'lucide-react';

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="relative mt-auto border-t border-white/10"
    >
      {/* Glassmorphism background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 backdrop-blur-xl" />
      
      <div className="relative container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left side - Built by */}
          <div className="flex items-center gap-2 text-white/80">
            <span className="text-sm font-medium">Built with</span>
            <Heart className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span className="text-sm font-medium">by</span>
            <span className="text-sm font-semibold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Sai Praneeth
            </span>
          </div>

          {/* Right side - GitHub link */}
          <motion.a
            href="https://github.com/saipraneeth777/smart-resume-tailor"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Github className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
            <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
              View Source
            </span>
          </motion.a>
        </div>

        {/* Bottom text */}
        <div className="mt-4 pt-4 border-t border-white/10 text-center">
          <p className="text-xs text-white/60">
            Transform your resume with AI-powered tailoring • Open Source
          </p>
        </div>
      </div>
      
      {/* Bottom gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />
    </motion.footer>
  );
}