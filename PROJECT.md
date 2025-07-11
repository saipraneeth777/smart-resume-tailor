# Resume Tailoring AI

A Next.js application that uses Google's Gemini AI to tailor LaTeX resumes for specific job descriptions.

## Overview

This application helps job seekers optimize their resumes by analyzing job descriptions and tailoring resume content to highlight the most relevant skills and experiences. Users upload their LaTeX resume file, paste a job description, and receive an AI-optimized LaTeX file that can be edited in Overleaf.

## Features

### ✅ Core Functionality
- **LaTeX Resume Upload**: Upload .tex resume files for processing
- **Job Description Analysis**: Paste job descriptions for AI analysis
- **AI-Powered Tailoring**: Uses Google Gemini 2.0 Flash for intelligent content optimization
- **Clean LaTeX Output**: Returns properly formatted LaTeX code without markdown blocks
- **Copy to Clipboard**: One-click copy with success feedback
- **Overleaf Integration**: Direct "Open in Overleaf" functionality for editing and PDF generation

### ✅ Technical Features
- **Multi-Model Support**: Fallback between Gemini 2.0 Flash and 1.5 Flash
- **Retry Logic**: Handles API overload with exponential backoff
- **Input Validation**: Comprehensive validation for file types and content
- **Error Handling**: User-friendly error messages with suggestions
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode UI**: Modern glassmorphism design

## Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: Custom shadcn/ui components
- **Animations**: Framer Motion
- **AI Integration**: Google Generative AI (Gemini)
- **Deployment**: Vercel-ready

## Project Structure

```
src/
├── app/
│   ├── api/tailor-resume/route.ts    # Main API endpoint
│   ├── layout.tsx                    # Root layout
│   ├── page.tsx                      # Home page
│   ├── globals.css                   # Global styles
│   └── error.tsx, not-found.tsx     # Error pages
├── components/
│   ├── simple-results.tsx            # Results display with Overleaf integration
│   ├── processing-status.tsx         # Loading animation
│   ├── upload-zone.tsx              # File upload component
│   └── ui/                          # Reusable UI components
└── lib/
    └── utils.ts                     # Utility functions
```

## API Endpoints

### POST /api/tailor-resume
Processes LaTeX resume files and job descriptions using Gemini AI.

**Input:**
- `resume`: LaTeX file (.tex)
- `jobDescription`: Job description text

**Output:**
- `tailoredLatex`: Optimized LaTeX code
- `stats`: Processing statistics

## Environment Variables

```bash
GEMINI_API_KEY=your-gemini-api-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

## Installation & Setup

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your Gemini API key

# Run development server
npm run dev

# Build for production
npm run build
npm start
```

## Usage Flow

1. **Upload**: User uploads LaTeX resume file
2. **Describe**: User pastes job description
3. **Process**: AI analyzes and tailors resume content
4. **Copy**: User copies the optimized LaTeX code
5. **Edit**: User opens in Overleaf for final editing and PDF generation

## AI Prompting Strategy

The application uses carefully crafted prompts to ensure:
- Clean LaTeX output without code blocks
- Preservation of document structure and formatting
- Strategic modification of content (experience, skills, projects)
- ATS optimization while maintaining accuracy

## Key Components

### SimpleResults
- Displays tailored LaTeX code
- Copy to clipboard with success feedback
- Overleaf integration via POST form submission
- Processing statistics display

### ProcessingStatus
- Animated loading interface
- Step-by-step progress indication
- Estimated completion time

### UploadZone
- Drag & drop file upload
- File type validation
- Visual feedback for upload status

## Error Handling

- File type validation (must be .tex)
- Content validation (must contain LaTeX structure)
- Job description length validation (minimum 50 characters)
- AI model fallback on failures
- Retry logic for temporary service issues

## Performance Features

- Multiple Gemini model support with automatic fallback
- Exponential backoff retry logic for overloaded services
- Efficient form-based Overleaf integration (no URL length limits)
- Optimized bundle size with tree shaking

## Development Commands

```bash
npm run dev          # Development server
npm run build        # Production build
npm run type-check   # TypeScript validation
npm run lint         # ESLint checking
npm run format       # Code formatting
```

## Deployment

The application is ready for deployment on Vercel or similar platforms. Ensure environment variables are properly configured in the deployment environment.