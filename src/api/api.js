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
};
