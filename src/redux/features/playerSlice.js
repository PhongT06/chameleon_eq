import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentSongs: [],
  currentIndex: 0,
  isActive: false,
  isPlaying: false,
  // activeSong: {},
  activeSong: { title: '' },
  genreListId: '',
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    // setActiveSong: (state, action) => {
    //   console.log('setActiveSong action received:', action.payload);
    //   state.activeSong = action.payload.song;

    //   if (action.payload?.data?.tracks?.hits) {
    //     state.currentSongs = action.payload.data.tracks.hits;
    //   } else if (action.payload?.data?.properties) {
    //     state.currentSongs = action.payload?.data?.tracks;
    //   } else {
    //     state.currentSongs = action.payload.data;
    //   }

    //   state.currentIndex = action.payload.i;
    //   state.isActive = true;
    // },

    setActiveSong: (state, action) => {
      console.log('setActiveSong reducer called');
      console.log('Payload:', action.payload);
      state.activeSong = action.payload.song;
      state.currentSongs = action.payload.data;
      state.currentIndex = action.payload.i;
      state.isActive = true;
      console.log('New state:', JSON.parse(JSON.stringify(state)));
    },

    nextSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    prevSong: (state, action) => {
      if (state.currentSongs[action.payload]?.track) {
        state.activeSong = state.currentSongs[action.payload]?.track;
      } else {
        state.activeSong = state.currentSongs[action.payload];
      }

      state.currentIndex = action.payload;
      state.isActive = true;
    },

    playPause: (state, action) => {
      console.log('playPause action received:', action.payload);
      state.isPlaying = action.payload;
    },

    selectGenreListId: (state, action) => {
      state.genreListId = action.payload;
    },
  },
});

export const { setActiveSong, nextSong, prevSong, playPause, selectGenreListId } = playerSlice.actions;

export default playerSlice.reducer;