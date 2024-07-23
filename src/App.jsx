import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import { ArtistDetails, TopArtists, AroundYou, Discover, Search, SongDetails, TopCharts } from './pages';
import EQSidebar from './components/EQSidebar';
import ChameleonOffIcon from './assets/chameleon_off.svg';
import ChameleonOnIcon from './assets/chameleon_on.svg';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);

  const [isEQSidebarOpen, setIsEQSidebarOpen] = useState(false);

  const toggleEQSidebar = () => setIsEQSidebarOpen(!isEQSidebarOpen);

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#103d1a]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/" element={<TopCharts />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {activeSong?.attributes?.name && (
        <>
          <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#1b513b] backdrop-blur-lg rounded-t-3xl z-10">
            <MusicPlayer />
          </div>
          <button 
            onClick={toggleEQSidebar}
            className="fixed bottom-32 right-5 bg-[#1b513b] p-2 rounded-full z-20 transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1b513b]"
            aria-label={isEQSidebarOpen ? "Close EQ Sidebar" : "Open EQ Sidebar"}
          >
            <img 
              src={isEQSidebarOpen ? ChameleonOnIcon : ChameleonOffIcon} 
              alt="EQ" 
              className="w-16 h-16 transition-opacity duration-300 ease-in-out"
            />
          </button>
          <EQSidebar isOpen={isEQSidebarOpen} onClose={() => setIsEQSidebarOpen(false)} />
        </>
      )}
    </div>
  );
};

export default App;
