'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/data';
import { Currency } from '@/lib/currency';

interface CartItem extends Product {
    quantity: number;
    size?: string;
}

interface StoreContextType {
    isEntered: boolean;
    enterSite: () => void;
    resetGate: () => void;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
    isNavOpen: boolean;
    setIsNavOpen: (isOpen: boolean) => void;
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    spinsAvailable: number;
    decrementSpin: () => void;
    resetSpins: () => void;
    currency: Currency;
    toggleCurrency: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [isEntered, setIsEntered] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [spinsAvailable, setSpinsAvailable] = useState(2);
    const [currency, setCurrency] = useState<Currency>('USD');

    // Load spins from session storage (gate state is never persisted)
    useEffect(() => {
        const storedSpins = sessionStorage.getItem('city_pulse_spins');
        if (storedSpins) {
            setSpinsAvailable(parseInt(storedSpins));
        }
    }, []);

    const enterSite = () => {
        setIsEntered(true);
    };

    // Reset gate so the video landing page shows again
    const resetGate = () => {
        setIsEntered(false);
    };

    const addToCart = (product: Product) => {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string) => {
        setCart((prev) => prev.filter((item) => item.id !== productId));
    };

    const decrementSpin = () => {
        if (spinsAvailable > 0) {
            const newSpins = spinsAvailable - 1;
            setSpinsAvailable(newSpins);
            sessionStorage.setItem('city_pulse_spins', newSpins.toString());
        }
    };

    const resetSpins = () => {
        setSpinsAvailable(2);
        sessionStorage.setItem('city_pulse_spins', '2');
    }

    const toggleCurrency = () => {
        setCurrency((prev) => prev === 'USD' ? 'NGN' : 'USD');
    };

    return (
        <StoreContext.Provider
            value={{
                isEntered,
                enterSite,
                resetGate,
                isCartOpen,
                setIsCartOpen,
                isNavOpen,
                setIsNavOpen,
                cart,
                addToCart,
                removeFromCart,
                spinsAvailable,
                decrementSpin,
                resetSpins,
                currency,
                toggleCurrency
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    const context = useContext(StoreContext);
    if (!context) {
        throw new Error('useStore must be used within a StoreProvider');
    }
    return context;
};
