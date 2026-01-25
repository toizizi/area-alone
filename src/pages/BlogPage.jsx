import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../constants/colors';
import { articlesData } from '../constants/articles';
import { musicData } from '../constants/musicData';

// pyq
const momentsData = [
    { id: 1, desc: "总是不渴望太阳时，太阳最浓烈，不止太阳", img: "/moments/军训太阳飞机.jpg" },
    { id: 2, desc: "此前很执念烤红薯，至从此后，我竟再也不追持于它，好奇怪", img: "/moments/红薯.jpg" },
    { id: 3, desc: "明媚的阳光，茂绿的树，cuteeee' cat，十分惬意", img: "/moments/树咪咪.jpg" },
    { id: 4, desc: "或许劳累以后允许自己得到一些平常不曾得到的东西，jogging～", img: "/moments/书烧仙草.jpg" },
    { id: 5, desc: "倘若有一天我缩小藏在其中，会有谁愿意找到我呢？", img: "/moments/小空间.jpg" } 
];

// this guide
const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'home', label: '首页' },
        { id: 'moments', label: '朋友圈' },
        { id: 'articles', label: '文章' },
        { id: 'music', label: '分享音乐' }
    ];

    return (
        <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{
                width: '260px',
                height: '100%',
                backgroundColor: colors.sidebarBg,
                padding: '2rem',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                borderRight: `1px solid  $ {colors.blogLine}`
            }}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ marginBottom: '3rem', textAlign: 'center' }}
            >
                <div style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: colors.blogCardBg,
                    borderRadius: '50%',
                    margin: '0 auto 1rem',
                    backgroundImage: 'url(/moments/头像.jpg)',
                    backgroundSize: 'cover',
                    border: `3px solid  $ {colors.blogAccent}`,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}></div>
                <h3 style={{ margin: 0, color: colors.blogAccent, fontSize: '1.2rem' }}>Toizizi' blog</h3>
                <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: colors.blogText, opacity: 0.8 }}>
                    '我們的世界應該只剩彼此'
                </p>
            </motion.div>

            <nav>
                {menuItems.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + (index * 0.05) }}
                        onClick={() => setActiveTab(item.id)}
                        whileHover={{ x: 5, backgroundColor: 'rgba(129, 90, 91, 0.1)' }}
                        whileTap={{ scale: 0.98 }}
                        style={{
                            padding: '1rem',
                            marginBottom: '0.5rem',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            color: activeTab === item.id ? colors.blogCardBg : colors.blogText,
                            backgroundColor: activeTab === item.id ? colors.blogAccent : 'transparent',
                            transition: 'all 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)',
                            fontWeight: activeTab === item.id ? 'bold' : 'normal'
                        }}
                    >
                        {item.label}
                    </motion.div>
                ))}
            </nav>
        </motion.div>
    );
};

// pyq content
const MomentsContent = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '3rem', height: '100%', overflowY: 'auto' }}
    >
        <h2 style={{ color: colors.blogAccent, marginBottom: '2rem' }}>朋友圈</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {momentsData.map((moment, index) => (
                <motion.div
                    key={moment.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ y: -5 }}
                    style={{
                        backgroundColor: '#f9f5e7',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '1.5rem',
                        height: 'auto'
                    }}
                >
                    <p style={{
                        color: '#5d5d5d',
                        marginBottom: '1.5rem',
                        fontSize: '1.1rem',
                        lineHeight: 1.5
                    }}>
                        {moment.desc}
                    </p>
                    <div style={{
                        width: '100%',
                        height: '220px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: '#fff'
                    }}>
                        <img
                            src={moment.img}
                            alt="朋友圈图片"
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                display: 'block'
                            }}
                        />
                    </div>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

// article
const ArticlesListContent = ({ onSelectArticle }) => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
    >
        <h2 style={{ color: colors.blogAccent, marginBottom: '2rem', fontSize: '2.5rem' }}>Written Words</h2>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
                backgroundColor: colors.blogCardBg,
                padding: '2rem',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
        >
            {articlesData.map((article, index) => (
                <motion.div
                    key={article.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelectArticle(article)}
                    whileHover={{ x: 10, backgroundColor: 'rgba(255,255,255,0.5)' }}
                    style={{
                        padding: '1.5rem 0',
                        borderBottom: index < articlesData.length - 1 ? `1px solid  $ {colors.blogLine}` : 'none',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer',
                        borderRadius: '8px',
                        paddingLeft: '0.5rem',
                        transition: 'background 0.4s'
                    }}
                >
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        style={{
                            width: '60px',
                            height: '60px',
                            backgroundColor: colors.blogAccent,
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: colors.blogCardBg,
                            fontSize: '1.5rem',
                            fontWeight: 'bold',
                            marginRight: '1.5rem',
                            flexShrink: 0
                        }}
                    >
                        {String(index + 1).padStart(2, '0')}
                    </motion.div>
                    <div>
                        <h3 style={{ margin: 0, color: colors.blogText, fontSize: '1.2rem' }}>{article.title}</h3>
                        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: colors.blogAccent }}>{article.date}</p>
                    </div>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
);

// article-list
const ArticleDetailContent = ({ article, onBack }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{
            padding: '3rem',
            maxWidth: '800px',
            margin: '0 auto',
            minHeight: '100%',
            backgroundColor: 'transparent'
        }}
    >
        <motion.button
            onClick={onBack}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: 5 }}
            style={{
                marginBottom: '2rem',
                background: 'none',
                border: 'none',
                color: colors.blogAccent,
                fontSize: '1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                fontWeight: 'bold'
            }}
        >
            ← click-return
        </motion.button>

        <motion.div
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            style={{
                backgroundColor: colors.blogCardBg,
                padding: '4rem',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                lineHeight: 1.8,
                color: colors.blogText,
                fontSize: '1.1rem'
            }}
        >
            <h1 style={{
                color: colors.blogAccent,
                marginBottom: '0.5rem',
                fontSize: '2.5rem',
                fontWeight: 'bold'
            }}>
                {article.title}
            </h1>
            <p style={{
                fontSize: '0.9rem',
                color: colors.blogAccent,
                marginBottom: '3rem',
                opacity: 0.7,
                fontStyle: 'italic'
            }}>
                {article.date}
            </p>

            <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: article.content }}
                style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.8
                }}
            />
        </motion.div>
    </motion.div>
);

// says
const HomeContent = () => {
    const sayings = [
        {
            id: 1,
            date: "2026.1.24",
            content: "一直追求着完美主义直到自己疲倦，所以这个AREA暂时这样，我已疲倦，但也算是自己闲暇的安慰。希望烦躁时来到这个独属于AREA，它能够使我平静下来",
            quote: "some people want it all～"
        },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6 }}
            style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
        >
            <h2 style={{ color: colors.blogAccent, marginBottom: '2rem', fontSize: '2.2rem' }}>some little says～</h2>

            {sayings.map((saying, index) => (
                <motion.div
                    key={saying.id}
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.8, delay: index * 0.1, type: "spring", stiffness: 50 }}
                    style={{
                        backgroundColor: colors.blogCardBg,
                        padding: '2.5rem',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        lineHeight: 1.8,
                        color: colors.blogText,
                        marginBottom: index < sayings.length - 1 ? '2rem' : '0'
                    }}
                >
                    <p style={{
                        marginBottom: '1.5rem',
                        fontSize: '0.9rem',
                        color: colors.blogAccent,
                        opacity: 0.7,
                        fontStyle: 'italic'
                    }}>{saying.date}</p>

                    <p style={{ marginBottom: '1.2rem' }}>{saying.content}</p>

                    <p style={{ marginTop: '1.5rem', fontStyle: 'italic', opacity: 0.8 }}>
                        "{saying.quote}"
                    </p>
                </motion.div>
            ))}
        </motion.div>
    );
};

// music
const MusicPlayer = ({ music }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = React.useRef(null);

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleEnded = () => {
        setIsPlaying(false);
    };

    return (
        <motion.div
            layout
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{
                backgroundColor: colors.blogCardBg,
                borderRadius: '16px',
                padding: '1.5rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem'
            }}
        >
            <audio
                ref={audioRef}
                src={music.src}
                onEnded={handleEnded}
            />

            {/* fengmian */}
            <div style={{
                width: '100px',
                height: '100px',
                flexShrink: 0,
                position: 'relative',
                borderRadius: '12px',
                overflow: 'hidden'
            }}>
                <img
                    src={music.cover}
                    alt="cover"
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '12px'
                    }}
                />
                {/* 音符 */}
                {isPlaying && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ repeat: Infinity, duration: 1.5 }}
                        style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: '40px',
                            height: '40px',
                            backgroundColor: 'rgba(255,255,255,0.8)',
                            borderRadius: '50%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: colors.blogAccent,
                            fontSize: '12px'
                        }}
                    >
                        ♪
                    </motion.div>
                )}
            </div>

            <div style={{ flex: 1 }}>
                <p style={{
                    color: colors.blogText,
                    marginBottom: '1rem',
                    fontSize: '1.1rem',
                    lineHeight: 1.5,
                    marginTop: '0.5rem'
                }}>{music.thought}</p>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '1rem',
                    backgroundColor: colors.sidebarBg,
                    borderRadius: '12px'
                }}>
                    <div>
                        <h4 style={{ margin: 0, color: colors.blogAccent, fontSize: '1rem' }}>{music.title}</h4>
                        <p style={{ margin: '0.2rem 0 0', fontSize: '0.85rem', color: colors.blogText, opacity: 0.8 }}>{music.artist}</p>
                    </div>

                    {/* 播放btn*/}
                    <motion.button
                        onClick={togglePlay}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        style={{
                            width: '50px',
                            height: '50px',
                            backgroundColor: colors.blogAccent,
                            borderRadius: '50%',
                            border: 'none',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            color: colors.blogCardBg,
                            cursor: 'pointer',
                            fontSize: '1.2rem',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
                            marginLeft: '1rem'
                        }}
                    >
                        {isPlaying ? '❚❚' : '▶'}
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

// 音乐content
const MusicContent = () => (
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{
            padding: '3rem',
            maxWidth: '900px',
            margin: '0 auto',
            width: '100%'
        }}
    >
        <h2 style={{ color: colors.blogAccent, marginBottom: '2rem', fontSize: '2.2rem' }}>分享音乐</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {musicData.map((music, index) => (
                <MusicPlayer key={music.id} music={music} />
            ))}
        </div>
    </motion.div>
)

function BlogPage({ onBack }) {
    const [activeTab, setActiveTab] = useState('home');
    const [selectedArticle, setSelectedArticle] = useState(null);

    const renderMainContent = () => {
        switch (activeTab) {
            case 'home': return <HomeContent />;
            case 'moments': return <MomentsContent />;
            case 'music': return <MusicContent />;
            case 'articles':
                if (selectedArticle) {
                    return (
                        <ArticleDetailContent
                            article={selectedArticle}
                            onBack={() => setSelectedArticle(null)}
                        />
                    );
                } else {
                    return <ArticlesListContent onSelectArticle={setSelectedArticle} />;
                }
            default: return <HomeContent />;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                display: 'flex',
                height: '100%',     
                backgroundColor: colors.blogBg,
                overflow: 'hidden'     
            }}
        >
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div style={{
                flex: 1,
                overflowY: 'auto',
                position: 'relative',
                msOverflowStyle: 'none',
                scrollbarWidth: 'none'
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab + (selectedArticle ? '-detail' : '-list')}
                        layout
                        initial={{ opacity: 0, x: 20, scale: 0.98 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: -20, scale: 0.98 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                        {renderMainContent()}
                    </motion.div>
                </AnimatePresence>

                <motion.button
                    onClick={onBack}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        right: '2rem',
                        padding: '0.6rem 1.2rem',
                        border: 'none',
                        borderRadius: '30px',
                        backgroundColor: colors.blogAccent,
                        color: colors.blogCardBg,
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        zIndex: 100,
                        boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                    }}
                >
                    返回首页
                </motion.button>
            </div>
        </motion.div>
    );
}

export default BlogPage;