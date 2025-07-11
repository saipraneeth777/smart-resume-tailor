'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, ExternalLink, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SimpleResultsProps {
  tailoredLatex: string;
  stats?: {
    originalLength: number;
    tailoredLength: number;
    processingTime: number;
  };
  onReset: () => void;
}

export function SimpleResults({ tailoredLatex, stats, onReset }: SimpleResultsProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLatex = async () => {
    try {
      await navigator.clipboard.writeText(tailoredLatex);
      setCopySuccess(true);
      
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy LaTeX:', error);
    }
  };

  const handleOpenInOverleaf = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://www.overleaf.com/docs';
    form.target = '_blank';
    form.style.display = 'none';
    
    const snippetInput = document.createElement('input');
    snippetInput.type = 'hidden';
    snippetInput.name = 'snip';
    snippetInput.value = tailoredLatex;
    form.appendChild(snippetInput);
    
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Success Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-400" />
        </motion.div>
        <h2 className="text-3xl font-bold mb-4">✨ Your Resume Has Been Tailored!</h2>
        <p className="text-muted-foreground">
          Your resume has been optimized for the job description using AI.
        </p>
      </div>

      {/* LaTeX Source Code */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Tailored LaTeX Source</h3>
          <div className="flex gap-2">
            <Button
              onClick={handleCopyLatex}
              size="sm"
              variant={copySuccess ? "default" : "outline"}
              className={copySuccess ? "bg-green-600 hover:bg-green-700" : ""}
            >
              {copySuccess ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy LaTeX
                </>
              )}
            </Button>
            <Button
              onClick={handleOpenInOverleaf}
              size="sm"
              className="bg-green-600 hover:bg-green-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open in Overleaf
            </Button>
          </div>
        </div>
        
        <textarea
          value={tailoredLatex}
          readOnly
          className="w-full h-96 p-4 bg-black/20 border border-white/20 rounded-lg font-mono text-sm text-white resize-none"
          placeholder="LaTeX code will appear here..."
        />
        
        {stats && (
          <div className="mt-4 p-4 bg-white/5 rounded-lg">
            <h4 className="text-sm font-semibold mb-2">Processing Statistics</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div>
                <span className="block">Original Length:</span>
                <span className="text-white font-mono">{stats.originalLength.toLocaleString()} chars</span>
              </div>
              <div>
                <span className="block">Tailored Length:</span>
                <span className="text-white font-mono">{stats.tailoredLength.toLocaleString()} chars</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons and Instructions */}
      <div className="space-y-6">
        <div className="glass rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
          <div className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-blue-400 text-xs font-bold">1</span>
              </div>
              <div>
                <strong>Copy the LaTeX code</strong> above and paste it into your preferred LaTeX editor.
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-green-400 text-xs font-bold">2</span>
              </div>
              <div>
                <strong>Use &quot;Open in Overleaf&quot;</strong> to edit and compile your resume online. 
                Overleaf will automatically wrap your code if needed and let you download it as a PDF.
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-purple-400 text-xs font-bold">3</span>
              </div>
              <div>
                <strong>Review and customize</strong> the generated content to ensure it matches your experience 
                and preferences before submitting.
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button onClick={onReset} size="lg" variant="outline">
            Process Another Resume
          </Button>
        </div>
      </div>
    </motion.div>
  );
}