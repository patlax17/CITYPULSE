// Local product data — No Shopify.
// All images use the original Industrial Noir editorial photo assets (.webp).
// Each product uses server-side Stripe Checkout via /api/checkout.

export interface Product {
    id: string;
    name: string;
    title: string; // display title (kept for backward compat)
    price: number; // USD base price
    frontImage: string;
    backImage: string;
    image: string; // legacy alias → frontImage (used by checkout API)
    stripeLink: string; // Stripe Payment Link URL (legacy field)
    status: 'AVAILABLE' | 'SOLD OUT' | 'NEW RELEASE' | 'LOW STOCK';
    category: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'City Pulse Bomber - Black/Grey',
        title: 'CITY PULSE BOMBER — BLACK/GREY',
        price: 249,
        frontImage: '/images/products/noir/city-pulse-varsity-jacket-editorial-industrial-noir-concrete-01.webp',
        backImage: '/images/products/noir/city-pulse-varsity-jacket-editorial-industrial-noir-concrete-back-01.webp',
        image: '/images/products/noir/city-pulse-varsity-jacket-editorial-industrial-noir-concrete-01.webp',
        stripeLink: 'https://buy.stripe.com/test_placeholder_jacket1',
        status: 'NEW RELEASE',
        category: 'Tops',
    },
    {
        id: '2',
        name: 'City Pulse Bomber - Navy/Green',
        title: 'CITY PULSE BOMBER — NAVY/GREEN',
        price: 249,
        frontImage: '/images/products/noir/city-pulse-varsity-jacket-editorial-industrial-noir-rust-02.webp',
        backImage: '/images/products/noir/city-pulse-varsity-jacket-editorial-industrial-noir-rust-back-02.webp',
        image: '/images/products/noir/city-pulse-varsity-jacket-editorial-industrial-noir-rust-02.webp',
        stripeLink: 'https://buy.stripe.com/test_placeholder_jacket2',
        status: 'AVAILABLE',
        category: 'Tops',
    },
    {
        id: '3',
        name: 'City Pulse Vintage Tee - Sand',
        title: 'CITY PULSE VINTAGE TEE — SAND',
        price: 129,
        frontImage: '/images/products/noir/city-pulse-newark-skyline-tee-editorial-industrial-noir-brick-01.webp',
        backImage: '/images/products/noir/city-pulse-newark-skyline-tee-editorial-industrial-noir-brick-back-01.webp',
        image: '/images/products/noir/city-pulse-newark-skyline-tee-editorial-industrial-noir-brick-01.webp',
        stripeLink: 'https://buy.stripe.com/test_placeholder_tee1',
        status: 'LOW STOCK',
        category: 'Tops',
    },
    {
        id: '4',
        name: 'City Pulse Vintage Tee - Black',
        title: 'CITY PULSE VINTAGE TEE — BLACK',
        price: 129,
        frontImage: '/images/products/noir/city-pulse-graphic-tee-editorial-industrial-noir-concrete-02.webp',
        backImage: '/images/products/noir/city-pulse-graphic-tee-editorial-industrial-noir-concrete-back-02.webp',
        image: '/images/products/noir/city-pulse-graphic-tee-editorial-industrial-noir-concrete-02.webp',
        stripeLink: 'https://buy.stripe.com/test_placeholder_tee2',
        status: 'AVAILABLE',
        category: 'Tops',
    },
];

export const COLLECTIONS = [
    'Newark Origins',
    'Tops',
    'Bottoms',
    'Accessories',
];
