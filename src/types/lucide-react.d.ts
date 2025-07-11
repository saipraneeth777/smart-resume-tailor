declare module 'lucide-react' {
  import React from 'react';
  
  export interface LucideProps {
    size?: string | number;
    color?: string;
    strokeWidth?: string | number;
    className?: string;
  }
  
  export const Upload: React.FC<LucideProps>;
  export const FileText: React.FC<LucideProps>;
  export const Sparkles: React.FC<LucideProps>;
  export const Download: React.FC<LucideProps>;
  export const ArrowRight: React.FC<LucideProps>;
  export const X: React.FC<LucideProps>;
  export const RefreshCw: React.FC<LucideProps>;
  export const CheckCircle: React.FC<LucideProps>;
  export const Cog: React.FC<LucideProps>;
  export const Check: React.FC<LucideProps>;
  export const ChevronDown: React.FC<LucideProps>;
  export const ChevronRight: React.FC<LucideProps>;
  export const Circle: React.FC<LucideProps>;
  export const Loader2: React.FC<LucideProps>;
  export const Mail: React.FC<LucideProps>;
  export const Copy: React.FC<LucideProps>;
  export const RotateCcw: React.FC<LucideProps>;
  export const ExternalLink: React.FC<LucideProps>;
  export const Eye: React.FC<LucideProps>;
}