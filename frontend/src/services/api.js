// frontend/src/services/api.js
import axios from 'axios';
import { handleApiError } from '../utils/apiHelpers';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.token = null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }

  async request(method, endpoint, data = null) {
    try {
      const config = {
        method,
        url: `${API_BASE_URL}${endpoint}`,
        data
      };

      const response = await axios(config);
      return response.data;
    } catch (error) {
      const errorMessage = handleApiError(error);
      throw new Error(errorMessage);
    }
  }

  // Auth endpoints
  async login(email, password) {
    return this.request('post', '/auth/login', { email, password });
  }

  async register(userData) {
    return this.request('post', '/auth/register', userData);
  }

  // Recipe endpoints
  async generateRecipe(ingredients, inputType = 'text') {
    return this.request('post', '/generate/recipe', { ingredients, inputType });
  }

  async getMyRecipes() {
    return this.request('get', '/recipes/my-recipes');
  }

  async saveRecipe(recipeData) {
    return this.request('post', '/recipes', recipeData);
  }

  async updateRecipe(id, recipeData) {
    return this.request('put', `/recipes/${id}`, recipeData);
  }

  async deleteRecipe(id) {
    return this.request('delete', `/recipes/${id}`);
  }
}

export const authService = new ApiService();