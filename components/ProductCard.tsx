'use client';
import { Product } from '@/lib/data';
import { useStore } from '@/context/StoreContext';
import { formatCurrency } from '@/lib/currency';

export default function ProductCard({ product }: { product: Product }) {
    const { addToCart, currency } = useStore();

    return (
        <div className="group relative bg-background border-r border-b border-zinc-800 flex flex-col h-full aspect-[3/5] overflow-hidden">
            {/* Status Label */}
            <div className="absolute top-3 left-3 z-10">
                {product.status !== 'AVAILABLE' && (
                    <span className="bg-accent text-black px-2 py-1 text-[10px] font-mono font-bold uppercase tracking-wider">
                        {product.status}
                    </span>
                )}
            </div>

            {/* Image Area */}
            <div className="relative flex-1 bg-zinc-900 group-hover:opacity-90 transition-opacity duration-500">
                <img
                    src={product.image}
                    alt={product.title}
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </div>

            {/* Info Area */}
            <div className="p-4 flex flex-col gap-3 justify-between bg-background">
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-sm font-bold uppercase leading-tight text-foreground">{product.title}</h3>
                    <span className="font-mono text-xs text-zinc-400 whitespace-nowrap">{formatCurrency(product.price, currency)}</span>
                </div>

                <button
                    disabled={product.status === 'SOLD OUT'}
                    onClick={() => addToCart(product)}
                    className="w-full py-3 border border-zinc-800 text-zinc-400 font-mono text-[10px] uppercase tracking-widest hover:border-accent hover:text-accent hover:bg-accent/5 disabled:opacity-50 disabled:hover:border-zinc-800 disabled:hover:text-zinc-400 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {product.status === 'SOLD OUT' ? 'Sold Out' : 'Add to Cart'}
                </button>
            </div>
        </div>
    )
}
