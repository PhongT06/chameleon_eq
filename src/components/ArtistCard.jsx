import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import PlayPause from './PlayPause';
import { playPause, setActiveSong } from '../redux/features/playerSlice';

const ArtistCard = ({ artist, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  if (!artist) {
    console.error('Artist data is undefined:', artist);
    return null;
  }

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song: artist, data, i }));
    dispatch(playPause(true));
  };

  const getArtistImage = () => {
    if (artist.avatar) {
      return artist.avatar;
    }
    if (artist.images && artist.images.background) {
      return artist.images.background;
    }
    if (artist.attributes && artist.attributes.artwork && artist.attributes.artwork.url) {
      return artist.attributes.artwork.url.replace('{w}', '500').replace('{h}', '500');
    }
    return '/path/to/default-image.jpg';
  };

  const artistImage = getArtistImage();
  const artistName = artist.name || artist.attributes?.name || 'Unknown Artist';
  const artistId = artist.adamid || artist.id || 'unknown-id';

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hidden`}>
          <PlayPause 
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={artist}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img 
          alt="artist_img"
          src={artistImage}
          className="w-full h-full rounded-lg"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/path/to/default-image.jpg';
          }}
        />
      </div>

      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-white truncate">
          <Link to={`/artists/${artistId}`}>
            {artistName}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ArtistCard;