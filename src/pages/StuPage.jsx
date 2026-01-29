import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { colors } from '../constants/colors';
import { cet4Vocabulary } from '../data/cet4-vocabulary';

/* feeling */
const insightsData = [
    { id: 1, title: "关于持续性：", content: "或许是因为我对时间的怠慢，我常常允许自己的情绪第一，STUDY-第二，For me ,学习是一个缓慢且持久的事情。" },
    { id: 2, title: "About this area-", content: "从来都清晰自己的能力，SO, THIS AREA即将成为一个experimental area,每当我学会一个我认为更好的技术，我将迭代重构它" },
    { id: 3, title: "新鲜feeling", content: "不否认我是一个三分钟热度的人，但慕强的倾向未曾改变，所以我预感THIS AREA 会大变样，因为我的审美和新鲜感永远在发散。" },
    { id: 4, title: "new finding", content: "分享喜悦，我在2026.1.29发现我最适合的学习方法，就是使用平板阅读文档，如读小说一般有趣！" }
];

const progressData = [
    { id: 1, subject: "React", progress: 15 },
    { id: 2, subject: "Python", progress: 60 },
    { id: 3, subject: "JavaScript", progress: 35 },
    { id: 4, subject: "html", progress: 80 },
    { id: 5, subject: "CSS", progress: 75 }
];

const TopNav = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'insights', label: 'INDEX' },
        { id: 'progress', label: 'PROGRESS' },
        { id: 'vocab', label: 'VOCAB' }
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
                                height: '10px',
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
const VocabContent = () => {
    const userId = localStorage.getItem('vocab_user_id') || (() => {
        const id = 'user_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        localStorage.setItem('vocab_user_id', id);
        return id;
    })();

    const themeColors = {
        mainBg: '#FDF8E4', 
        accent: '#815A5B', 
        text: '#5D4037',    
        cardBg: colors.cardBg,  
        line: '#E0D0D0',   
        white: '#FFFFFF'
    };

    const getGlobalKey = (key) => `cet4_vocab_${userId}_global_${key}`;

    // state
    const [mode, setMode] = useState('full');
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);
    const [answered, setAnswered] = useState(false);
    const [favorites, setFavorites] = useState(new Set());
    const [mistakes, setMistakes] = useState(new Set());
    const [answerHistory, setAnswerHistory] = useState({});
    const [wrongMessage, setWrongMessage] = useState('');

    const wrongTips = [
        "这次不对下次一定要对哦！",
        "小笨B，记住这个单词！",
        "嘿嘿，恭喜你蒙错啦！！",
        "猜不对就别猜呗，大大的脑袋空空的脑子~"
    ];

    const saveGlobalData = () => {
        localStorage.setItem(getGlobalKey('favorites'), JSON.stringify([...favorites]));
        localStorage.setItem(getGlobalKey('mistakes'), JSON.stringify([...mistakes]));
    };

    const loadGlobalData = () => {
        const favs = new Set(JSON.parse(localStorage.getItem(getGlobalKey('favorites')) || '[]'));
        const mists = new Set(JSON.parse(localStorage.getItem(getGlobalKey('mistakes')) || '[]'));
        setFavorites(favs);
        setMistakes(mists);
    };

    const toggleFavorite = (word) => {
        const newFavs = new Set(favorites);
        if (newFavs.has(word)) {
            newFavs.delete(word);
        } else {
            newFavs.add(word);
        }
        setFavorites(newFavs);
        saveGlobalData();

        if (mode === 'favorites' && !newFavs.has(word)) {
            setQuestions(prev => prev.filter(q => q.word !== word));
            setCurrentQuestionIndex(0);
        }
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setSelectedOption(null);
        setIsCorrect(null);
        setAnswered(false);
        setWrongMessage('');

        let newQuestions = [];

        if (newMode === 'full') {
            newQuestions = [...cet4Vocabulary].sort(() => Math.random() - 0.5);
        } else if (newMode === 'random') {
            newQuestions = [...cet4Vocabulary].sort(() => Math.random() - 0.5).slice(0, 20);
        } else if (newMode === 'favorites') {
            newQuestions = cet4Vocabulary.filter(w => favorites.has(w.word));
        } else if (newMode === 'mistakes') {
            newQuestions = cet4Vocabulary.filter(w => mistakes.has(w.word));
        }

        setQuestions(newQuestions);
        setCurrentQuestionIndex(0);
    };

    const nextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(p => p + 1);
            setSelectedOption(null);
            setIsCorrect(null);
            setAnswered(false);
            setWrongMessage('');
        }
    };

    const handleAnswer = (option) => {
        if (answered || !currentWord.word) return;

        const correct = option === currentWord.meaning;
        const newHistory = { ...answerHistory, [currentQuestionIndex]: correct };
        const newMistakes = new Set(mistakes);

        if (!correct) {
            newMistakes.add(currentWord.word);
            setWrongMessage(wrongTips[Math.floor(Math.random() * wrongTips.length)]);
        } else {
            newMistakes.delete(currentWord.word);
            setWrongMessage('');
        }

        setAnswerHistory(newHistory);
        setMistakes(newMistakes);
        setSelectedOption(option);
        setIsCorrect(correct);
        setAnswered(true);
        saveGlobalData();
    };

    useEffect(() => {
        loadGlobalData();
        switchMode('full');
    }, []);

    const currentWord = questions[currentQuestionIndex] || {};
    const total = questions.length;
    const answeredCount = Object.keys(answerHistory).length;
    const correctCount = Object.values(answerHistory).filter(Boolean).length;
    const accuracy = total > 0 && answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;


    const makeBtnStyle = (isActive) => ({
        padding: '0.6rem 1.2rem',
        backgroundColor: isActive ? themeColors.accent : 'transparent',
        color: isActive ? '#FFF' : themeColors.text,
        border: `1px solid ${isActive ? themeColors.accent : themeColors.line}`,
        borderRadius: '20px', 
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: isActive ? 'bold' : 'normal',
        transition: 'all 0.2s ease'
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                backgroundColor: themeColors.mainBg, 
                minHeight: '100vh',
                padding: '2rem 1.5rem',
                fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
            }}
        >
            <div style={{ maxWidth: '700px', margin: '0 auto' }}>

                {/* 标题区 */}
                <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: `1px dashed ${themeColors.line}`, paddingBottom: '1.5rem' }}
                >
                    <h1 style={{
                        color: themeColors.text,
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        marginBottom: '0.5rem',
                        letterSpacing: '1px'
                    }}>
                        CET-4 词汇训练
                    </h1>
                    <p style={{ color: themeColors.text, fontSize: '0.95rem', opacity: 0.8 }}>
                        在我考完四级之前不会更新词汇捏~
                    </p>
                </motion.div>

                {/* 模式切换按钮 */}
                <motion.div
                    initial={{ y: -10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '0.8rem',
                        marginBottom: '2rem'
                    }}
                >
                    {['full', 'random', 'favorites', 'mistakes'].map((key) => (
                        <motion.button
                            key={key}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => switchMode(key)}
                            style={makeBtnStyle(mode === key)}
                        >
                            {key === 'full' ? '完整模式' : key === 'random' ? '随机模式' : key === 'favorites' ? '收藏本' : '错题本'}
                        </motion.button>
                    ))}
                </motion.div>

                {/* 数据概览 */}
                {/* 关于本页导航栏 */}
                <motion.div
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)',
                        gap: '0.8rem',
                        marginBottom: '2rem'
                    }}
                >
                    {[
                        { label: '进度', value: `${currentQuestionIndex + 1}/${total}` },
                        { label: '正确率', value: `${accuracy}%` },
                        { label: '收藏', value: favorites.size },
                        { label: '错题', value: mistakes.size }
                    ].map((item, i) => (
                        <div
                            key={i}
                            style={{
                                backgroundColor: themeColors.cardBg, 
                                padding: '0.8rem',
                                borderRadius: '12px',
                                textAlign: 'center',
                                border: `1px solid ${themeColors.line}`,
                                color: themeColors.text
                            }} //与本STU模块的主题相同
                        >  
                            <div style={{ fontSize: '0.8rem', marginBottom: '0.3rem', opacity: 0.8 }}>{item.label}</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 'bold', color: themeColors.accent }}>
                                {item.value}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* 题目卡片 */}
                {questions.length > 0 ? (
                    <motion.div
                        key={`question-${currentQuestionIndex}`}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        style={{
                            backgroundColor: themeColors.cardBg,
                            borderRadius: '16px',
                            padding: '2rem',
                            position: 'relative',
                            border: `1px solid ${themeColors.line}`,
                            boxShadow: '0 4px 12px rgba(129, 90, 91, 0.05)' //阴影，淡
                        }}
                    >
                        {/* 收藏btn */}
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => toggleFavorite(currentWord.word)}
                            style={{
                                position: 'absolute',
                                top: '1.2rem',
                                right: '1.2rem',
                                background: 'none',
                                border: 'none',
                                fontSize: '1.5rem',
                                cursor: 'pointer',
                                color: favorites.has(currentWord.word) ? themeColors.accent : '#ccc'
                            }}
                        >
                            {favorites.has(currentWord.word) ? '❤️' : '🤍'}
                        </motion.button>

                        {/* 单词 */}
                        <motion.h2
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            style={{
                                textAlign: 'center',
                                fontSize: '2.2rem',
                                fontWeight: '600',
                                color: themeColors.text,
                                margin: '0 0 2rem 0',
                                letterSpacing: '0.5px'
                            }}
                        >
                            {currentWord.word}
                        </motion.h2>

                        {/* 选项list */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                            {currentWord.options?.map((option, idx) => {
                                let bg = 'transparent';
                                let border = themeColors.line;
                                let color = themeColors.text;

                                // before答题
                                if (answered && selectedOption === option) {
                                    if (isCorrect) {
                                        bg = 'rgba(129, 90, 91, 0.1)'; 
                                        border = themeColors.accent;
                                        color = themeColors.accent;
                                    } else {
                                        bg = 'rgba(200, 100, 100, 0.1)'; 
                                        border = '#c69898';
                                        color = '#dfb0b0';
                                    }
                                }

                                return (
                                    <motion.button
                                        key={idx}
                                        whileHover={!answered ? { x: 5 } : {}}
                                        whileTap={{ scale: 0.99 }}
                                        onClick={() => handleAnswer(option)}
                                        disabled={answered}
                                        style={{
                                            padding: '1rem 1.5rem',
                                            textAlign: 'left',
                                            borderRadius: '10px',
                                            border: `2px solid ${border}`,
                                            backgroundColor: bg,
                                            color: color,
                                            fontSize: '1rem',
                                            fontWeight: '500',
                                            cursor: answered ? 'default' : 'pointer',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {option}
                                    </motion.button>
                                );
                            })}
                        </div>

                        {/* comeback area */}
                        {answered && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                style={{ marginTop: '2rem', textAlign: 'center' }}
                            >
                                {!isCorrect && (
                                    <p style={{ color: themeColors.text, fontSize: '0.95rem', marginBottom: '0.5rem', opacity: 0.8 }}>
                                        {wrongMessage}
                                    </p>
                                )}

                                <div style={{
                                    fontSize: '1.2rem',
                                    fontWeight: 'bold',
                                    marginBottom: '1.5rem',
                                    color: isCorrect ? themeColors.accent : '#A67C7C'
                                }}>
                                    {isCorrect ? '你答对啦！你咋这么厉害！' : `正确答案：${currentWord.meaning}`}
                                </div>

                                {currentQuestionIndex < total - 1 ? (
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={nextQuestion}
                                        style={{
                                            padding: '0.8rem 2rem',
                                            backgroundColor: themeColors.accent,
                                            color: '#FFF',
                                            border: 'none',
                                            borderRadius: '25px',
                                            fontSize: '1rem',
                                            fontWeight: 'bold',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 10px rgba(129, 90, 91, 0.2)'
                                        }}
                                    >
                                        下一题
                                    </motion.button>
                                ) : (
                                    <div style={{
                                        padding: '0.8rem 1.5rem',
                                        backgroundColor: 'rgba(255,255,255,0.5)',
                                        borderRadius: '12px',
                                        display: 'inline-block',
                                        color: themeColors.text
                                    }}>
                                        哇哇哇！本组练习已完成，小弟膜拜膜拜你！
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '3rem', color: themeColors.text, opacity: 0.7 }}>
                        {mode === 'favorites'
                            ? '你还没有收藏的单词哦'
                            : mode === 'mistakes'
                                ? '目前没有错题，请继续保持哦！'
                                : '嘿嘿,正在加载词汇...'}
                    </div>
                )}
            </div>
        </motion.div>
    );
};
function StuPage({ onBack }) {
    const [activeTab, setActiveTab] = useState('insights');

    const renderContent = () => {
        switch (activeTab) {
            case 'insights': return <InsightsContent />;
            case 'progress': return <ProgressContent />;
            case 'vocab': return <VocabContent />;
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

            <div className="hide-scrollbar" style={{
                flex: 1,
                paddingTop: '6rem',
                paddingBottom: '2rem',
                paddingLeft: '1rem',
                paddingRight: '1rem',
                overflowY: 'auto'
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
                ← 返回
            </motion.button>
        </div>
    );
}

export default StuPage;