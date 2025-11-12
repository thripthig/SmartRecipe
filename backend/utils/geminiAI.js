// backend/utils/geminiAI.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini client with your API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiRecipeGenerator {
  constructor() {
    // ✅ Use currently supported models
    this.textModel = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
    this.visionModel = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
  }

  async generateRecipeFromText(ingredients) {
    const prompt = `
      Create a detailed recipe using these ingredients: ${ingredients.join(', ')}.
      Also suggest 2–3 additional ingredients that would enhance the recipe.

      Return the response as a JSON object with this exact structure:
      {
        "title": "Recipe title",
        "ingredients": [
          {"name": "ingredient name", "quantity": "amount", "original": true/false},
          ...
        ],
        "instructions": ["step 1", "step 2", ...],
        "preparationTime": 30,
        "nutritionalInfo": {
          "calories": 350,
          "protein": "15g",
          "carbs": "45g",
          "fat": "12g"
        },
        "chefTips": ["tip 1", "tip 2"],
        "suggestedIngredients": ["ingredient1", "ingredient2"]
      }

      For ingredients: mark "original": true for user-provided ingredients, false for suggested ones.
      Keep instructions clear, step-by-step, and creative.
    `;

    try {
      const result = await this.textModel.generateContent(prompt);
      const text = result.response.text();

      // Extract JSON safely
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Invalid response format from Gemini');
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate recipe');
    }
  }

  async generateRecipeFromImage(imageBuffer) {
    const prompt = `
      Identify the ingredients in this image and create a recipe using them.
      Suggest 2–3 additional ingredients that would enhance it.
      Return in the same JSON format as the text version.
    `;

    try {
      const imagePart = {
        inlineData: {
          data: imageBuffer.toString('base64'),
          mimeType: 'image/jpeg',
        },
      };

      const result = await this.visionModel.generateContent([prompt, imagePart]);
      const text = result.response.text();

      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }

      throw new Error('Invalid image response format from Gemini');
    } catch (error) {
      console.error('Gemini Vision API error:', error);
      throw new Error('Failed to generate recipe from image');
    }
  }
}

module.exports = new GeminiRecipeGenerator();
