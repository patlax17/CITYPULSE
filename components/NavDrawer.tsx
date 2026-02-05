'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { X } from 'lucide-react';

const LINKS = [
    { href: '/', label: 'Home' },
    { href: '/shop', label: 'Shop' },
    { href: '/vault', label: 'The Gateway' },
    { href: '/archive', label: 'Archive' },
    { href: '/experience', label: 'Experience' },
    { href: '/contact', label: 'Contact' },
];

export default function NavDrawer() {
    const { isNavOpen, setIsNavOpen } = useStore();

    return (
        <AnimatePresence>
            {isNavOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsNavOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[400px] z-[100] bg-black border-l border-zinc-800 flex flex-col"
                    >
                        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 to-black" />

                        <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-center p-6 border-b border-zinc-900">
                                <span className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Navigation</span>
                                <button onClick={() => setIsNavOpen(false)} className="hover:text-accent transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <nav className="flex flex-col px-8 py-12 gap-8">
                                {LINKS.map((link, index) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsNavOpen(false)}
                                        className="group flex items-center gap-4"
                                    >
                                        <span className="text-zinc-700 font-mono text-xs mt-1">0{index + 1}</span>
                                        <span className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground group-hover:text-accent transition-colors">
                                            {link.label}
                                        </span>
                                    </Link>
                                ))}
                            </nav>

                            <div className="mt-auto p-8 border-t border-zinc-900">
                                <div className="flex flex-col gap-2 font-mono text-xs text-zinc-500 uppercase">
                                    <p>City Pulse Global</p>
                                    <p>EST. 2026</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
