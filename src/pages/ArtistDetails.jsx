import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { useGetArtistDetailsQuery } from "../redux/services/shazamCore";


const ArtistDetails = () => {
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data: artistData, isFetching: isFetchingArtistDetails, error} = useGetArtistDetailsQuery(artistId);

  console.log('Track ID:', trackId);
  console.log('Song Data:', songData);
  console.log('Artist ID:', artistId);
  console.log('Artist Data:', artistData);

  if (isFetchingArtistDetails) return <Loader title="Searching artist details" />;
  if (error) return <Error />;

  return (
      <div className="flex flex-col">
        <DetailsHeader artistId={artistId} artistData={artistData} />
        <RelatedSongs 
            data={Object.values(artistData?.songs ?? {})}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
        />
      </div>
  );
};

export default ArtistDetails;
