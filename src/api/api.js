import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/',
  // headers: {
  //   Authorization: `Bearer ${localStorage.getItem('jwt')}`,
  // },
});

instance.interceptors.request.use(
  (config) => {
    instance.headers.Authorization = `Bearer ${localStorage.getItem('jwt')}`;

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export const libraryAPI = {
  fetchCategories: async () => {
    const response = await instance.get('categories', { crossdomain: true });

    return response;
  },
  fetchBooks: async () => {
    const response = await instance.get('books', { crossdomain: true });

    return response;
  },

  fetchBookById: async (bookId) => {
    const response = instance.get(`books/${bookId}`, { crossdomain: true });

    return response;
  },

  register: async (user) => {
    const response = axios.post('https://strapi.cleverland.by/api/auth/local/register', {
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
    console.log({ user });
    const response = axios.post('https://strapi.cleverland.by/api/auth/local', {
      identifier: user.username,
      password: user.password,
    });

    return response;
  },
};
