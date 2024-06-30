import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
      getTrackDetails: builder.query({ query: (trackId) => `/v1/tracks/details?track_id=${trackId}`, keepUnusedDataFor: 3600, }),
      getSongRelated: builder.query({ query: (trackId) => `/v1/tracks/related?track_id=${trackId}` }),
      getArtistDetails: builder.query({ query: (artistId) => `/v2/artists/details?artist_id=${artistId}` }),
      getSongsByCountry: builder.query({ query: (countryCode) => `/v1/charts/country?country_code=${countryCode}` }),
      getSongsBySearch: builder.query({ query: (searchTerm) => `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`}),
   }),
});

export const {
   useGetTopChartsQuery,
   useGetTrackDetailsQuery,
   useGetSongRelatedQuery,
   useGetArtistDetailsQuery,
   useGetSongsByCountryQuery,
   useGetSongsByGenreQuery,
   useGetSongsBySearchQuery,
} = shazamCoreApi;