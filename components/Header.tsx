'use client';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Header() {
    const { cart, setIsCartOpen, setIsNavOpen, isEntered } = useStore();

    if (!isEntered) return null;

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 h-[80px] z-[50] flex items-center justify-between px-6 border-b border-zinc-900/50 bg-background/90 backdrop-blur-md"
        >
            {/* Left - Menu Trigger (Implicitly adding for navigation access) */}
            <button
                onClick={() => setIsNavOpen(true)}
                className="p-2 hover:text-accent transition-colors"
                aria-label="Open Menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Center - Logo */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-2xl font-black uppercase tracking-tighter hover:text-accent transition-colors cursor-pointer z-10">
                City Pulse
            </Link>

            {/* Right - Icons */}
            <div className="flex items-center gap-4">
                <button className="p-2 hover:text-accent transition-colors" aria-label="Search">
                    <Search className="w-5 h-5" />
                </button>
                <button
                    onClick={() => setIsCartOpen(true)}
                    className="p-2 relative hover:text-accent transition-colors"
                    aria-label="Open Cart"
                >
                    <ShoppingBag className="w-5 h-5" />
                    {cart.length > 0 && (
                        <span className="absolute top-0 right-0 bg-accent text-black text-[10px] font-mono font-bold h-4 w-4 flex items-center justify-center rounded-full">
                            {cart.reduce((acc, item) => acc + item.quantity, 0)}
                        </span>
                    )}
                </button>
            </div>
        </motion.header>
    );
}
