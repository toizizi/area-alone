import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import HomePage from './pages/HomePage';
import StuPage from './pages/StuPage';
import BlogPage from './pages/BlogPage';
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

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage key="home" onNavigate={setCurrentPage} />;
      case 'stu': return <StuPage key="stu" onBack={() => setCurrentPage('home')} />;
      case 'blog': return <BlogPage key="blog" onBack={() => setCurrentPage('home')} />;
      default: return <HomePage key="home" onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          variants={pageVariants}
          initial="initial"
          animate="enter"
          exit="exit"
          className="page-wrapper"
        >
          {/* 移除了内联 style，全部交由 CSS 控制 */}
          <div className="page-content">
            {renderPage()}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;