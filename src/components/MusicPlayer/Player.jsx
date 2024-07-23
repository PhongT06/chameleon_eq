import React, { useRef, useEffect } from 'react';
import AutoEQ from '../AutoEQ';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const audioRef = useRef(null);
  console.log('Player component function called');
  console.log('Player props:', { activeSong, isPlaying, volume, seekTime, repeat });
  console.log('Player component rendering');
  console.log('activeSong:', activeSong);
  console.log('isPlaying:', isPlaying);

        useEffect(() => {
          console.log('Player useEffect running');
          if (audioRef.current) {
            console.log('Audio element:', audioRef.current);
            console.log('Audio source:', audioRef.current.src);
            console.log('Is audio paused?', audioRef.current.paused);
          } else {
            console.log('Audio element ref is null');
          }
        }, [activeSong, isPlaying]);
        
        const audioSrc = activeSong?.attributes?.previews?.[0]?.url;
        console.log('Audio source URL:', audioSrc);

        useEffect(() => {
          if (audioRef.current) {
            if (isPlaying) {
              console.log('Attempting to play audio');
              audioRef.current.play().catch(e => console.error('Error playing audio:', e));
            } else {
              console.log('Pausing audio');
              audioRef.current.pause();
            }
          }
        }, [isPlaying, audioSrc, activeSong]);
        
        useEffect(() => {
          if (audioRef.current) {
            audioRef.current.volume = volume;
          }
        }, [volume]);
      
        useEffect(() => {
          if (audioRef.current && !isNaN(seekTime)) {
            audioRef.current.currentTime = seekTime;
          }
        }, [seekTime]);

        return (
          <>
            <audio
              ref={audioRef}
              src={audioSrc}
              onEnded={onEnded}
              onTimeUpdate={onTimeUpdate}
              onLoadedData={onLoadedData}
              onError={(e) => console.error('Audio error:', e)}
              preload="metadata"
              loop={repeat}
      />
      <AutoEQ audioRef={audioRef} />
    </>
  );
};

export default Player;
