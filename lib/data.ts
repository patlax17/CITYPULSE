export interface Product {
    id: string;
    title: string;
    price: number;
    image: string;
    status: 'AVAILABLE' | 'SOLD OUT' | 'NEW RELEASE' | 'LOW STOCK';
    category: string;
}

export const PRODUCTS: Product[] = [
    {
        id: '1',
        title: 'BRICK CITY HEAVYWEIGHT HOODIE',
        price: 120,
        image: '/images/hoodie.png',
        status: 'NEW RELEASE',
        category: 'Tops',
    },
    {
        id: '2',
        title: 'LAGOS TRANSIT TEE',
        price: 45,
        image: '/images/tee.png',
        status: 'LOW STOCK',
        category: 'Tops',
    },
    {
        id: '3',
        title: 'PULSE CARGOES',
        price: 140,
        image: '/images/cargoes.png',
        status: 'AVAILABLE',
        category: 'Bottoms',
    },
    {
        id: '4',
        title: 'OBSIDIAN UTILITY PANTS',
        price: 135,
        image: '/images/pants.png',
        status: 'SOLD OUT',
        category: 'Bottoms',
    },
    {
        id: '5',
        title: 'CIRCUIT BEANIE',
        price: 35,
        image: '/images/beanie.png',
        status: 'AVAILABLE',
        category: 'Accessories',
    },
    {
        id: '6',
        title: 'HERITAGE TOTE',
        price: 60,
        image: '/images/tote.png',
        status: 'AVAILABLE',
        category: 'Accessories',
    },
];

export const COLLECTIONS = [
    'Newark Origins',
    'Tops',
    'Bottoms',
    'Accessories',
];
