'use client';

import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Upload, X, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  accept: string;
  file: File | null;
  onFileSelect: (file: File | null) => void;
}

export function UploadZone({
  title,
  description,
  icon,
  accept,
  file,
  onFileSelect,
}: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onFileSelect(acceptedFiles[0]);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: accept.split(',').reduce((acc, type) => {
      acc[type.trim()] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 1,
    multiple: false,
  });

  const removeFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFileSelect(null);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div
        {...getRootProps()}
        className={`
          relative h-64 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer
          ${isDragActive && !isDragReject 
            ? 'border-blue-400 bg-blue-500/10 glass-hover' 
            : isDragReject 
            ? 'border-red-400 bg-red-500/10' 
            : file 
            ? 'border-green-400 bg-green-500/10 glass'
            : 'border-white/20 glass glass-hover'
          }
        `}
      >
        <input {...getInputProps()} />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
          {file ? (
            <>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
              >
                <FileText className="w-8 h-8 text-green-400" />
              </motion.div>
              
              <h3 className="text-lg font-semibold mb-2 text-white">{file.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {(file.size / 1024).toFixed(1)} KB
              </p>
              
              <Button
                onClick={removeFile}
                variant="outline"
                size="sm"
                className="glass border-red-400/50 text-red-400 hover:bg-red-500/20"
              >
                <X className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </>
          ) : (
            <>
              <motion.div
                animate={{ 
                  y: isDragActive ? -10 : 0,
                  scale: isDragActive ? 1.1 : 1 
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={`
                  w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors
                  ${isDragActive 
                    ? 'bg-blue-500/30 text-blue-400' 
                    : 'bg-white/10 text-white/60'
                  }
                `}
              >
                {isDragActive ? <Upload className="w-8 h-8" /> : icon}
              </motion.div>
              
              <h3 className="text-lg font-semibold mb-2 text-white">{title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{description}</p>
              
              <div className="text-xs text-muted-foreground">
                {isDragActive ? (
                  <span className="text-blue-400">Drop your file here</span>
                ) : (
                  <span>Drag & drop or click to select</span>
                )}
              </div>
            </>
          )}
        </div>

        {/* Animated border effect */}
        {isDragActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 rounded-2xl border-2 border-blue-400 animate-pulse"
          />
        )}
      </div>
    </motion.div>
  );
}