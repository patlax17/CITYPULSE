'use client';
import { useStore } from '@/context/StoreContext';

export default function CurrencyToggle() {
    const { currency, toggleCurrency } = useStore();

    return (
        <button
            onClick={toggleCurrency}
            className="px-3 py-1.5 border border-zinc-800 bg-background hover:border-accent hover:text-accent transition-colors font-mono text-xs uppercase tracking-wider"
            aria-label="Toggle Currency"
        >
            {currency}
        </button>
    );
}
