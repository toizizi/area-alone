import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import StuPage from './pages/StuPage';
import BlogPage from './pages/BlogPage';
import { musicData } from './constants/musicData';
import './App.css';

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(4px)'
  },
  enter: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0]
    }
  },
  exit: {
    opacity: 0,
    scale: 1.02,
    filter: 'blur(4px)',
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

// 面板
const GlobalMusicPlayer = ({
  currentSong,
  isPlaying,
  onPlay,
  onNext,
  onPrev,
  isVisible,
  onClose,
  position,
  onDragStart,
  onDrag,
  onDragEnd
}) => {
  if (!isVisible) return null;

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: position.y,
        left: position.x,
        width: '320px',
        backgroundColor: '#FFF9E6',
        borderRadius: '20px',
        padding: '1.2rem',
        boxShadow: '0 15px 40px rgba(129, 90, 91, 0.25)',
        zIndex: 10000,
        cursor: 'move',
        userSelect: 'none',
        border: '1px solid rgba(129, 90, 91, 0.1)',
        fontFamily: 'Inter, sans-serif'
      }}
      drag
      dragMomentum={false}
      dragElastic={0}
      onDragStart={onDragStart}
      onDrag={onDrag}
      onDragEnd={onDragEnd}
    >
      {/* 关闭btn */}
      <div style={{
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '0.5rem'
      }}>
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, color: '#815A5B' }}
          whileTap={{ scale: 0.9 }}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#815A5B',
            opacity: 0.6,
            transition: 'all 0.2s'
          }}
        >
          ×
        </motion.button>
      </div>

      {/* 歌曲message */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.2rem',
        marginBottom: '1rem',
        paddingBottom: '1rem',
        borderBottom: '1px solid rgba(129, 90, 91, 0.1)'
      }}>
        <img
          src={currentSong.cover}
          alt="cover"
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '12px',
            objectFit: 'cover',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
          }}
        />
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <h4 style={{
            margin: 0,
            color: '#815A5B',
            fontSize: '1.05rem',
            fontWeight: 'bold',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentSong.title}
          </h4>
          <p style={{
            margin: '0.3rem 0 0',
            fontSize: '0.85rem',
            color: '#815A5B',
            opacity: 0.7
          }}>
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* ctrl btn */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '1rem',
        padding: '0.5rem'
      }}>
        <motion.button
          onClick={onPrev}
          whileHover={{ scale: 1.1, backgroundColor: '#A67C7C' }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#815A5B',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFF',
            cursor: 'pointer',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(129, 90, 91, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          ◀
        </motion.button>

        <motion.button
          onClick={onPlay}
          whileHover={{ scale: 1.1, backgroundColor: '#A67C7C' }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '50px',
            height: '50px',
            backgroundColor: '#815A5B',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFF',
            cursor: 'pointer',
            fontSize: '1.3rem',
            boxShadow: '0 4px 12px rgba(129, 90, 91, 0.3)',
            transition: 'all 0.2s'
          }}
        >
          {isPlaying ? '❚❚' : '▶'}
        </motion.button>

        <motion.button
          onClick={onNext}
          whileHover={{ scale: 1.1, backgroundColor: '#A67C7C' }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#815A5B',
            borderRadius: '50%',
            border: 'none',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#FFF',
            cursor: 'pointer',
            fontSize: '1.1rem',
            boxShadow: '0 2px 8px rgba(129, 90, 91, 0.2)',
            transition: 'all 0.2s'
          }}
        >
          ▶
        </motion.button>
      </div>
    </motion.div>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // --- 音乐播放器status ---
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerPosition, setPlayerPosition] = useState({ x: 20, y: 100 });
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);

  const currentSong = musicData[currentSongIndex];

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.log("播放失败，可能是浏览器限制", e));
      }
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const nextIndex = (currentSongIndex + 1) % musicData.length;
    setCurrentSongIndex(nextIndex);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    const prevIndex = currentSongIndex === 0 ? musicData.length - 1 : currentSongIndex - 1;
    setCurrentSongIndex(prevIndex);
    setIsPlaying(true);
  };

  const handlePlaySpecificSong = (songIndex) => {
    if (songIndex === currentSongIndex) {
      handlePlay();
    } else {
      setCurrentSongIndex(songIndex);
      setIsPlaying(true);
    }
  };

  const handleTogglePlayer = () => {
    setIsPlayerVisible(!isPlayerVisible);
  };

  const handleClosePlayer = () => {
    setIsPlayerVisible(false);
  };

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = (event, info) => {
    setPlayerPosition({
      x: event.clientX - 160,
      y: event.clientY - 100
    });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 监听歌曲切换
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(e => console.log("播放失败", e));
    }
  }, [currentSongIndex, isPlaying]);

  // 自动播放下一首
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => {
        handleNext();
      };
    }
  }, [currentSongIndex]);

  const renderPage = () => {
    const musicControlProps = {
      onTogglePlayer: handleTogglePlayer,
      isPlaying,
      currentSong,
      // give for 分享音乐
      onPlaySpecificSong: handlePlaySpecificSong
    };

    switch (currentPage) {
      case 'home':
        return <HomePage key="home" onNavigate={setCurrentPage} {...musicControlProps} />;
      case 'stu':
        return <StuPage key="stu" onBack={() => setCurrentPage('home')} {...musicControlProps} />;
      case 'blog':
        return <BlogPage key="blog" onBack={() => setCurrentPage('home')} {...musicControlProps} />;
      default:
        return <HomePage key="home" onNavigate={setCurrentPage} {...musicControlProps} />;
    }
  };

  return (
    <div className="app-container">
      <audio
        ref={audioRef}
        src={currentSong?.src}
        onEnded={handleNext}
      />

      {/* 全局音乐btn */}
      <GlobalMusicPlayer
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onNext={handleNext}
        onPrev={handlePrev}
        isVisible={isPlayerVisible}
        onClose={handleClosePlayer}
        position={playerPosition}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="page-wrapper"
        >
          <div className="page-content">
            {renderPage()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;