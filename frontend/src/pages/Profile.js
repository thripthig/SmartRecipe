// frontend/src/pages/Profile.js
import React from 'react';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center px-4">
        <div className="text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 transform hover:scale-105 transition-transform duration-500">
            <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🔒</span>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
              Profile Access
            </h1>
            <p className="text-gray-600 text-lg">Please log in to view your profile.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl border-4 border-white transform hover:scale-105 transition-transform duration-500">
              <span className="text-5xl text-white">👨‍🍳</span>
            </div>
            {/* Floating decoration */}
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
            Your Profile
          </h1>
          <p className="text-gray-600 text-lg">Welcome back, master chef! 🎉</p>
        </div>

        {/* Profile Card */}
        <div className="grid lg:grid-cols-2 gap-8">
          
          {/* Main Profile Info */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-orange-500 rounded-full mr-3"></span>
              Personal Information
            </h2>
            
            <div className="space-y-6">
              {/* Username Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center">
                  <span className="mr-2">👤</span>
                  Username
                </label>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border-2 border-orange-100 group-hover:border-orange-300 transition-all duration-300 transform hover:scale-105">
                  <p className="text-xl font-bold text-gray-800">{user.username}</p>
                </div>
              </div>

              {/* Email Field */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center">
                  <span className="mr-2">📧</span>
                  Email Address
                </label>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border-2 border-orange-100 group-hover:border-orange-300 transition-all duration-300 transform hover:scale-105">
                  <p className="text-xl font-bold text-gray-800">{user.email}</p>
                </div>
              </div>

              {/* Member Since */}
              <div className="group">
                <label className="block text-sm font-semibold text-gray-600 mb-2 flex items-center">
                  <span className="mr-2">⭐</span>
                  Member Since
                </label>
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-2xl border-2 border-orange-100 group-hover:border-orange-300 transition-all duration-300 transform hover:scale-105">
                  <p className="text-xl font-bold text-gray-800">
                    {new Date().toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <span className="w-2 h-8 bg-green-500 rounded-full mr-3"></span>
              Cooking Journey
            </h2>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center p-6 bg-orange-50 rounded-2xl border-2 border-orange-200 transform hover:scale-105 transition-all duration-300 hover:border-orange-400">
                <div className="text-3xl font-bold text-orange-600 mb-2">12</div>
                <div className="text-sm font-semibold text-gray-700">Recipes Created</div>
                <div className="text-xs text-gray-500 mt-1">🥘 Master Chef</div>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-2xl border-2 border-green-200 transform hover:scale-105 transition-all duration-300 hover:border-green-400">
                <div className="text-3xl font-bold text-green-600 mb-2">24</div>
                <div className="text-sm font-semibold text-gray-700">Recipes Cooked</div>
                <div className="text-xs text-gray-500 mt-1">🔥 Kitchen Pro</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-6 bg-blue-50 rounded-2xl border-2 border-blue-200 transform hover:scale-105 transition-all duration-300 hover:border-blue-400">
                <div className="text-3xl font-bold text-blue-600 mb-2">8</div>
                <div className="text-sm font-semibold text-gray-700">Favorites</div>
                <div className="text-xs text-gray-500 mt-1">❤️ Loved Dishes</div>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-2xl border-2 border-purple-200 transform hover:scale-105 transition-all duration-300 hover:border-purple-400">
                <div className="text-3xl font-bold text-purple-600 mb-2">15</div>
                <div className="text-sm font-semibold text-gray-700">Reviews</div>
                <div className="text-xs text-gray-500 mt-1">⭐ Food Critic</div>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <span className="w-2 h-8 bg-yellow-500 rounded-full mr-3"></span>
            Your Achievements
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl border-2 border-yellow-200 transform hover:scale-110 transition-all duration-300">
              <div className="text-3xl mb-2">🏆</div>
              <div className="text-sm font-semibold text-gray-700">First Recipe</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-100 to-emerald-100 rounded-2xl border-2 border-green-200 transform hover:scale-110 transition-all duration-300">
              <div className="text-3xl mb-2">👨‍🍳</div>
              <div className="text-sm font-semibold text-gray-700">Kitchen Star</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl border-2 border-blue-200 transform hover:scale-110 transition-all duration-300">
              <div className="text-3xl mb-2">⚡</div>
              <div className="text-sm font-semibold text-gray-700">Quick Cook</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-purple-100 to-pink-100 rounded-2xl border-2 border-purple-200 transform hover:scale-110 transition-all duration-300">
              <div className="text-3xl mb-2">🎯</div>
              <div className="text-sm font-semibold text-gray-700">Perfect Dish</div>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-transform duration-500">
            <p className="text-black text-lg font-semibold">
              Keep cooking amazing dishes! Your culinary journey is just getting started! 🍳✨
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;