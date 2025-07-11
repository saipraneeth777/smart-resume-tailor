// Simple test for the Gemini API integration
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function testGeminiAPI() {
  try {
    console.log('🧪 Testing Gemini API integration...');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Test with the latest 2.0-flash model
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const testLatex = `\\documentclass{article}
\\begin{document}
\\section{Experience}
Software Engineer at TechCorp (2020-2023)
\\begin{itemize}
\\item Developed web applications
\\item Worked with databases
\\end{itemize}
\\end{document}`;

    const testJobDescription = `We are looking for a Senior Software Engineer with experience in:
- React and TypeScript
- Cloud platforms (AWS, GCP)
- Database design
- Agile methodologies`;

    const prompt = `You are an expert LaTeX resume editor. Tailor this resume for the job:

JOB DESCRIPTION:
${testJobDescription}

LATEX RESUME:
${testLatex}

Return only the optimized LaTeX code:`;

    console.log('📤 Sending test request to Gemini API...');
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('✅ API Response received!');
    console.log('📊 Response stats:', {
      length: text.length,
      hasDocumentClass: text.includes('\\documentclass'),
      hasBeginDocument: text.includes('\\begin{document}'),
      hasEndDocument: text.includes('\\end{document}')
    });
    
    console.log('📄 First 200 characters of response:');
    console.log(text.substring(0, 200) + '...');
    
    if (text.includes('\\documentclass') && text.includes('\\begin{document}') && text.includes('\\end{document}')) {
      console.log('🎉 Test PASSED - Valid LaTeX structure returned!');
    } else {
      console.log('⚠️ Test WARNING - Response may not be valid LaTeX');
    }
    
  } catch (error) {
    console.error('❌ Test FAILED:', error.message);
    
    if (error.message.includes('503')) {
      console.log('💡 Suggestion: This is a temporary overload. Try again in a few minutes.');
    } else if (error.message.includes('404')) {
      console.log('💡 Suggestion: Model not found. Check model name and API version.');
    } else if (error.message.includes('401') || error.message.includes('403')) {
      console.log('💡 Suggestion: Check your API key and billing settings.');
    }
  }
}

// Check if API key is set
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable not set');
  console.log('💡 Please set your API key: export GEMINI_API_KEY=your-key-here');
  process.exit(1);
}

testGeminiAPI();