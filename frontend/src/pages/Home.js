// frontend/src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100">
      {/* Hero Section */}
      <section className="text-center py-20 px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-orange-800 mb-6">
          Welcome to SmartRecipeAI
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Transform your ingredients into delicious recipes with the power of AI. 
          Just tell us what you have, and we'll create amazing culinary creations!
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/generate"
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 px-8 rounded-full text-lg transition duration-200"
          >
            Generate Recipe Now
          </Link>
          {!user && (
            <Link
              to="/register"
              className="border-2 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white font-bold py-4 px-8 rounded-full text-lg transition duration-200"
            >
              Create Account
            </Link>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            How It Works
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📝</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">1. Input Ingredients</h3>
              <p className="text-gray-600">
                Enter what you have in your kitchen through text or upload an image of your ingredients.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">2. AI Magic</h3>
              <p className="text-gray-600">
                Our advanced AI analyzes your ingredients and creates unique, personalized recipes.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍳</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">3. Cook & Enjoy</h3>
              <p className="text-gray-600">
                Get detailed instructions, cooking times, and nutritional information. Save your favorites!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Cook Something Amazing?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of home chefs who are discovering new recipes every day.
          </p>
          <Link
            to="/generate"
            className="bg-white text-orange-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-full text-lg transition duration-200"
          >
            Start Cooking Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;