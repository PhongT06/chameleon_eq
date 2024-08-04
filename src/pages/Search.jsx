import axios from 'axios';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Error, Loader, SongCard } from '../components';
import ArtistCard from '../components/ArtistCard';
import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';

const Search = () => {
  const { searchTerm } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

  if (isFetching) return <Loader title={`Searching for ${searchTerm}...`} />;

  if (error) return <Error />;

  const songs = data?.tracks?.hits.map((song) => song.track);
  const artists = data?.artists?.hits.map((artist) => artist.artist);

return (
  <div className="flex flex-col">
    <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
      Showing results for <span className="font-black">{searchTerm}</span>
    </h2>

    <div className="flex flex-col">
        <h2 className="font-bold text-2xl text-white text-left mt-4 mb-4">Songs</h2>
        <div className="flex flex-wrap sm:justify-start justify-center gap-8">
          {songs?.map((song, i) => (
            <SongCard
              key={song.key}
              song={song}
              isPlaying={isPlaying}
              activeSong={activeSong}
              data={songs}
              i={i}
            />
          ))}
        </div>
      </div>

      {artists?.length > 0 && (
        <div className="flex flex-col mt-8">
          <h2 className="font-bold text-2xl text-white text-left mt-4 mb-4">Artists</h2>
          <div className="flex flex-wrap sm:justify-start justify-center gap-8">
            {artists.map((artist, i) => (
              <SongCard
                key={artist.adamid}
                song={artist}
                data={artists}
                i={i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


export default Search;
