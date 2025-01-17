import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";
import React from "react";

const SongDetails = () => {
   const dispatch = useDispatch();
   const { songid } = useParams();
   const { activeSong, isPlaying } = useSelector((state) => state.player);
   const { data: songData, isFetching: isFetchingSongDetails, error: songError} = useGetSongDetailsQuery(songid);
   const { data: relatedSongs, isFetching: isFetchingRelatedSongs, error: relatedError } = useGetSongRelatedQuery(songid);
   
   if (isFetchingSongDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;
   if (songError || relatedError) return <Error />;
   
   const handlePauseClick = () => {
      dispatch(playPause(false));
   };
   const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({ song, data: relatedSongs, i }));
      dispatch(playPause(true));
   };

   console.log('Track ID:', trackId);
   console.log('Song Data:', songData);

   return (
      <div className="flex flex-col">
         <DetailsHeader artistId="" songData={songData} />
         <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>

         <div className="mt-5">
            {songData?.sections?.[1].type === 'LYRICS'
               ? songData?.sections?.[1]?.text?.map((line, i) => (
                  <p key={`lyrics-${line}-${i}`} className="text-gray-400 text-base my-1">{line}</p>
                  ))
               : (
                  <p className="text-gray-400 text-base my-1">Sorry, No lyrics found!</p>
               )}
            </div>
         </div>

         <RelatedSongs 
            data={data}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
         />
      </div>
   );
};

export default SongDetails;
