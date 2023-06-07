import axios from 'axios';

const baseUrl = 'https://library-cleverland-2jfze.ondigitalocean.app';

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');

    if (token) {
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        },
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const libraryAPI = {
  fetchCategories: async () => {
    const response = await instance.get('/api/categories');

    return response;
  },

  resetPassword: async (credentials) => {
    const response = await instance.post('/api/auth/reset-password', {
      password: credentials.password,
      passwordConfirmation: credentials.passwordConfirmation,
      code: credentials.code,
    });

    return response;
  },

  fetchBooks: async () => {
    let response = null;

    try {
      response = await instance.get('/api/books');
    } catch (error) {
      console.log(error);
    }

    return response;
  },

  fetchBookById: async (bookId) => {
    let response = null;

    try {
      response = await instance.get(`/api/books/${bookId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log(error);
    }

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
    const response = await instance.post('/api/auth/local', {
      identifier: user.username,
      password: user.password,
    });

    return response;
  },

  forgotPassword: async (email) => {
    let response = null;

    try {
      response = await instance.post('/api/auth/forgot-password', email);
    } catch (error) {
      console.log(error);
    }

    return response;
  },

  bookingBook: async (data) => {
    const response = await instance.post('/api/bookings', { data });

    return response;
  },
};
