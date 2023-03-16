import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://strapi.cleverland.by',
  headers: {
    Accept: 'application/json',
  },
});

instance.defaults.headers.common['Content-Type'] = 'application/json';

instance.interceptors.request.use(
  (config) => {
    const newConfig = config;
    const token = localStorage.getItem('jwt');

    newConfig.headers.Authorization = `Bearer ${token}`;

    return newConfig;
  },
  (error) => Promise.reject(error)
);

export const libraryAPI = {
  fetchCategories: async () => {
    const response = await instance.get('/api/categories', { crossdomain: true });

    return response;
  },
  fetchBooks: async () => {
    const response = await instance.get('/api/books', { crossdomain: true });

    return response;
  },

  fetchBookById: async (bookId) => {
    const response = await instance.get(`/api/books/${bookId}`, { crossdomain: true });

    return response;
  },

  register: async (user) => {
    const response = await instance.post('/api/auth/local/register', {
      email: user.email,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });

    return response;
  },

  signIn: async (user) => {
    const response = await axios.post(
      '/api/auth/local',
      {
        identifier: user.username,
        password: user.password,
      },
      { crossdomain: true }
    );

    return response;
  },

  forgotPassword: async (email) => {
    const response = await instance.post('/api/auth/forgot-password', { email });

    return response;
  },
};
