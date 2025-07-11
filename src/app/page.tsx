'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { UploadZone } from '@/components/upload-zone';
import { ProcessingStatus } from '@/components/processing-status';
import { SimpleResults } from '@/components/simple-results';

type AppState = 'upload' | 'processing' | 'complete' | 'error';

interface TailoringResult {
  tailoredLatex: string;
  stats?: {
    originalLength: number;
    tailoredLength: number;
    processingTime: number;
  };
}

export default function Home() {
  const [state, setState] = useState<AppState>('upload');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescriptionText, setJobDescriptionText] = useState<string>('');
  const [result, setResult] = useState<TailoringResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleProcess = async () => {
    if (!resumeFile || !jobDescriptionText.trim()) return;

    setState('processing');
    setError(null);

    try {
      const latexContent = await resumeFile.text();
      console.log('📄 Resume file loaded:', {
        fileName: resumeFile.name,
        size: resumeFile.size,
        latexLength: latexContent.length
      });

      console.log('📤 Sending to backend for AI processing...');

      const formData = new FormData();
      formData.append('resume', resumeFile);
      formData.append('jobDescription', jobDescriptionText);

      console.log('📄 Sending to API for AI processing and PDF generation...');
      const response = await fetch('/api/tailor-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to process resume');
      }

      const resultData = await response.json();
      
      console.log('API Response received:', {
        success: resultData.success,
        hasLatex: !!resultData.tailoredLatex,
        latexLength: resultData.tailoredLatex?.length,
        stats: resultData.stats
      });
      
      setResult({
        tailoredLatex: resultData.tailoredLatex,
        stats: resultData.stats
      });
      setState('complete');
    } catch (err) {
      console.error('Processing error:', err);
      setError(err instanceof Error ? err.message : 'An error occurred');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('upload');
    setResumeFile(null);
    setJobDescriptionText('');
    setResult(null);
    setError(null);
  };

// Removed unused functions - functionality moved to enhanced components

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-16 pb-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-sm text-muted-foreground mb-8">
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Optimization
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              <span className="text-gradient">AI Resume</span>
              <br />
              <span className="text-white">Tailoring</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
              Transform your LaTeX resume with intelligent AI analysis. Upload your resume and job description 
              to get a perfectly tailored document that highlights your most relevant skills and experiences.
            </p>
          </motion.div>
        </section>

        {/* Main Content */}
        <section className="container mx-auto px-4 max-w-6xl">
          {state === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <UploadZone
                  title="Upload LaTeX Resume"
                  description="Upload your .tex resume file"
                  icon={<FileText className="w-8 h-8" />}
                  accept=".tex"
                  file={resumeFile}
                  onFileSelect={setResumeFile}
                />
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="glass rounded-2xl p-6 h-64 flex flex-col"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">Job Description</h3>
                      <p className="text-sm text-muted-foreground">Paste the job posting text</p>
                    </div>
                  </div>
                  
                  <textarea
                    value={jobDescriptionText}
                    onChange={(e) => setJobDescriptionText(e.target.value)}
                    placeholder="Paste the complete job description here...

Example:
• Bachelor's degree in Computer Science
• 3+ years experience with React and TypeScript
• Experience with cloud platforms (AWS, GCP)
• Strong problem-solving skills..."
                    className="flex-1 w-full p-3 bg-white/5 border border-white/20 rounded-xl backdrop-blur-sm text-white placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    required
                  />
                  
                  <div className="flex justify-between items-center mt-3 text-xs text-muted-foreground">
                    <span>{jobDescriptionText.length} characters</span>
                    <span className={jobDescriptionText.length < 100 ? 'text-yellow-400' : 'text-green-400'}>
                      {jobDescriptionText.length < 100 ? 'Add more details for better results' : 'Good length!'}
                    </span>
                  </div>
                </motion.div>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  onClick={handleProcess}
                  disabled={!resumeFile || !jobDescriptionText.trim()}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-4 text-lg rounded-xl shadow-2xl transform transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:scale-100"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  AI Tailor My Resume
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <p className="text-sm text-green-400 mt-2">
                  ✅ Gemini AI processing ready
                </p>
              </div>
            </motion.div>
          )}

          {state === 'processing' && <ProcessingStatus />}

          {state === 'complete' && result && (
            <SimpleResults 
              tailoredLatex={result.tailoredLatex}
              stats={result.stats}
              onReset={handleReset}
            />
          )}

          {state === 'error' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center glass rounded-2xl p-8 max-w-md mx-auto"
            >
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-red-400 text-2xl">✕</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Processing Error</h3>
              <p className="text-muted-foreground mb-6">{error}</p>
              <Button onClick={handleReset} variant="outline">
                Try Again
              </Button>
            </motion.div>
          )}
        </section>

        {/* Features Section */}
        {state === 'upload' && (
          <section className="container mx-auto px-4 py-16 mt-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="grid md:grid-cols-3 gap-8"
            >
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">AI-Powered Analysis</h3>
                <p className="text-muted-foreground text-sm">
                  Advanced AI analyzes job requirements and optimizes your resume content
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">LaTeX Support</h3>
                <p className="text-muted-foreground text-sm">
                  Native LaTeX processing maintains your professional formatting
                </p>
              </div>
              
              <div className="glass rounded-2xl p-6 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Download className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
                <p className="text-muted-foreground text-sm">
                  Get your optimized resume in seconds, ready for download
                </p>
              </div>
            </motion.div>
          </section>
        )}
      </div>
    </div>
  );
}