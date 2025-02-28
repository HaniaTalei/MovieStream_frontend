

const API_URL = 'http://localhost:3000';

const handleResponse = async (response) => {
  if (!response.ok) {
    console.error(`API Error: ${response.status} ${response.statusText}`);
    
    // اگر پاسخ JSON وجود داشت، پیام خطا را از آن استخراج کنید
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    } catch (e) {
      // اگر پاسخ JSON نبود، خطای ساده را پرتاب کنید
      throw new Error(`HTTP error! status: ${response.status}`);
    }
  }
  
  try {
    return await response.json();
  } catch (error) {
    console.error("Failed to parse JSON response:", error);
    throw new Error("Invalid response format");
  }
};

const api = {
  async get(url, options = {}) {
    try {
      console.log(`Making GET request to: ${API_URL}${url}`);
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(`${API_URL}${url}`, {
        method: 'GET',
        headers,
        ...options
      });

      const data = await handleResponse(response);
      return { data };
    } catch (error) {
      console.error('API Get Error:', error);
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  },

  async post(url, data, options = {}) {
    try {
      console.log(`Making POST request to: ${API_URL}${url}`, data);
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(`${API_URL}${url}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
        ...options
      });

      const responseData = await handleResponse(response);
      return { data: responseData };
    } catch (error) {
      console.error('API Post Error:', error);
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  },
  
  async delete(url, options = {}) {
    try {
      console.log(`Making DELETE request to: ${API_URL}${url}`);
      const token = localStorage.getItem('token');
      const headers = {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
      };

      const response = await fetch(`${API_URL}${url}`, {
        method: 'DELETE',
        headers,
        ...options
      });

      const responseData = await handleResponse(response);
      return { data: responseData };
    } catch (error) {
      console.error('API Delete Error:', error);
      if (error.message.includes('401')) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
      throw error;
    }
  }
};

export default api;