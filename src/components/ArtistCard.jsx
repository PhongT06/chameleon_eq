// import { useNavigate } from "react-router-dom";
// import React from "react";

// const ArtistCard = ({ track }) => {
//   const navigate = useNavigate();
//   if (!track) return null;
//   return (
//     <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" onClick={() => navigate(`/artists/${track?.artists[0].adamid}`)}>
//       <img alt="artist" src={track?.images?.coverart}
//       className="w-full h-56 rounded-lg" />
//       <p className="mt-4 font-semibold text-lg text-white truncate">{track?.subtitle}</p>
//     </div>
//   );
// };

// export default ArtistCard;




// import React from "react";
// import { useNavigate } from "react-router-dom";

// const ArtistCard = ({ track }) => {
//   const navigate = useNavigate();

//   return (
//     <div 
//       className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
//       onClick={() => navigate(`/artists/${track?.artists?.[0]?.adamid}`)}
//     >
//       <div className="relative w-full h-56 group">
//         <img 
//           alt="artist_img" 
//           src={track.attributes?.artwork?.url || '/path/to/fallback-image.jpg'} 
//           className="w-full h-full rounded-lg"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = '/path/to/fallback-image.jpg';
//           }}
//         />
//       </div>
//       <p className="mt-4 font-semibold text-lg text-white truncate">
//         {track.attributes?.artistName || 'Unknown Artist'}
//       </p>
//     </div>
//   );
// };

// export default ArtistCard;



import React from "react";
import { useNavigate } from "react-router-dom";

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const artistId = track?.artists?.[0]?.adamid || track?.adamid;
    if (artistId) {
      navigate(`/artists/${artistId}`);
    } else {
      console.error('Artist ID not found');
    }
  };

//   return (
//     <div 
//       className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
//       onClick={handleClick}
//     >
//       <div className="relative w-full h-56 group">
//         <div className="absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex hidden transition-all duration-300">
//           <p className="text-white text-lg font-bold">View Artist</p>
//         </div>
//         <img 
//           alt="artist_img" 
//           src={track.attributes?.artwork?.url || '/path/to/fallback-image.jpg'} 
//           className="w-full h-full rounded-lg"
//           onError={(e) => {
//             e.target.onerror = null;
//             e.target.src = '/path/to/fallback-image.jpg';
//           }}
//         />
//       </div>
//       <p className="mt-4 font-semibold text-lg text-white truncate">
//         {track.attributes?.artistName || track.subtitle || 'Unknown Artist'}
//       </p>
//     </div>
//   );
// };

  return (
    <div 
      className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer" 
      onClick={handleClick}
    >
      <img 
        alt="artist" 
        src={track?.images?.coverart || track?.attributes?.artwork?.url.replace('{w}', '500').replace('{h}', '500')}
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {track?.subtitle || track?.attributes?.name || "Unknown Artist"}
      </p>
    </div>
  );
};

export default ArtistCard;