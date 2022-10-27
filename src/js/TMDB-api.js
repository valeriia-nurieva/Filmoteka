const axios = require('axios').default;
const BASE_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '1d9e78535f6a01dcc41594da81e379a7';

// 'https://api.themoviedb.org/3/trending/movie/day?api_key=1d9e78535f6a01dcc41594da81e379a7&adult=false'

export class TmdbApi {

    async getTrendingMovies() {
        const { data } = await axios.get(`${BASE_URL}trending/movie/day?api_key=${API_KEY}&adult=false`);
    return data;
    }
    
}
