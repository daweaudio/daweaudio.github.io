import axios from 'axios';

// API基础URL
const API_BASE_URL = 'http://localhost:5500/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器 - 自动添加认证token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器 - 处理认证错误
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token过期或无效，清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // 可以在这里触发登录页面跳转
    }
    return Promise.reject(error);
  }
);

// 认证API服务
export const authAPI = {
  // 用户注册
  register: async (userData) => {
    try {
      const response = await api.post('/users/register', userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
        errors: error.response?.data?.errors || []
      };
    }
  },

  // 用户登录
  login: async (credentials) => {
    try {
      const response = await api.post('/users/login', credentials);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed',
        errors: error.response?.data?.errors || []
      };
    }
  },

  // 获取用户资料
  getProfile: async () => {
    try {
      const response = await api.get('/users/profile');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to get profile',
        errors: error.response?.data?.errors || []
      };
    }
  },

  // 更新用户资料
  updateProfile: async (userData) => {
    try {
      const response = await api.put('/users/profile', userData);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile',
        errors: error.response?.data?.errors || []
      };
    }
  },

  // 检查API健康状态
  healthCheck: async () => {
    try {
      const response = await axios.get('http://localhost:5500/health');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        message: 'Backend server is not running'
      };
    }
  }
};

// 认证工具函数
export const authUtils = {
  // 保存认证信息到本地存储
  saveAuth: (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  },

  // 从本地存储获取认证信息
  getAuth: () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return {
      token,
      user: user ? JSON.parse(user) : null
    };
  },

  // 清除认证信息
  clearAuth: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  // 检查用户是否已登录
  isAuthenticated: () => {
    const token = localStorage.getItem('token');
    return !!token;
  },

  // 获取当前用户信息
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
};

export default api;