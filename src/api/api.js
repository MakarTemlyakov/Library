import axios from 'axios';

export const libraryAPI = {
  fetchCategories: async () => {
    let data;

    try {
      const response = await axios.get('https://strapi.cleverland.by/api/categories', { crossdomain: true });

      data = response.data;
    } catch (error) {
      console.log(error);
    }

    return data;
  },
  fetchBooks: async () => {
    let data;

    try {
      const response = await axios.get('https://strapi.cleverland.by/api/books', { crossdomain: true });

      data = response.data;
    } catch (error) {
      console.log(error);
    }

    return data;
  },

  fetchBookById: async (bookId) => {
    let data;

    try {
      const response = await axios.get(`https://strapi.cleverland.by/api/books/${bookId}`, { crossdomain: true });

      data = response.data;
    } catch (error) {
      console.log(error);
    }

    return data;
  },
};
