import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../constants/colors';
/* feeling */
const insightsData = [
    { id: 1, title: "关于持续性：", content: "或许是因为我对时间的怠慢，我常常允许自己的情绪第一，STUDY-第二，For me ,学习是一个缓慢且持久的事情。" },
    { id: 2, title: "About this area-", content: "从来都清晰自己的能力，SO, THIS AREA即将成为一个experimental area,每当我学会一个我认为更好的技术，我将迭代重构它" },
    { id: 3, title: "新鲜feeling", content: "不否认我是一个三分钟热度的人，但慕强的倾向未曾改变，所以我预感THIS AREA 会大变样，因为我的审美和新鲜感永远在发散。" }
];

const progressData = [
    { id: 1, subject: "React", progress: 15 },
    { id: 2, subject: "Python", progress: 60 },
    { id: 3, subject: "JavaScript", progress: 35 },
    { id: 4, subject: "html", progress: 80 },
    { id: 4, subject: "CSS", progress: 75 }
];

const TopNav = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'insights', label: 'INDEX' },
        { id: 'progress', label: 'PROGRESS' }
    ];

    return (
        <div style={{
            position: 'absolute',
            top: '2rem',
            right: '2rem',
            display: 'flex',
            gap: '1.5rem',
            zIndex: 50 
        }}>
            {menuItems.map((item) => (
                <motion.div
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '30px',
                        cursor: 'pointer',
                        color: activeTab === item.id ? colors.cardBg : colors.text,
                        backgroundColor: activeTab === item.id ? colors.accent : 'rgba(255,255,255,0.5)',
                        transition: 'all 0.3s ease',
                        fontWeight: activeTab === item.id ? 'bold' : 'normal',
                        boxShadow: activeTab === item.id ? '0 4px 10px rgba(129, 90, 91, 0.2)' : 'none'
                    }}
                >
                    {item.label}
                </motion.div>
            ))}
        </div>
    );
};

// index
const InsightsContent = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
    >
        <h2 style={{ color: colors.accent, marginBottom: '2rem', fontSize: '2rem' }}>study-talk</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {insightsData.map((insight, index) => (
                <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }} 
                    whileHover={{ y: -5, boxShadow: '0 8px 25px rgba(0,0,0,0.08)' }}
                    style={{
                        backgroundColor: colors.cardBg,
                        padding: '2rem',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                        cursor: 'default'
                    }}
                >
                    <h3 style={{ margin: 0, color: colors.accent, fontSize: '1.2rem' }}>{insight.title}</h3>
                    <p style={{ margin: '1rem 0 0', lineHeight: 1.6, color: colors.text }}>{insight.content}</p>
                </motion.div>
            ))}
        </div>
    </motion.div>
);

// progress
const ProgressContent = () => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        style={{ padding: '3rem', maxWidth: '800px', margin: '0 auto' }}
    >
        <h2 style={{ color: colors.accent, marginBottom: '2rem', fontSize: '2rem' }}>study-progress</h2>
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ backgroundColor: colors.cardBg, padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
        >
            {progressData.map((item) => (
                <div key={item.id} style={{ marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <span style={{ color: colors.text, fontWeight: 'bold' }}>{item.subject}</span>
                        <span style={{ color: colors.accent }}>{item.progress}%</span>
                    </div>
                    <div style={{
                        height: '10px',
                        backgroundColor: colors.line,
                        borderRadius: '5px',
                        overflow: 'hidden'
                    }}>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{
                                height: '100%',
                                backgroundColor: colors.accent,
                                borderRadius: '5px'
                            }}
                        />
                    </div>
                </div>
            ))}
        </motion.div>
    </motion.div>
);

function StuPage({ onBack }) {
    const [activeTab, setActiveTab] = useState('insights');

    const renderContent = () => {
        switch (activeTab) {
            case 'insights': return <InsightsContent />;
            case 'progress': return <ProgressContent />;
            default: return <InsightsContent />;
        }
    };

    return (
        <div style={{
            width: '100%',
            height: '100%',
            backgroundColor: colors.mainBg,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            <TopNav activeTab={activeTab} setActiveTab={setActiveTab} />

            <div style={{
                flex: 1,
                marginTop: '5rem',
                overflowY: 'auto',
                padding: '0 1rem 2rem 1rem'
            }}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>

{/* return */}
            <motion.button
                onClick={onBack}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                    position: 'absolute',
                    top: '2rem',
                    left: '2rem',
                    padding: '0.6rem 1.2rem',
                    border: 'none',
                    borderRadius: '8px',
                    backgroundColor: colors.accent,
                    color: colors.cardBg,
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    fontWeight: 'bold',
                    zIndex: 50,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                }}
            >
                ← 返回首页
            </motion.button>
        </div>
    );
}

export default StuPage;