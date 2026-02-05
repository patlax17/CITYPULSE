'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/lib/data';

interface CartItem extends Product {
    quantity: number;
    size?: string;
}

interface StoreContextType {
    isEntered: boolean;
    enterSite: () => void;
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
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [isEntered, setIsEntered] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isNavOpen, setIsNavOpen] = useState(false);
    const [cart, setCart] = useState<CartItem[]>([]);
    const [spinsAvailable, setSpinsAvailable] = useState(2);

    // Load state from session storage
    useEffect(() => {
        const storedEntered = sessionStorage.getItem('city_pulse_entered');
        if (storedEntered === 'true') {
            setIsEntered(true);
        }

        const storedSpins = sessionStorage.getItem('city_pulse_spins');
        if (storedSpins) {
            setSpinsAvailable(parseInt(storedSpins));
        }
    }, []);

    const enterSite = () => {
        setIsEntered(true);
        sessionStorage.setItem('city_pulse_entered', 'true');
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

    return (
        <StoreContext.Provider
            value={{
                isEntered,
                enterSite,
                isCartOpen,
                setIsCartOpen,
                isNavOpen,
                setIsNavOpen,
                cart,
                addToCart,
                removeFromCart,
                spinsAvailable,
                decrementSpin,
                resetSpins
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
