'use client';
import { useState, useCallback } from 'react';
import { Product } from '@/data/products';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/currency';
import { Loader2, ArrowLeft, ShoppingBag, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductDetail({ product }: { product: Product }) {
    const { currency, addToCart } = useStore();
    const [selectedSize, setSelectedSize] = useState('');
    const [sizeError, setSizeError] = useState(false);
    const [activeImage, setActiveImage] = useState<'front' | 'back'>('front');
    const [loading, setLoading] = useState(false);
    const [addedToCart, setAddedToCart] = useState(false);

    const isSoldOut = product.status === 'SOLD OUT';

    const handleAddToCart = useCallback(() => {
        if (!selectedSize) {
            setSizeError(true);
            setTimeout(() => setSizeError(false), 1500);
            return;
        }
        addToCart({ ...product, size: selectedSize } as Product & { size: string });
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 2000);
    }, [selectedSize, product, addToCart]);

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
            window.location.href = url;
        } catch (err) {
            console.error('[CHECKOUT]', err);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background pt-[80px]">

            {/* ── Breadcrumb ── */}
            <div className="border-b border-zinc-900 px-6 py-3 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-zinc-600">
                <Link href="/shop" className="hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowLeft className="w-3 h-3" />
                    Shop
                </Link>
                <ChevronRight className="w-3 h-3 text-zinc-800" />
                <span className="text-zinc-500 truncate">{product.name}</span>
            </div>

            {/* ── Main Layout ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[calc(100vh-120px)]">

                {/* ── LEFT: Image Gallery ── */}
                <div className="relative bg-zinc-950 border-r border-zinc-900">

                    {/* Main Image */}
                    <div className="relative aspect-[3/4] md:aspect-auto md:h-full md:min-h-[600px] overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.35 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={activeImage === 'front' ? product.frontImage : product.backImage}
                                    alt={`${product.name} — ${activeImage === 'front' ? 'Front' : 'Back'}`}
                                    fill
                                    priority
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    style={{ filter: 'contrast(0.97) brightness(1.02)' }}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Status badge */}
                        {product.status !== 'AVAILABLE' && (
                            <div className="absolute top-4 left-4 z-10">
                                <span
                                    className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest border"
                                    style={{
                                        background: '#000',
                                        color: product.status === 'SOLD OUT' ? '#ef4444' : '#CC7722',
                                        borderColor: product.status === 'SOLD OUT' ? '#ef4444' : '#CC7722',
                                    }}
                                >
                                    {product.status}
                                </span>
                            </div>
                        )}

                        {/* View label */}
                        <div className="absolute top-4 right-4 z-10">
                            <span className="px-2 py-1 text-[9px] font-mono uppercase tracking-widest border border-zinc-700 bg-black text-zinc-500">
                                {activeImage === 'front' ? 'Front View' : 'Back View'}
                            </span>
                        </div>
                    </div>

                    {/* Thumbnail toggle */}
                    <div className="absolute bottom-4 left-4 flex gap-2 z-10">
                        {(['front', 'back'] as const).map((view) => (
                            <button
                                key={view}
                                onClick={() => setActiveImage(view)}
                                className="relative w-14 h-16 border overflow-hidden transition-all duration-200"
                                style={{
                                    borderColor: activeImage === view ? '#CC7722' : '#27272a',
                                    opacity: activeImage === view ? 1 : 0.55,
                                }}
                                aria-label={`View ${view}`}
                            >
                                <Image
                                    src={view === 'front' ? product.frontImage : product.backImage}
                                    alt={view}
                                    fill
                                    className="object-cover"
                                    sizes="56px"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* ── RIGHT: Product Info ── */}
                <div className="flex flex-col justify-center px-8 md:px-12 py-12 gap-8">

                    {/* Category tag */}
                    <div>
                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent border border-accent/30 px-2 py-1">
                            {product.category}
                        </span>
                    </div>

                    {/* Title + Price */}
                    <div className="space-y-3">
                        <h1 className="text-3xl md:text-4xl font-black uppercase leading-tight text-foreground tracking-tighter">
                            {product.name}
                        </h1>
                        <div className="flex items-baseline gap-4">
                            <span className="font-mono text-2xl text-foreground">
                                {formatCurrency(product.price, currency)}
                            </span>
                            <span className="font-mono text-xs text-zinc-600 uppercase tracking-widest">
                                Free shipping over $200
                            </span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-900" />

                    {/* Size Selector */}
                    {!isSoldOut && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-500">
                                    Select Size
                                </span>
                                {sizeError && (
                                    <motion.span
                                        initial={{ opacity: 0, x: 4 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="font-mono text-[10px] uppercase tracking-widest text-red-500"
                                    >
                                        Please select a size
                                    </motion.span>
                                )}
                            </div>
                            <div className="grid grid-cols-5 gap-2">
                                {SIZES.map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedSize(size)}
                                        className={`py-3 font-mono text-xs uppercase border transition-all duration-200 ${selectedSize === size
                                                ? 'border-accent text-accent bg-accent/10'
                                                : sizeError
                                                    ? 'border-red-500/60 text-red-500/60'
                                                    : 'border-zinc-800 text-zinc-600 hover:border-zinc-500 hover:text-zinc-300'
                                            }`}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* CTAs */}
                    <div className="flex flex-col gap-3">
                        {/* Buy Now → Stripe */}
                        <button
                            onClick={handleBuyNow}
                            disabled={isSoldOut || loading}
                            className="w-full py-4 border border-accent text-accent font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:bg-accent hover:text-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                            ) : isSoldOut ? (
                                'Sold Out'
                            ) : (
                                'Buy Now'
                            )}
                        </button>

                        {/* Add to Cart */}
                        {!isSoldOut && (
                            <button
                                onClick={handleAddToCart}
                                className="w-full py-4 border border-zinc-800 text-zinc-400 font-mono text-xs uppercase tracking-[0.25em] transition-all duration-300 hover:border-zinc-600 hover:text-zinc-200 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-4 h-4" />
                                {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                            </button>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="border-t border-zinc-900" />

                    {/* Product details */}
                    <div className="space-y-3 font-mono text-xs text-zinc-600 uppercase tracking-widest">
                        <div className="flex justify-between">
                            <span>Material</span>
                            <span className="text-zinc-400">Heavyweight Cotton Blend</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Fit</span>
                            <span className="text-zinc-400">Relaxed / Oversized</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Origin</span>
                            <span className="text-zinc-400">Newark, NJ — Est. 2026</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Shipping</span>
                            <span className="text-zinc-400">Worldwide · 5–14 Days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
