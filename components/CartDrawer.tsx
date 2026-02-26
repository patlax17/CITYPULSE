'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export default function CartDrawer() {
    const { isCartOpen, setIsCartOpen, cart, removeFromCart } = useStore();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
        if (cart.length === 0 || isCheckingOut) return;
        setIsCheckingOut(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    items: cart.map((item) => ({
                        id: item.id,
                        size: item.size,
                        quantity: item.quantity,
                    })),
                }),
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            } else {
                alert('Checkout failed. Please try again.');
                setIsCheckingOut(false);
            }
        } catch {
            alert('Something went wrong. Please try again.');
            setIsCheckingOut(false);
        }
    };


    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
                    />

                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'tween', duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="fixed top-0 right-0 bottom-0 w-full md:w-[450px] z-[100] bg-black border-l border-zinc-800 flex flex-col"
                    >
                        <div className="flex justify-between items-center p-6 border-b border-zinc-900">
                            <span className="font-mono text-sm uppercase tracking-widest">Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
                            <button onClick={() => setIsCartOpen(false)} className="hover:text-accent transition-colors">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
                            {cart.length === 0 ? (
                                <div className="flex-1 flex items-center justify-center text-zinc-600 font-mono text-xs uppercase">
                                    Cart Empty
                                </div>
                            ) : (
                                cart.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-20 h-24 bg-zinc-900 relative border border-zinc-800 flex-shrink-0 overflow-hidden">
                                            <Image
                                                src={item.image || item.frontImage}
                                                alt={item.title}
                                                fill
                                                className="object-cover"
                                                sizes="80px"
                                            />
                                        </div>
                                        <div className="flex flex-col flex-1 justify-between py-1">
                                            <div>
                                                <h4 className="font-bold uppercase text-sm leading-tight text-foreground">{item.title}</h4>
                                                <p className="text-zinc-500 font-mono text-xs mt-1">${item.price}</p>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <span className="font-mono text-xs text-zinc-400">QTY: {item.quantity}</span>
                                                <button onClick={() => removeFromCart(item.id)} className="text-[10px] uppercase text-zinc-600 hover:text-red-500 transition-colors">Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="p-6 border-t border-zinc-900 bg-black">
                            <div className="flex justify-between items-end mb-6">
                                <span className="font-mono text-xs uppercase text-zinc-500">Subtotal</span>
                                <span className="font-mono text-xl text-foreground">${subtotal}.00</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                disabled={isCheckingOut || cart.length === 0}
                                className="w-full py-4 border border-zinc-800 text-foreground font-bold uppercase tracking-widest hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isCheckingOut ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                                ) : (
                                    'Checkout'
                                )}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
