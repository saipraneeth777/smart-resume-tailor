# Smart Resume Tailor

A modern web application that optimizes LaTeX resumes for specific job descriptions using Google's Gemini API.

🔗 **Live Demo:** [smart-resume-tailor.vercel.app](https://smart-resume-tailor.vercel.app)

## Features

- **LaTeX Resume Upload**: Upload `.tex` resume files via drag-and-drop interface
- **Job Description Analysis**: Paste job descriptions for intelligent content optimization  
- **Smart Tailoring**: Automatically adjusts resume content to match job requirements
- **Copy to Clipboard**: One-click copy of optimized LaTeX code with success feedback
- **Overleaf Integration**: Direct "Open in Overleaf" button for editing and PDF generation
- **Real-time Processing**: Live status updates during optimization
- **Error Handling**: Comprehensive validation and user-friendly error messages

## How It Works

1. **Upload** your LaTeX resume file (`.tex` format)
2. **Paste** the job description you're applying for
3. **Process** - The application analyzes both documents and optimizes your resume
4. **Copy** the tailored LaTeX code or open it directly in Overleaf
5. **Edit** and generate your PDF in Overleaf

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Custom component library with Radix UI primitives
- **Animations**: Framer Motion for smooth interactions
- **Backend**: Next.js API routes
- **External APIs**: Google Generative AI (Gemini)
- **Integration**: Overleaf API for LaTeX editing

## Installation

1. Clone the repository:
```bash
git clone https://github.com/saipraneeth777/smart-resume-tailor.git
cd smart-resume-tailor
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
GEMINI_API_KEY=your-actual-api-key-here
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Setup

### Required Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (get one at [Google AI Studio](https://aistudio.google.com/app/apikey))
- `NEXT_PUBLIC_APP_URL`: Your application URL (for production deployments)

### Optional Environment Variables

- `NODE_ENV`: Set to `production` for production builds
- `GEMINI_MODEL`: Specify which Gemini model to use (defaults to gemini-2.0-flash)

## API Endpoints

### POST `/api/tailor-resume`

Processes uploaded LaTeX files and job descriptions.

**Request:**
- `resume`: LaTeX file (.tex)
- `jobDescription`: Job description text (minimum 50 characters)

**Response:**
```json
{
  "success": true,
  "tailoredLatex": "optimized LaTeX content",
  "stats": {
    "originalLength": 1234,
    "tailoredLength": 1456,
    "processingTime": 1234567890
  }
}
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run format` - Format code with Prettier

### Project Structure

```
src/
├── app/
│   ├── api/tailor-resume/     # API endpoint for processing
│   ├── page.tsx               # Main application page
│   ├── layout.tsx             # Root layout
│   └── globals.css            # Global styles
├── components/
│   ├── simple-results.tsx     # Results display with Overleaf integration
│   ├── processing-status.tsx  # Loading animation
│   ├── upload-zone.tsx        # File upload component
│   └── ui/                    # Reusable UI components
└── lib/
    └── utils.ts               # Utility functions
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The application is built with Next.js and can be deployed to any platform that supports Node.js applications.

## Usage Tips

### For Best Results

- Use properly formatted LaTeX files with clear section structure
- Provide detailed job descriptions (minimum 50 characters)
- Include specific technical requirements in job descriptions
- Review the tailored output before final submission

### Supported LaTeX Formats

- Standard document classes (article, report, book)
- Popular resume templates (moderncv, etc.)
- Custom LaTeX resume formats

## Error Handling

The application includes comprehensive error handling for:

- Invalid file formats (only .tex files accepted)
- Empty or malformed LaTeX content
- Short job descriptions
- API connectivity issues
- Rate limiting and service overload

## Security

- Environment variables are properly configured
- No sensitive data is logged or stored
- API keys are server-side only
- File uploads are validated and sanitized

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
1. Check the GitHub issues page
2. Create a new issue with detailed information
3. Include error messages and steps to reproduce

## Changelog

### Version 1.0.0
- Initial release
- LaTeX resume upload functionality
- Gemini API integration
- Overleaf integration
- Copy to clipboard feature
- Real-time processing status