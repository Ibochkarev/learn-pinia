import { defineStore } from 'pinia';
import { useMovieStore } from './MovieStore';
const url =
  "https:api.themoviedb.org/3/search/movie?api_key=2afeed1dc5767bb60631c00ec1b53ecc&query=";

export const useSearchStore = defineStore("searchStore", {
  state: () => ({
    loader: false,
    movies: [],
  }),
  actions: {
    async getMovies(search) {
      this.loader = true;
      const res = await fetch(`${url}${search}`);
      const data = await res.json();
      this.movies = data.results;
      this.loader = false;
    },
    addToUserMovies(object) {
      const movieStore = useMovieStore();
      movieStore.movies.push({...object , isWatched: true});
      movieStore.activeTab = 1;
    }
  },
});