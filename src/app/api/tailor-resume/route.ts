import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const SUPPORTED_MODELS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
  'models/gemini-2.0-flash',
  'models/gemini-1.5-flash'
];

interface TailoringPrompt {
  jobDescription: string;
  latexContent: string;
}

const createTailoringPrompt = ({ jobDescription, latexContent }: TailoringPrompt): string => {
  return `You are an expert LaTeX resume editor and ATS optimization specialist. Analyze the job description and modify ONLY specific sections of the LaTeX resume to better match the job requirements.

CRITICAL RULES:
- Return ONLY clean LaTeX code without any comments, explanations, or Overleaf messages
- Do NOT wrap the output in code blocks (no \`\`\`latex or \`\`\`)
- Do NOT add any comment blocks starting with % 
- Do NOT add any welcome messages, editing instructions, or metadata comments
- Do NOT change document structure, packages, or formatting commands
- ONLY modify: work experience bullet points, project descriptions, skills ordering/emphasis
- Ensure the LaTeX compiles correctly without errors
- Start directly with \\documentclass and end with \\end{document}

PRESERVE EXACTLY:
- All \\documentclass, \\usepackage, and document structure
- Name, contact information, education, dates, company names
- All LaTeX formatting commands and syntax
- Document class and package declarations

MODIFY STRATEGICALLY:
- Work experience bullet points to emphasize relevant skills and technologies
- Project descriptions to highlight applicable technologies and outcomes
- Skills section ordering to prioritize job-relevant skills
- Technical keywords to match job requirements
- Achievement descriptions to align with job responsibilities

JOB DESCRIPTION TO MATCH:
${jobDescription}

LATEX RESUME TO OPTIMIZE:
${latexContent}

Return ONLY the optimized LaTeX code starting with \\documentclass:`;
};


const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const cleanLatexResponse = (text: string): string => {
  let cleaned = text.trim();
  
  cleaned = cleaned.replace(/^```latex\s*/i, '');
  cleaned = cleaned.replace(/^```\s*/, '');
  cleaned = cleaned.replace(/\s*```\s*$/, '');
  
  cleaned = cleaned.trim();
  
  return cleaned;
};

async function generateTailoredResume(jobDescription: string, latexContent: string): Promise<string> {
  let lastError: Error | null = null;

  for (const modelName of SUPPORTED_MODELS) {
    console.log(`🤖 Attempting to use model: ${modelName}`);
    
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        if (attempt > 1) {
          const waitTime = Math.pow(2, attempt - 1) * 1000;
          console.log(`⏳ Retry attempt ${attempt} for ${modelName} after ${waitTime}ms delay...`);
          await delay(waitTime);
        }
        
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = createTailoringPrompt({ jobDescription, latexContent });
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const rawText = response.text();
        
        if (!rawText) {
          throw new Error('Empty response from AI model');
        }
        
        const text = cleanLatexResponse(rawText);
        
        if (!text.includes('\\documentclass') && !text.includes('\\begin{document}')) {
          throw new Error('Response does not appear to be valid LaTeX');
        }
        
        if (!text.includes('\\end{document}')) {
          throw new Error('LaTeX document is missing \\end{document}');
        }
        
        console.log(`✅ Successfully generated tailored resume using ${modelName} (attempt ${attempt})`);
        console.log('📊 Generated LaTeX stats:', {
          length: text.length,
          hasDocumentClass: text.includes('\\documentclass'),
          hasBeginDocument: text.includes('\\begin{document}'),
          hasEndDocument: text.includes('\\end{document}'),
          modelUsed: modelName,
          attempt
        });
        
        return text.trim();
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error(`❌ Error with model ${modelName} (attempt ${attempt}):`, errorMessage);
        
        if (errorMessage.includes('503') || errorMessage.includes('overloaded') || errorMessage.includes('Service Unavailable')) {
          console.log(`🔄 Model ${modelName} is overloaded, will retry...`);
          lastError = error instanceof Error ? error : new Error(errorMessage);
          
          if (attempt === 3) {
            console.log(`⚠️ Model ${modelName} failed after 3 attempts, trying next model...`);
            break;
          }
          continue;
        }
        
        console.log(`💥 Non-retryable error for ${modelName}, moving to next model...`);
        lastError = error instanceof Error ? error : new Error(errorMessage);
        break;
      }
    }
  }
  
  throw new Error(`All AI models failed after retries. Last error: ${lastError?.message || 'Unknown error'}`);
}

export async function POST(request: NextRequest) {
  try {
    console.log('🚀 Processing resume tailoring request...');
    
    const formData = await request.formData();
    const resumeFile = formData.get('resume') as File;
    const jobDescription = formData.get('jobDescription') as string;

    if (!resumeFile || !jobDescription) {
      return NextResponse.json(
        { 
          error: 'Missing required data',
          details: 'Both resume file and job description text are required'
        },
        { status: 400 }
      );
    }

    if (!resumeFile.name.endsWith('.tex')) {
      return NextResponse.json(
        { 
          error: 'Invalid resume file type',
          details: 'Resume file must be a .tex file'
        },
        { status: 400 }
      );
    }

    if (typeof jobDescription !== 'string' || jobDescription.trim().length < 50) {
      return NextResponse.json(
        { 
          error: 'Invalid job description',
          details: 'Job description must be at least 50 characters long'
        },
        { status: 400 }
      );
    }

    const latexContent = await resumeFile.text();

    if (!latexContent.trim()) {
      return NextResponse.json(
        { 
          error: 'Empty resume file',
          details: 'The LaTeX resume file appears to be empty'
        },
        { status: 400 }
      );
    }

    if (!latexContent.includes('\\documentclass')) {
      return NextResponse.json(
        { 
          error: 'Invalid LaTeX file',
          details: 'The uploaded file does not appear to be a valid LaTeX document (missing \\documentclass)'
        },
        { status: 400 }
      );
    }

    console.log('📊 Input validation successful:', {
      resumeFileName: resumeFile.name,
      resumeSize: resumeFile.size,
      latexLength: latexContent.length,
      jobDescriptionLength: jobDescription.length,
      hasDocumentClass: latexContent.includes('\\documentclass'),
      hasBeginDocument: latexContent.includes('\\begin{document}'),
      hasEndDocument: latexContent.includes('\\end{document}')
    });

    console.log('🤖 Starting AI processing with Gemini...');
    const tailoredLatex = await generateTailoredResume(jobDescription.trim(), latexContent);
    console.log('✅ AI processing completed successfully');
    
    const stats = {
      originalLength: latexContent.length,
      tailoredLength: tailoredLatex.length,
      jobDescriptionLength: jobDescription.length,
      processingTime: Date.now()
    };
    
    console.log('🎉 Processing completed successfully:', stats);

    return NextResponse.json({
      success: true,
      tailoredLatex,
      stats
    }, { status: 200 });

  } catch (error) {
    console.error('❌ Resume tailoring error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        error: 'Resume tailoring failed',
        details: errorMessage,
        suggestions: [
          'Check that your LaTeX file is valid and properly formatted',
          'Ensure the job description contains sufficient detail',
          'Try again with a shorter resume or job description',
          'Contact support if the issue persists'
        ]
      },
      { status: 500 }
    );
  }
}