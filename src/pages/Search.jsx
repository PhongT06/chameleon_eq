import axios from 'axios';
// import { useSelector } from 'react-redux';
// import { Error, Loader, SongCard } from '../components';
// import React from 'react';
// import { useGetSongsBySearchQuery } from '../redux/services/shazamCore';
// import { useParams } from 'react-router-dom';

// const Search = () => {
//   const { searchTerm } = useParams();
//   const { activeSong, isPlaying } = useSelector((state) => state.player);
//   const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm);

//   if (isFetching) return <Loader title={`Searching for ${searchTerm}...`} />;

//   if (error) return <Error />;
  
//   // const songs = data?.tracks?.hits?.map((song) => song.track);
//   const songs = data?.tracks?.hits?.map(hit => hit.track);
//   const artists = data?.artists?.hits?.map(hit => hit.artist);

//   return (
//       <div className="flex flex-col">
//         <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
//           Showing search results for <span className="font-black">{searchTerm}</span>
//         </h2>
//         <div className="flex flex-col">
//           <h2 className="font-bold text-2xl text-white text-left mt-4 mb-4">Songs</h2>
//           <div className=" flex flex-wrap sm:justify-start justify-center gap-8">
//               {songs?.map((song, i) => 
//                 <SongCard 
//                     key={song.id}
//                     song={song}
//                     isPlaying={isPlaying}
//                     activeSong={activeSong}
//                     data={data}
//                     i={i}
//                 />
//               )}
//         </div>
//       </div>

//       {artists && artists.length > 0 && (
//         <div className="flex flex-col mt-8">
//           <h2 className="font-bold text-2xl text-white text-left mt-4 mb-4">Artists</h2>
//           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
//             {artists.map((artist) => (
//               <ArtistCard
//                 key={artist.id}
//                 artist={artist}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Search;


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

  // const songs = data?.tracks?.hits?.map(hit => hit.track) || [];
  // const artists = data?.artists?.hits?.map(hit => hit.artist) || [];

  const songs = data?.tracks?.hits.map((song) => song.track);
  const artists = data?.artists?.hits.map((artist) => artist.artist);

//   return (
//     <div className="flex flex-col">
//       <h2 className="font-bold text-3xl text-white text-left mt-4 mb-10">
//         Showing search results for <span className="font-black">{searchTerm}</span>
//       </h2>
//       <div className="flex flex-col">
//         <h2 className="font-bold text-2xl text-white text-left mt-4 mb-4">Songs</h2>
//         <div className="flex flex-wrap sm:justify-start justify-center gap-8">
//           {songs?.map((song, i) => (
//             <SongCard 
//               key={song.key}
//               song={song}
//               isPlaying={isPlaying}
//               activeSong={activeSong}
//               data={data}
//               i={i}
//             />
//           ))}
//         </div>
//       </div>

//       {artists && artists.length > 0 && (
//         <div className="flex flex-col mt-8">
//           <h2 className="font-bold text-2xl text-white text-left mt-4 mb-4">Artists</h2>
//           <div className="flex flex-wrap sm:justify-start justify-center gap-8">
//             {artists.map((artist) => (
//               <ArtistCard
//                 key={artist.id}
//                 track={artist}
//               />
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

  // const handlePauseClick = () => {
  //   dispatch(playPause(false));
  // };

  // const handlePlayClick = (song, i) => {
  //   dispatch(setActiveSong({ song, data: songs, i }));
  //   dispatch(playPause(true));
  // };


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
