// backend/models/Recipe.js

// 1. IMPORT MONGOOSE (The crucial step to fix the ReferenceError)
const mongoose = require('mongoose');

// 2. DEFINE THE SCHEMA
const recipeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    ingredients: [{
        name: String,
        quantity: String,
        original: Boolean // true if user provided, false if AI suggested
    }],
    instructions: [{ type: String }],
    preparationTime: { type: Number }, // in minutes
    nutritionalInfo: {
        calories: Number,
        protein: String,
        carbs: String,
        fat: String
    },
    inputType: { type: String, enum: ['text', 'image'] },
    originalIngredients: [String], // user's original input
    chefTips: [String],
    createdAt: { type: Date, default: Date.now }
});

// 3. EXPORT THE MODEL
// This allows you to use the Recipe model in your controllers and routes.
module.exports = mongoose.model('Recipe', recipeSchema);