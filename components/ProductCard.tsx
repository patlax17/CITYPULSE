'use client';
import { useState, useCallback } from 'react';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { ShoppingBag, Loader2 } from 'lucide-react';
import { formatCurrency } from '@/lib/currency';
import Link from 'next/link';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCard({ product }: { product: Product }) {
    const { currency, addToCart } = useStore();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [sizeError, setSizeError] = useState(false);
    const [isFlipped, setIsFlipped] = useState(false);

    // ── Desktop: Hover flip ──
    const handleMouseEnter = useCallback(() => setIsFlipped(true), []);
    const handleMouseLeave = useCallback(() => setIsFlipped(false), []);

    // ── Mobile: Tap-to-flip toggle ──
    const handleTap = useCallback(() => {
        if (window.matchMedia('(pointer: coarse)').matches) {
            setIsFlipped((prev) => !prev);
        }
    }, []);

    // ── Checkout: Original Stripe Checkout Session via API route ──
    const handleBuyNow = async () => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 1500);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ productId: product.id, size: selectedSize }),
            });
            const { url, error } = await res.json();
            if (error) throw new Error(error);
            window.location.href = url; // Redirect to Stripe Checkout
        } catch (err) {
            console.error('[CHECKOUT]', err);
        } finally {
            setLoading(false);
        }
    };

    const isSoldOut = product.status === 'SOLD OUT';

    return (
        <div
            className="group relative bg-background border-r border-b border-zinc-800 flex flex-col h-full overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >


            {/* ── "BACK VIEW" label — Pulse Green on black ── */}
            <div
                className="absolute top-3 right-3 z-10"
                style={{
                    opacity: isFlipped ? 1 : 0,
                    transition: 'opacity 400ms ease-in-out',
                }}
            >
                <span
                    className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest border border-zinc-700"
                    style={{ background: '#000', color: '#CC7722' }}
                >
                    Back View
                </span>
            </div>

            {/* ── Image Area — click to view PDP, hover/tap to flip ── */}
            <Link
                href={`/shop/${product.id}`}
                className="relative aspect-[3/4] bg-zinc-900 block"
                onClick={(e) => {
                    // On touch devices, first tap flips — second tap navigates
                    if (window.matchMedia('(pointer: coarse)').matches) {
                        if (!isFlipped) {
                            e.preventDefault();
                            handleTap();
                        }
                    }
                }}
            >
                {/* Front Image */}
                <img
                    src={product.frontImage}
                    alt={`${product.title} — Front`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        opacity: isFlipped ? 0 : 1,
                        transition: 'opacity 400ms ease-in-out',
                        filter: 'blur(0.3px) contrast(0.97) brightness(1.02)',
                    }}
                />
                {/* Back Image */}
                <img
                    src={product.backImage}
                    alt={`${product.title} — Back`}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{
                        opacity: isFlipped ? 1 : 0,
                        transition: 'opacity 400ms ease-in-out',
                        filter: 'blur(0.3px) contrast(0.97) brightness(1.02)',
                    }}
                />
            </Link>

            {/* ── Info Area ── */}
            <div className="p-4 flex flex-col gap-3 bg-background">
                {/* Title + Price */}
                <div className="flex justify-between items-start gap-2">
                    <Link href={`/shop/${product.id}`} className="hover:text-accent transition-colors">
                        <h3 className="text-sm font-bold uppercase leading-tight text-foreground">
                            {product.title}
                        </h3>
                    </Link>
                    <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">
                        {formatCurrency(product.price, currency)}
                    </span>
                </div>

                {/* Size Selector */}
                {!isSoldOut && (
                    <div className="flex gap-1">
                        {SIZES.map((size) => (
                            <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`flex-1 py-1 font-mono text-[9px] uppercase border transition-colors duration-150 ${selectedSize === size
                                    ? 'border-accent text-accent bg-accent/10'
                                    : sizeError
                                        ? 'border-red-500/60 text-red-500/60'
                                        : 'border-zinc-800 text-zinc-600 hover:border-zinc-600 hover:text-zinc-400'
                                    }`}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                )}

                {/* Buy Now — Stripe Checkout via API */}
                <button
                    disabled={isSoldOut || loading}
                    onClick={handleBuyNow}
                    className="w-full py-3 border font-mono text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed border-accent text-accent hover:bg-accent hover:text-black"
                >
                    {loading ? (
                        <><Loader2 className="w-3 h-3 animate-spin" /> Processing…</>
                    ) : isSoldOut ? (
                        'Sold Out'
                    ) : (
                        'Buy Now'
                    )}
                </button>

                {/* Add to Cart — secondary action */}
                {!isSoldOut && (
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2.5 border border-zinc-700 text-zinc-500 font-mono text-[10px] uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 hover:border-zinc-500 hover:text-zinc-300"
                    >
                        <ShoppingBag className="w-3 h-3" />
                        Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}
