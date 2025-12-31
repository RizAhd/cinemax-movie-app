export const TMDB_CONFIGC = {
  BASE_URL: 'https://api.themoviedb.org/3',
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query?: string }) => {
  if (!TMDB_CONFIGC.API_KEY) {
    throw new Error('TMDB API Key is missing. Check your environment variables.');
  }

  const endpoint = query
    ? `/search/movie?query=${encodeURIComponent(query)}`
    : `/discover/movie?sort_by=popularity.desc`;

  const response = await fetch(TMDB_CONFIGC.BASE_URL + endpoint, {
    method: 'GET',
    headers: TMDB_CONFIGC.headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch movies: ${response.statusText}`);
  }

  const data = await response.json().catch(() => ({ results: [] }));

  return data.results;
};

export const fetchMovieDetails = async (movieId: string) : Promise<MovieDetails> =>{
    try {

const response = await fetch(`${TMDB_CONFIGC.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIGC.API_KEY}`, {
method:'GET',
headers: TMDB_CONFIGC.headers,


});
if(!response.ok) throw new Error('Failed to fetch Movues');


const data = await response.json();

return data;

        
    } catch (error) {
        console.log(error);
        throw error
    }
}