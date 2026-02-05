import { PRODUCTS } from '@/lib/data';
import ProductCard from '@/components/ProductCard';

export default function ShopPage() {
    return (
        <div className="w-full min-h-screen bg-background border-t border-l border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-0">
            {PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
            {/* Fillers to maintain grid shape if needed? No, standard grid behavior is fine */}
        </div>
    );
}
