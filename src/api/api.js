import axios from 'axios';

export const libraryAPI = {
  fetchCategories: async () => {
    const response = await axios.get('https://strapi.cleverland.by/api/categories', { crossdomain: true });

    return response;
  },
  fetchBooks: async () => {
    const response = await axios.get('https://strapi.cleverland.by/api/books', { crossdomain: true });

    return response;
  },

  fetchBookById: async (bookId) => {
    const response = axios.get(`https://strapi.cleverland.by/api/books/${bookId}`, { crossdomain: true });

    return response;
  },

  register: async (user) => {
    console.log({ user1: user });
    const response = axios.post('https://strapi.cleverland.by/api/auth/local/register', {
      email: user.email,
      username: user.username,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
    });

    console.log(response);

    return response;
  },
};
