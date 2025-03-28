import React, { useContext } from 'react';
import Sidebar from './components/Sidebar';
import Player from './components/Player';
import Display from './components/Display';
import Navbar from './components/Navbar'; // ✅ Import Navbar
import { PlayerContext } from './context/PlayerContext';

const App = () => {
  const { audioRef, track, songsData } = useContext(PlayerContext);

  return (
    <div className='h-screen bg-black text-white flex flex-col'>
      {songsData.length !== 0 ? (
        <>
          {/* ✅ Navbar is separate at the top */}
          <Navbar />

          <div className='h-[90%] flex '>
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}

      <audio ref={audioRef} src={track?.file ?? null} preload='auto'></audio>
    </div>
  );
};

export default App;