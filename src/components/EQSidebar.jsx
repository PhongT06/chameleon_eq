import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { eqPresets } from './eqPresets';
import EQGraph from './EQGraph';
import MusicVisualizer from './MusicVisualizer';


const EQSidebar = ({ isOpen, onClose }) => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const [eqSettings, setEqSettings] = useState({ subBass: 0, bass: 0, midrange: 0, treble: 0 });
  const [isPresetActive, setIsPresetActive] = useState(true);
  const [currentGenre, setCurrentGenre] = useState('pop');
  const [isVisualizerActive, setIsVisualizerActive] = useState(true);

  console.log('EQSidebar: Rendering', { isOpen, activeSong: !!activeSong, isPlaying });

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
        'hip-hop': ['hip-hop', 'rap', 'hip hop', 'hip-hop/rap'],
        'pop': ['pop'],
        'rock': ['rock', 'hard rock'],
        'electronic': ['electronic', 'edm'],
        'classical': ['classical', 'film'],
        'country': ['country'],
        'alternative': ['alternative'],
        'latin': ['urbano latino', 'latin', 'spanish', 'mexicana'],
        'soul': ['r&b', 'soul', 'r&b/soul'],
        'house': ['house', 'afro house'],
        'k-pop': ['k-pop', 'k pop']
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
      } else {
        setEqSettings({ subBass: 0, bass: 0, midrange: 0, treble: 0 });
      }
    }
  }, [activeSong, isPresetActive]);

  const toggleEQ = () => {
    setIsPresetActive((prev) => {
      if (!prev) {
        // If turning on, set the EQ settings to the current genre preset
        const preset = eqPresets[currentGenre] || eqPresets.pop;
        setEqSettings(preset);
      } else {
        // If turning off, reset EQ settings to 0
        setEqSettings({ subBass: 0, bass: 0, midrange: 0, treble: 0 });
      }
      return !prev;
    });
  };

  const toggleVisualizer = () => {
    setIsVisualizerActive((prev) => !prev);
  };

  const capitalizeGenre = (genre) => {
    return genre.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className={`eq-sidebar fixed right-0 top-0 h-full w-[550px] bg-[#1a1a26] p-8 text-white transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-4xl font-bold">Chameleon EQ</h2>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isPresetActive}
            onChange={toggleEQ}
          />
          <span className="slider round"></span>
        </label>
      </div>
      
      <span className="text-2xl font-semibold">Genre: {capitalizeGenre(currentGenre)}</span>
      
      <EQGraph 
        genre={currentGenre} 
        eqSettings={eqSettings} 
        isPresetActive={isPresetActive} 
        width={460} 
        height={300}
        />

      <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-2">Current EQ Settings</h3>
        <p className="text-lg">Sub Bass (60Hz): {eqSettings.subBass} dB</p>
        <p className="text-lg">Bass (250Hz): {eqSettings.bass} dB</p>
        <p className="text-lg">Midrange (1kHz): {eqSettings.midrange} dB</p>
        <p className="text-lg">Treble (8kHz): {eqSettings.treble} dB</p>
      </div>

      <div className="mt-4 flex justify-end items-center">
        <span className="mr-2 text-sm">Visualizer</span>
        <label className="switch">
          <input 
            type="checkbox" 
            checked={isVisualizerActive}
            onChange={toggleVisualizer}
          />
          <span className="slider round"></span>
        </label>
      </div>

      <div className="mt-4">
        {isVisualizerActive && activeSong && (
          <MusicVisualizer 
            audioSrc={activeSong?.attributes?.previews?.[0]?.url}
            isPlaying={isPlaying}
            width={350}
            height={350}
          />
        )}
      </div>
    </div>
  );
};

export default EQSidebar;