import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { eqPresets } from './eqPresets';
import EQGraph from './EQGraph';

const EQSidebar = () => {
  const { activeSong } = useSelector((state) => state.player);
  const [eqSettings, setEqSettings] = useState({ subBass: 0, bass: 0, midrange: 0, treble: 0 });
  const [isPresetActive, setIsPresetActive] = useState(true);
  const [currentGenre, setCurrentGenre] = useState('pop');

  const detectGenre = (song) => {
    if (song && song.attributes) {
      if (song.attributes.genreNames && song.attributes.genreNames.length > 0) {
        return song.attributes.genreNames[0].toLowerCase();
      } else if (song.attributes.genre) {
        return song.attributes.genre.toLowerCase();
      }
    }
    return 'pop'; // default genre
  };

  useEffect(() => {
    if (activeSong) {
      const detectedGenre = detectGenre(activeSong);
      setCurrentGenre(detectedGenre);

      const genreMap = {
        'hip-hop': ['hip-hop', 'rap', 'hip hop'],
        'pop': ['pop'],
        'rock': ['rock', 'hard rock'],
        'electronic': ['electronic', 'edm'],
        'classical': ['classical', 'film'],
        'country': ['country'],
        'alternative': ['alternative'],
        'latin': ['urbano latino', 'latin', 'spanish', 'mexicana'],
        'soul': ['r&b', 'soul', 'r&b/soul']
      };

      let preset = eqPresets[detectedGenre] || eqPresets.pop;
      for (const [key, values] of Object.entries(genreMap)) {
        if (values.some(v => detectedGenre.includes(v))) {
          preset = eqPresets[key];
          break;
        }
      }

      if (isPresetActive) {
        setEqSettings(preset);
      }
    }
  }, [activeSong, isPresetActive]);

  const toggleEQ = () => {
    setIsPresetActive((prev) => {
      console.log('Toggling EQ. New state:', !prev);
      return !prev;
    });
  };

  useEffect(() => {
    if (isPresetActive) {
      const preset = eqPresets[currentGenre] || eqPresets.pop;
      setEqSettings(preset);
    } else {
      setEqSettings({ subBass: 0, bass: 0, midrange: 0, treble: 0 });
    }
  }, [isPresetActive, currentGenre]);

  return (
    <div className="eq-sidebar fixed right-0 top-0 h-full w-[356px] bg-[#1a1a26] p-6 text-white">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Chameleon EQ</h2>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isPresetActive}
            onChange={toggleEQ}
          />
          <span className="slider round"></span>
        </label>
      </div>
      
      <span className="text-sm font-semibold">Genre: {currentGenre}</span>
      
      <EQGraph genre={currentGenre} eqSettings={eqSettings} isPresetActive={isPresetActive} />

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Current EQ Settings</h3>
        <p>Sub Bass (60Hz): {eqSettings.subBass} dB</p>
        <p>Bass (250Hz): {eqSettings.bass} dB</p>
        <p>Midrange (1kHz): {eqSettings.midrange} dB</p>
        <p>Treble (8kHz): {eqSettings.treble} dB</p>
      </div>
    </div>
  );
};

export default EQSidebar;