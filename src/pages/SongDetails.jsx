import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetTrackDetailsQuery, useGetSongRelatedQuery } from "../redux/services/shazamCore";


const SongDetails = () => {
   const dispatch = useDispatch();
   const { songid: trackId } = useParams();
   const { activeSong, isPlaying } = useSelector((state) => state.player);
   const { data: songData, isFetching: isFetchingTrackDetails} = useGetTrackDetailsQuery(trackId);
   const { data, isFetching: isFetchingRelatedSongs, error } = useGetSongRelatedQuery(trackId);
   const handlePauseClick = () => {
      dispatch(playPause(false));
   };
   const handlePlayClick = (song, i) => {
      dispatch(setActiveSong({ song, data, i }));
      dispatch(playPause(true));
   };

   console.log('Track ID:', trackId);
   console.log('Song Data:', songData);

   if (isFetchingTrackDetails || isFetchingRelatedSongs) return <Loader title="Searching song details" />;
   if (error) return <Error />;

   return (
      <div className="flex flex-col">
         <DetailsHeader artistId="" songData={songData} />
         <div className="mb-10">
            <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
            <div className="mt-5">
               {songData?.sections?.find(section => section.type === 'LYRICS')?.text ? (
                  songData.sections.find(section => section.type === 'LYRICS').text.map((line, i) => (
                     <p key={i} className="text-gray-400 text-base my-1">{line}</p>
                  ))
               ) : (
                  <p className="text-gray-400 text-base">Sorry, no lyrics found!</p>
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
