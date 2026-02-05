'use client';
import { useState } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';

const REWARDS = [
    'NO LUCK',
    '10% OFF',
    'NO LUCK',
    'FREE SHIP',
    'NO LUCK',
    'ACCESS KEY',
];

export default function VaultPage() {
    const { spinsAvailable, decrementSpin } = useStore();
    const [result, setResult] = useState<string | null>(null);
    const controls = useAnimation();
    const [isSpinning, setIsSpinning] = useState(false);

    const handleSpin = async () => {
        if (spinsAvailable <= 0 || isSpinning) return;

        decrementSpin();
        setIsSpinning(true);
        setResult(null);

        // Random rotation
        const rotations = 5 + Math.random() * 5; // 5 to 10 full spins
        // We want the indicator (top) to point to the result.
        // If top is 0deg.
        // We rotate the wheel.
        // To land on index i, we need rotation such that index i is at 0deg?
        // Actually simplicity: just spin random and show random result for now, or match it.
        // Let's just spin and pick a weighted result (mostly NO LUCK or 10% OFF).

        const outcome = Math.random() > 0.8 ? '10% OFF' : 'NO LUCK';
        const angle = rotations * 360 + (360 * Math.random());

        await controls.start({
            rotate: angle,
            transition: { duration: 3, ease: [0.1, 0.8, 0.2, 1] } // Decelerate
        });

        setResult(outcome);
        setIsSpinning(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] border-t border-zinc-800 bg-zinc-950 text-center gap-8 relative overflow-hidden">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-foreground z-10 leading-none">
                Circuit<br />Access
            </h1>

            <div className="font-mono text-zinc-500 text-xs w-full max-w-md flex justify-between px-8 z-10 border-b border-zinc-800 pb-2">
                <span>SESSION: 0X291</span>
                <span className={spinsAvailable > 0 ? "text-accent" : "text-red-500"}>
                    SPINS LEFT: {spinsAvailable}
                </span>
            </div>

            {/* Wheel Visual */}
            <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-zinc-700 bg-black flex items-center justify-center overflow-hidden z-10 shadow-2xl shadow-black">
                {/* Tick Marker */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-t-[15px] border-t-accent border-r-[10px] border-r-transparent z-20" />

                <motion.div
                    animate={controls}
                    className="w-full h-full relative"
                    initial={{ rotate: 0 }}
                >
                    {/* Segments */}
                    {REWARDS.map((reward, i) => (
                        <div
                            key={i}
                            className="absolute w-full h-full flex justify-center pt-2 transform origin-center text-[10px] font-mono uppercase text-zinc-600"
                            style={{ transform: `rotate(${i * (360 / REWARDS.length)}deg)` }}
                        >
                            <div className="relative h-full flex flex-col items-center">
                                <span className="font-bold tracking-widest">{reward}</span>
                                <div className="h-full w-[1px] bg-zinc-900 mt-2" />
                            </div>
                        </div>
                    ))}
                    {/* Center Hub */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-zinc-900 rounded-full border border-zinc-800 z-10 flex items-center justify-center">
                        <div className="w-4 h-4 bg-accent rounded-full animate-pulse" />
                    </div>
                </motion.div>
            </div>

            <div className="z-10 flex flex-col items-center gap-4">
                <button
                    onClick={handleSpin}
                    disabled={spinsAvailable === 0 || isSpinning}
                    className="px-12 py-4 border border-zinc-700 bg-zinc-900 text-foreground font-bold uppercase tracking-widest hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:hover:bg-zinc-900 disabled:hover:text-foreground disabled:cursor-not-allowed"
                >
                    {isSpinning ? 'Decrypting...' : spinsAvailable === 0 ? 'Limit Reached' : 'Initiate Sequence'}
                </button> <br />

                <AnimatePresence>
                    {result && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-accent font-mono text-lg uppercase bg-accent/10 px-4 py-2 border border-accent/20"
                        >
                            Result: {result}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20 pointer-events-none" />
        </div>
    );
}
