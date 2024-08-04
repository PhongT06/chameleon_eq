import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const baseQuery = fetchBaseQuery({
   baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
   prepareHeaders: (headers) => {
      headers.set('x-rapidapi-key', '4b3436b0a0msh33ca227beaf7c4dp1dabbdjsn6e0609d95187');
      headers.set('x-rapidapi-host', 'shazam-core.p.rapidapi.com');
      return headers;
   },
});

const baseQueryWithRetry = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions);
   let retries = 0;
   while (result.error && result.error.status === 429 && retries < 5) {
     const delay = Math.pow(2, retries) * 1000;
      await new Promise((resolve) => setTimeout(resolve, delay));
      retries++;
      result = await baseQuery(args, api, extraOptions);
   }
   return result;
};



export const shazamCoreApi = createApi({
   reducerPath: 'shazamCoreApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'https://shazam-core.p.rapidapi.com',
      prepareHeaders: (headers) => {
         headers.set('x-rapidapi-key', '4b3436b0a0msh33ca227beaf7c4dp1dabbdjsn6e0609d95187');
         headers.set('X-RapidAPI-Host', 'shazam-core.p.rapidapi.com');
         return headers;
      },
   }),
   endpoints: (builder) => ({
      getTopCharts: builder.query({ query: () => '/v1/charts/world?country_code=US', keepUnusedDataFor: 3600, }),
      getSongsByGenre: builder.query({ 
         query: (genre) => `/v1/charts/genre-world?genre_code=${genre || 'POP'}&country_code=US`,
         keepUnusedDataFor: 3600,
         extraOptions: {
            maxRetries: 3,
            backoff: (attemptIndex) => Math.pow(2, attemptIndex) * 1000, }
      }),
      getSongDetails: builder.query({ query: (songid) => `/v1/tracks/details?track_id=${songid}`, keepUnusedDataFor: 3600, }),
      getSongRelated: builder.query({ query: (songid) => `/v1/tracks/related?track_id=${songid}` }),
      getArtistDetails: builder.query({ query: (artistId) => `/v2/artists/details?artist_id=${artistId}` }),
      getSongsByCountry: builder.query({ query: (countryCode) => `/v1/charts/country?country_code=${countryCode}` }),
      getSongsBySearch: builder.query({ 
         query: (searchTerm) => `/v1/search/multi?query=${encodeURIComponent(searchTerm)}&search_type=SONGS_ARTISTS&offset=0` 
      }),
   }),
});

export const {
   useGetTopChartsQuery,
   useGetSongDetailsQuery,
   useGetSongRelatedQuery,
   useGetArtistDetailsQuery,
   useGetSongsByCountryQuery,
   useGetSongsByGenreQuery,
   useGetSongsBySearchQuery,
} = shazamCoreApi;