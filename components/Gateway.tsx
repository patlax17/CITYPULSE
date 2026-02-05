'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';

export default function Gateway() {
    const { isEntered, enterSite } = useStore();

    return (
        <AnimatePresence mode="wait">
            {!isEntered && (
                <motion.section
                    key="gateway"
                    className="fixed inset-0 z-[200] bg-background flex flex-col items-center justify-center cursor-pointer"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05, pointerEvents: 'none' }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    onClick={enterSite}
                >
                    <div className="flex flex-col items-center justify-center gap-8">
                        <motion.h1
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
                            className="text-6xl md:text-9xl font-black tracking-tighter text-foreground uppercase text-center leading-[0.8]"
                        >
                            City<br />Pulse
                        </motion.h1>

                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="px-8 py-3 border border-zinc-800 text-accent font-mono text-sm uppercase tracking-widest hover:bg-accent hover:text-black transition-all duration-300"
                        >
                            Enter The Pulse
                        </motion.button>
                    </div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        transition={{ delay: 1.5 }}
                        className="absolute bottom-8 left-0 right-0 text-center text-zinc-600 font-mono text-xs uppercase"
                    >
                        Restricted Access Area
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
