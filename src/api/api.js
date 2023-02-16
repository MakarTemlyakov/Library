export const libraryAPI = {
  fetchCategories: async () => {
    let data;

    try {
      const response = await fetch('https://strapi.cleverland.by/api/categories', { mode: 'cors' });

      data = await response.json();

      return data;
    } catch (error) {
      console.log(error);
    }

    return data;
  },
};
