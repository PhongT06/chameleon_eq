import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { eqPresets } from './eqPresets';

// Improved genre detection function
const detectGenre = (song) => {
  // Check if the song object has a 'genre' property
   if (song && song.attributes && song.attributes.genreNames && song.attributes.genreNames.length > 0) {
      return song.attributes.genreNames[0].toLowerCase();
   }
   
   // Fallback to a default genre if we can't detect it
   console.warn('Unable to detect genre, falling back to "pop"');
   return 'pop';
};

const AutoEQ = ({ audioRef }) => {
   const { activeSong } = useSelector((state) => state.player);
   const [currentGenre, setCurrentGenre] = useState(null);
   const [eqSettings, setEqSettings] = useState(null);

   useEffect(() => {
      if (activeSong) {
         const detectedGenre = detectGenre(activeSong);
         setCurrentGenre(detectedGenre);
         setEqSettings(eqPresets[detectedGenre] || eqPresets.pop);
      }
   }, [activeSong]);

   useEffect(() => {
      if (audioRef.current && eqSettings) {
         console.log('EQ settings for genre:', currentGenre, eqSettings);
      }
   }, [eqSettings, audioRef, currentGenre]);

   if (!currentGenre || !eqSettings) {
      return <div>Loading EQ settings...</div>;
   }
};

export default AutoEQ;