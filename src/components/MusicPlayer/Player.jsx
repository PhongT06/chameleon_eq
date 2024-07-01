/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const audioRef = useRef(null);
  console.log('Player component function called');
  console.log('Player props:', { activeSong, isPlaying, volume, seekTime, repeat });
  console.log('Player component rendering');
  console.log('activeSong:', activeSong);
  console.log('isPlaying:', isPlaying);
  // eslint-disable-next-line no-unused-expressions
  
  // if (ref.current) {
    //   if (isPlaying) {
      //     ref.current.play();
      //   } else {
        //     ref.current.pause();
        //   }
        // }
        
        // useEffect(() => {
        //   if (isPlaying) {
        //     ref.current.play().catch(e => console.error("Error playing audio:", e));
        //   } else {
        //     ref.current.pause();
        //   }
        // }, [isPlaying]);

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
        }, [isPlaying, audioSrc]);

        // useEffect(() => {
        //   if (ref.current) {
        //     if (isPlaying) {
        //       console.log('Attempting to play', audioSrc);
        //       // ref.current.play().catch(e => console.error("Error playing audio:", e));
        //       ref.current.play()
        //         .then(() => console.log('Playback started successfully'))
        //         .catch(e => console.error("Error playing audio:", e));
        //     } else {
        //       console.log('Pausing');
        //       ref.current.pause();
        //     }
        //   }
        // }, [isPlaying, audioSrc]);
        
        // useEffect(() => {
        //   ref.current.volume = volume;
        // }, [volume]);
        // // updates audio element only on seekTime change (and not on each rerender):
        // useEffect(() => {
        //   ref.current.currentTime = seekTime;
        // }, [seekTime]);
        
        // useEffect(() => {
        //   if (ref.current) {
        //     ref.current.onerror = (e) => console.error('Audio error:', e);
        //   }
        // }, []);

        // useEffect(() => {
        //   if (ref.current) {
        //     ref.current.addEventListener('loadeddata', () => {
        //       console.log('Audio loaded successfully');
        //     });
        //     ref.current.addEventListener('error', (e) => {
        //       console.error('Audio loading error:', e);
        //     });
        //   }
        // }, []);

        // useEffect(() => {
        //   if (ref.current) {
        //     console.log('Setting volume to:', volume);
        //     ref.current.volume = volume;
        //   }
        // }, [volume]);
        
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
  );
};

export default Player;
