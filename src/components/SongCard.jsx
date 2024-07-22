import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';
import React from 'react';

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  if (!song) {
    console.error('Song data is undefined:', song);
    return null; 
  }
  
  const handlePauseClick = () => { 
    dispatch(playPause(false));
  };
  
  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }));
    dispatch(playPause(true));
  };

  const isArtist = song.adamid !== undefined;

  const getCoverArt = () => {
    if (isArtist && song.avatar) {
      return song.avatar;
    }
    if (song.images && song.images.coverart) {
      return song.images.coverart;
    }
    if (song.attributes && song.attributes.artwork && song.attributes.artwork.url) {
      return song.attributes.artwork.url.replace('{w}', '500').replace('{h}', '500');
    }
    return '/path/to/default-image.jpg';
  };

  const coverArt = getCoverArt();
  const title = isArtist ? song.name : (song.title || song.name || song.attributes?.name || 'Unknown Title');
  const subtitle = isArtist ? 'Artist' : (song.subtitle || song.artist || song.attributes?.artistName || 'Unknown Artist');
  const id = isArtist ? song.adamid : (song.key || song.id || 'unknown-id');

return (
  <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
    <div className="relative w-full h-56 group">
      <div className="absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hidden">
        {!isArtist && (
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        )}
      </div>

        <img 
          alt={isArtist ? "artist_img" : "song_img"}
          src={coverArt}
          className="w-full h-full rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/path/to/default-image.jpg';
          }}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={isArtist ? `/artists/${id}` : `/songs/${id}`}>
            {title}
          </Link>
        </p>
        {!isArtist && (
          <p className="text-sm truncate text-gray-300 mt-1">
            <Link to={song.artists ? `/artists/${song.artists[0]?.adamid}` : '/top-artists'}>
              {subtitle}
            </Link>
          </p>
        )}
      </div>
    </div>
  );
};

export default SongCard;
