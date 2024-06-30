/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useEffect } from 'react';

const Player = ({ activeSong, isPlaying, volume, seekTime, onEnded, onTimeUpdate, onLoadedData, repeat }) => {
  const ref = useRef(null);
  console.log('Player render. activeSong:', activeSong, 'isPlaying:', isPlaying);
  // eslint-disable-next-line no-unused-expressions
  
  // if (ref.current) {
    //   if (isPlaying) {
      //     ref.current.play();
      //   } else {
        //     ref.current.pause();
        //   }
        // }
        
        useEffect(() => {
          if (isPlaying) {
            ref.current.play().catch(e => console.error("Error playing audio:", e));
          } else {
            ref.current.pause();
          }
        }, [isPlaying]);
        
        useEffect(() => {
          ref.current.volume = volume;
        }, [volume]);
        // updates audio element only on seekTime change (and not on each rerender):
        useEffect(() => {
          ref.current.currentTime = seekTime;
        }, [seekTime]);
        
        useEffect(() => {
          if (ref.current) {
            ref.current.onerror = (e) => console.error('Audio error:', e);
          }
        }, []);
        
        const audioSrc = songData?.hub?.actions?.[1]?.uri;
        console.log('Audio source:', audioSrc);

        return (
          <audio
          src={activeSong?.attributes?.previews[0]?.url}
          ref={ref}
          preload="auto"
          loop={repeat}
          onEnded={onEnded}
          onTimeUpdate={onTimeUpdate}
          // onLoadedData={onLoadedData}
          onLoadedData={(e) => {
            console.log('Audio loaded');
            onLoadedData(e);
          }}
          onError={(e) => console.error('Audio error:', e)}
    />
  );
};
// console.log('Audio source:', activeSong?.attributes?.previews[0]?.url);
export default Player;
