// Script to check available Gemini models
const { GoogleGenerativeAI } = require('@google/generative-ai');

async function checkAvailableModels() {
  try {
    console.log('🔍 Checking available Gemini models...');
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Try to list models - this method might not be available in all SDK versions
    try {
      const models = await genAI.listModels();
      console.log('📋 Available models:');
      
      models.forEach((model, index) => {
        console.log(`${index + 1}. ${model.name}`);
        if (model.supportedGenerationMethods) {
          console.log(`   Supported methods: ${model.supportedGenerationMethods.join(', ')}`);
        }
        console.log('   ---');
      });
      
    } catch (listError) {
      console.log('⚠️ listModels() not available in SDK. Testing common model names instead...');
      
      // Test common model names including 2.0 variants
      const commonModels = [
        'gemini-2.0-flash',
        'gemini-2.0-flash-001',
        'gemini-1.5-flash',
        'gemini-1.5-flash-001',
        'gemini-1.5-pro',
        'gemini-1.5-pro-001',
        'gemini-pro',
        'gemini-1.0-pro',
        'gemini-1.0-pro-001',
        'gemini-flash',
        'models/gemini-2.0-flash',
        'models/gemini-2.0-flash-001',
        'models/gemini-1.5-flash',
        'models/gemini-1.5-pro',
        'models/gemini-pro',
        'models/gemini-1.0-pro'
      ];
      
      console.log('🧪 Testing common model names...');
      
      for (const modelName of commonModels) {
        try {
          const model = genAI.getGenerativeModel({ model: modelName });
          const result = await model.generateContent('Test prompt');
          console.log(`✅ ${modelName} - WORKING`);
        } catch (error) {
          if (error.message.includes('404')) {
            console.log(`❌ ${modelName} - NOT FOUND (404)`);
          } else if (error.message.includes('503')) {
            console.log(`⏳ ${modelName} - OVERLOADED (503) but exists`);
          } else {
            console.log(`⚠️ ${modelName} - ERROR: ${error.message.substring(0, 100)}...`);
          }
        }
      }
    }
    
  } catch (error) {
    console.error('❌ Failed to check models:', error.message);
    process.exit(1);
  }
}

// Check if API key is set
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY environment variable not set');
  console.log('💡 Please set your API key: export GEMINI_API_KEY=your-key-here');
  process.exit(1);
}

checkAvailableModels();