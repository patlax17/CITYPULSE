'use client';
import { useState } from 'react';
import { Product } from '@/lib/data';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/currency';
import { Loader2 } from 'lucide-react';

const SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, currency } = useStore();
    const [selectedSize, setSelectedSize] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const [sizeError, setSizeError] = useState(false);

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
        <div className="group relative bg-background border-r border-b border-zinc-800 flex flex-col h-full overflow-hidden">
            {/* Status Label */}
            <div className="absolute top-3 left-3 z-10">
                {product.status !== 'AVAILABLE' && (
                    <span className="bg-accent text-black px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {product.status}
                    </span>
                )}
            </div>

            {/* Image Area */}
            <div className="relative aspect-[3/4] bg-zinc-900 group-hover:opacity-90 transition-opacity duration-500">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Info Area */}
            <div className="p-4 flex flex-col gap-3 bg-background">
                {/* Title + Price */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold uppercase leading-tight text-foreground">
                        {product.title}
                    </h3>
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

                {/* Buy Now */}
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

                {/* Add to Cart (secondary) */}
                {!isSoldOut && (
                    <button
                        onClick={() => addToCart(product)}
                        className="w-full py-2 border border-zinc-800 text-zinc-500 font-mono text-[9px] uppercase tracking-widest hover:border-zinc-600 hover:text-zinc-400 transition-all duration-300"
                    >
                        + Add to Cart
                    </button>
                )}
            </div>
        </div>
    );
}
