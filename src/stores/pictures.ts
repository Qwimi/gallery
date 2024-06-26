import { defineStore } from 'pinia';
import axios from 'axios';
import type { IAuthor, ILocation, IPicture, UsingPicure } from './type';

export const usePictureStore = defineStore('pictures', {
  state: () => ({
    pictures: [] as UsingPicure[],
    authors: [] as IAuthor[],
    locations: [] as ILocation[],
    pages: 0,
    queryLink: ''
  }),
  actions: {
    async getPictures(page: number) {
      try {
        const response = await axios.get(
          `https://test-front.framework.team/paintings?${this.queryLink}&_page=${page}&_limit=6`
        );
        this.pictures = await Promise.all(
          response.data.map(async (elem: IPicture) => {
            const { authorId, locationId, ...rest } = elem;
            const author = await this.getAuthorById(authorId);
            const location = await this.getLocationById(locationId);
            return {
              ...rest,
              author: author,
              location: location
            };
          })
        );
        this.getPages();
      } catch (e) {
        console.error(e);
      }
    },

    getAuthorById(id: number) {
      return axios.get('https://test-front.framework.team/authors').then((response) => {
        const author = response.data.find((element: IAuthor) => element.id == id);
        return author.name;
      });
    },

    getLocationById(id: number) {
      return axios.get('https://test-front.framework.team/locations').then((response) => {
        const location = response.data.find((element: ILocation) => element.id == id);
        return location.location;
      });
    },

    async getAllAuthors() {
      try {
        const response = await axios.get('https://test-front.framework.team/authors');
        this.authors = response.data;
      } catch (e) {
        console.error(e);
      }
    },

    async getAllLocations() {
      try {
        const response = await axios.get('https://test-front.framework.team/locations');
        this.locations = response.data;
      } catch (e) {
        console.error(e);
      }
    },

    async getPages() {
      const pictures = await axios.get(
        `https://test-front.framework.team/paintings?${this.queryLink}`
      );
      this.pages = Math.ceil(pictures.data.length / 6);
    },

    getFilteredPictures(filters: {
      q: string;
      authorId: number;
      locationId: number;
      created_gte: string;
      created_lte: string;
    }) {
      const queryParams = [];
      for (const key in filters) {
        if (Object.prototype.hasOwnProperty.call(filters, key)) {
          const value = filters[key as keyof typeof filters];
          if (value !== 0 && value !== '' && value !== undefined) {
            queryParams.push(`${key}=${value}`);
          }
        }
      }
      this.queryLink = queryParams.join('&');
    }
  }
});
