// frontend/src/utils/storage.js
const STORAGE_KEYS = {
  TOKEN: 'token',
  USER: 'user',
  RECIPES: 'recipes_cache',
  THEME: 'theme'
};

export const storage = {
  // Token management
  setToken: (token) => {
    localStorage.setItem(STORAGE_KEYS.TOKEN, token);
  },
  
  getToken: () => {
    return localStorage.getItem(STORAGE_KEYS.TOKEN);
  },
  
  removeToken: () => {
    localStorage.removeItem(STORAGE_KEYS.TOKEN);
  },

  // User management
  setUser: (user) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  
  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },

  // Recipes cache
  cacheRecipes: (recipes) => {
    localStorage.setItem(STORAGE_KEYS.RECIPES, JSON.stringify({
      data: recipes,
      timestamp: Date.now()
    }));
  },
  
  getCachedRecipes: () => {
    const cached = localStorage.getItem(STORAGE_KEYS.RECIPES);
    if (!cached) return null;
    
    const { data, timestamp } = JSON.parse(cached);
    // Cache valid for 1 hour
    if (Date.now() - timestamp > 60 * 60 * 1000) {
      localStorage.removeItem(STORAGE_KEYS.RECIPES);
      return null;
    }
    
    return data;
  },

  // Clear all storage
  clearAll: () => {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  }
};