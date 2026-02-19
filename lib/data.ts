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
        title: 'CITY PULSE JACKET - BLACK/GREY',
        price: 200,
        image: '/images/products/jacket-1.png',
        status: 'NEW RELEASE',
        category: 'Tops',
    },
    {
        id: '2',
        title: 'CITY PULSE JACKET - NAVY/GREEN',
        price: 200,
        image: '/images/products/jacket-2.png',
        status: 'AVAILABLE',
        category: 'Tops',
    },
    {
        id: '3',
        title: 'NEWARK SKYLINE TEE - SAND',
        price: 100,
        image: '/images/products/tee-1.png',
        status: 'LOW STOCK',
        category: 'Tops',
    },
    {
        id: '4',
        title: 'CITY PULSE TEE - BLACK',
        price: 100,
        image: '/images/products/tee-2.png',
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
