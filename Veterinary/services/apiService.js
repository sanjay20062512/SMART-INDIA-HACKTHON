/**
 * Base API Service Layer
 * Supports LocalStorage caching/mock state fallback and dynamic REST backend connection to FastAPI/PostgreSQL.
 */

class ApiService {
  constructor() {
    this.baseUrl = localStorage.getItem('VET_API_BASE_URL') || 'http://localhost:8000/api/v1/vet';
    this.useMock = localStorage.getItem('VET_USE_MOCK') !== 'false'; // Default to true until FastAPI is configured
  }

  setBackendUrl(url) {
    this.baseUrl = url;
    localStorage.setItem('VET_API_BASE_URL', url);
  }

  setUseMock(flag) {
    this.useMock = flag;
    localStorage.setItem('VET_USE_MOCK', flag ? 'true' : 'false');
  }

  // Storage helper for persistence during testing
  getFromStorage(key, defaultData) {
    const stored = localStorage.getItem(key);
    if (!stored) {
      localStorage.setItem(key, JSON.stringify(defaultData));
      return defaultData;
    }
    try {
      return JSON.parse(stored);
    } catch (e) {
      return defaultData;
    }
  }

  saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  async request(endpoint, method = 'GET', body = null) {
    if (this.useMock) {
      throw new Error("Mock mode active. Real backend API call skipped.");
    }
    
    const headers = { 'Content-Type': 'application/json' };
    const options = { method, headers };
    if (body) options.body = JSON.stringify(body);

    const response = await fetch(`${this.baseUrl}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`API error ${response.status}: ${response.statusText}`);
    }
    return await response.json();
  }
}

export const apiService = new ApiService();
