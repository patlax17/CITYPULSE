'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { X } from 'lucide-react';

export default function NotificationModal() {
    const { isEntered } = useStore();
    const [isOpen, setIsOpen] = useState(false);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        if (!isEntered) return;
        if (hasTriggered) return;

        // Trigger after 10 seconds
        const timer = setTimeout(() => {
            setIsOpen(true);
            setHasTriggered(true);
        }, 10000);

        // Trigger after scroll
        const handleScroll = () => {
            if (window.scrollY > 200) { // arbitrary scroll threshold
                setIsOpen(true);
                setHasTriggered(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isEntered, hasTriggered]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[150] flex items-center justify-center p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        className="bg-zinc-900 border border-zinc-800 p-8 md:p-12 max-w-md w-full relative shadow-2xl"
                    >
                        <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                            <X className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col items-center text-center">
                            <h2 className="text-3xl font-black uppercase tracking-tighter mb-4 text-foreground leading-none">
                                This Isn&apos;t<br />For Everyone.
                            </h2>
                            <p className="text-accent font-mono text-xs uppercase mb-8 tracking-widest">
                                Join the circuit for private drops.
                            </p>

                            <form className="w-full flex flex-col gap-3" onSubmit={(e) => { e.preventDefault(); setIsOpen(false); }}>
                                <input
                                    type="email"
                                    placeholder="ENTER EMAIL"
                                    className="w-full bg-black border border-zinc-700 p-4 text-white font-mono text-xs placeholder:text-zinc-600 focus:border-accentOutline-none uppercase tracking-wider focus:outline-none focus:border-accent transition-colors"
                                />
                                <button className="w-full bg-foreground text-black font-black uppercase py-4 hover:bg-accent transition-colors tracking-widest text-sm">
                                    Unlock Access
                                </button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
