'use client';
import { ShoppingBag, Search, Menu } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import CurrencyToggle from './CurrencyToggle';

export default function Header() {
    const { cart, setIsCartOpen, setIsNavOpen, isEntered, resetGate } = useStore();
    const router = useRouter();

    if (!isEntered) return null;

    const handleLogoClick = () => {
        resetGate();
        router.push('/');
    };

    return (
        <motion.header
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 h-[80px] z-[50] flex items-center justify-between px-6 border-b border-zinc-900/50 bg-background/90 backdrop-blur-md"
        >
            {/* Left - Menu Trigger */}
            <button
                onClick={() => setIsNavOpen(true)}
                className="p-2 hover:text-accent transition-colors"
                aria-label="Open Menu"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Center - Logo (resets gate on click) */}
            <button
                onClick={handleLogoClick}
                className="absolute left-1/2 -translate-x-1/2 font-blackletter text-ochre text-3xl hover:opacity-80 transition-opacity cursor-pointer z-10"
                style={{ letterSpacing: '0.01em', lineHeight: 1 }}
            >
                City Pulse
            </button>

            {/* Right - Icons */}
            <div className="flex items-center gap-4">
                <CurrencyToggle />
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
