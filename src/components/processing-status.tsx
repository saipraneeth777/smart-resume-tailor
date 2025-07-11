'use client';

import { motion } from 'framer-motion';
import { Sparkles, FileText, Cog, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Analyzing Job Requirements',
    description: 'AI is extracting key requirements from the job description',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 2,
    title: 'Processing Resume Content',
    description: 'Parsing and analyzing your LaTeX resume structure',
    icon: <FileText className="w-6 h-6" />,
  },
  {
    id: 3,
    title: 'Optimizing Content',
    description: 'Tailoring resume content to match job requirements',
    icon: <Cog className="w-6 h-6" />,
  },
  {
    id: 4,
    title: 'Finalizing Results',
    description: 'Preparing your tailored LaTeX code',
    icon: <CheckCircle className="w-6 h-6" />,
  },
];

export function ProcessingStatus() {
  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-8 text-center"
      >
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="w-20 h-20 mx-auto mb-6"
          >
            <div className="w-full h-full rounded-full border-4 border-white/10 border-t-purple-500"></div>
          </motion.div>
          
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </motion.div>
        </div>

        <h2 className="text-2xl font-bold mb-2 text-white">Processing Your Resume</h2>
        <p className="text-muted-foreground mb-8">
          Our AI is analyzing and optimizing your resume for the best results
        </p>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.5, duration: 0.5 }}
              className="flex items-center gap-4 p-4 rounded-xl glass"
            >
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  backgroundColor: [
                    'rgba(168, 85, 247, 0.2)',
                    'rgba(168, 85, 247, 0.4)',
                    'rgba(168, 85, 247, 0.2)'
                  ]
                }}
                transition={{ 
                  delay: index * 0.5,
                  duration: 1.5, 
                  repeat: Infinity 
                }}
                className="w-12 h-12 rounded-full flex items-center justify-center text-purple-400"
              >
                {step.icon}
              </motion.div>
              
              <div className="text-left flex-1">
                <h3 className="font-semibold text-white">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
              
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (index + 1) * 2 }}
                className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center"
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 w-full bg-white/10 rounded-full h-2 overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 8, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
          />
        </div>
        
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm text-muted-foreground mt-4"
        >
          This usually takes 10-30 seconds...
        </motion.p>
      </motion.div>
    </div>
  );
}