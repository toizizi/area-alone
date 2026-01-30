import { motion } from 'framer-motion';
import { colors } from '../constants/colors';

function HomePage({ onNavigate, onTogglePlayer }) {
    const lines = [];
    if (typeof window !== 'undefined') {
        for (let i = 0; i < 50; i++) {
            const colorPalette = [colors.line1, colors.line2, colors.line3, colors.line4, colors.line5, colors.line6];
            const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * window.innerHeight;
            const length = 100 + Math.random() * 300;
            const angle = Math.random() * Math.PI * 2;
            const endX = startX + Math.cos(angle) * length;
            const endY = startY + Math.sin(angle) * length;

            const duration = 10 + Math.random() * 15;
            const delay = Math.random() * 5;
            const opacity = 0.15 + Math.random() * 0.25;

            lines.push({ color, startX, startY, endX, endY, duration, delay, opacity });
        }
    }

    const DynamicLine = ({ line }) => (
        <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
                opacity: [line.opacity * 0.5, line.opacity, line.opacity * 0.5],
                scale: [1, 1.05, 1]
            }}
            transition={{
                duration: line.duration,
                repeat: Infinity,
                repeatType: "reverse",
                delay: line.delay,
                ease: "easeInOut"
            }}
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        >
            <svg width="100%" height="100%" style={{ position: 'absolute', overflow: 'visible' }}>
                <defs>
                    <filter id={`glow-${line.color}`}>
                        <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                        <feMerge>
                            <feMergeNode in="coloredBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                <line
                    x1={line.startX} y1={line.startY}
                    x2={line.endX} y2={line.endY}
                    stroke={line.color}
                    strokeWidth="1.5"
                    opacity={line.opacity}
                    strokeLinecap="round"
                    filter={`url(#glow-${line.color})`}
                />
            </svg>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ width: '100%', height: '100%', backgroundColor: colors.bg, position: 'relative', overflow: 'hidden' }}
        >
            {lines.map((line, i) => (
                <DynamicLine key={i} line={line} />
            ))}

            <div style={{
                position: 'relative',
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                textAlign: 'center',
                pointerEvents: 'none'
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        color: colors.line3,
                        margin: 0,
                        fontWeight: 700,
                        letterSpacing: -2,
                        textShadow: '0 4px 20px rgba(129, 90, 91, 0.1)'
                    }}
                >
                    Lovin Myself
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 1 }}
                    style={{ fontSize: 'clamp(1rem, 2vw, 1.5rem)', color: colors.line3, marginTop: '1.5rem', maxWidth: '600px', lineHeight: 1.6 }}
                >
                    I've allowed myself to drift.
                </motion.p>

                <div style={{ marginTop: '4rem', display: 'flex', gap: '2rem', pointerEvents: 'auto' }}>
                    <motion.button
                        style={{
                            backgroundColor: 'rgba(129, 90, 91, 0.85)',
                            color: '#fff',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            padding: '14px 32px',
                            border: 'none',
                            borderRadius: '30px',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 4px 15px rgba(129, 90, 91, 0.2)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(129, 90, 91, 1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('stu')}
                    >
                        STU
                    </motion.button>

                    <motion.button
                        style={{
                            padding: '14px 32px',
                            border: 'none',
                            borderRadius: '30px',
                            backgroundColor: 'rgba(129, 90, 91, 0.85)',
                            color: '#fff',
                            fontSize: '1rem',
                            cursor: 'pointer',
                            backdropFilter: 'blur(5px)',
                            boxShadow: '0 4px 15px rgba(129, 90, 91, 0.2)'
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, type: 'spring', stiffness: 100 }}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(129, 90, 91, 1)' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onNavigate('blog')}
                    >
                        BLOG
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default HomePage;
