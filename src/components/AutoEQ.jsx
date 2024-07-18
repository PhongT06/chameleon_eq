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

// const eqPresets = {
//    pop: { subBass: 2, bass: 0, midrange: 3, treble: 1 },
//    rock: { subBass: 3, bass: 0, midrange: -2, treble: 4 },
//    electronic: { subBass: 5, bass: -1, midrange: -3, treble: 2 },
//    classical: { subBass: -2, bass: 1, midrange: 2, treble: 0 },
//    'hip-hop': { subBass: 4, bass: 2, midrange: -1, treble: 1 },
//    dance: { subBass: 4, bass: 1, midrange: -2, treble: 3 },
//    soul: { subBass: 1, bass: 2, midrange: 3, treble: 0 },
//    alternative: { subBass: 2, bass: 1, midrange: 0, treble: 2 },
//    latin: { subBass: 1, bass: 3, midrange: 2, treble: 1 },
//    film: { subBass: 0, bass: 1, midrange: 2, treble: 1 },
//    country: { subBass: 0, bass: 1, midrange: 2, treble: 2 },
//    worldwide: { subBass: 3, bass: 1, midrange: 2, treble: 1 },
//    reggae: { subBass: 3, bass: 2, midrange: -1, treble: 0 },
//    house: { subBass: 4, bass: 0, midrange: -2, treble: 3 },
//    'k-pop': { subBass: 2, bass: 1, midrange: 2, treble: 3 }
// };

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
         // Web Audio API code commented out due to CORS issues
         // Uncomment and implement proper CORS handling to apply EQ
      }
   }, [eqSettings, audioRef, currentGenre]);

   if (!currentGenre || !eqSettings) {
      return <div>Loading EQ settings...</div>;
   }

   // return (
   //    <div className="auto-eq">
   //       <h3>Auto EQ</h3>
   //       <p>Detected Genre: {currentGenre}</p>
   //       <div>
   //          <p>Sub Bass (60Hz): {eqSettings.subBass} dB</p>
   //          <p>Bass (250Hz): {eqSettings.bass} dB</p>
   //          <p>Midrange (1kHz): {eqSettings.midrange} dB</p>
   //          <p>Treble (8kHz): {eqSettings.treble} dB</p>
   //       </div>
   //    </div>
   // );
};

export default AutoEQ;