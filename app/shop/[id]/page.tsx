import { PRODUCTS } from '@/data/products';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ProductDetail from '@/components/ProductDetail';

interface Props {
    params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
    return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return { title: 'Product Not Found | City Pulse' };
    return {
        title: `${product.name} | City Pulse`,
        description: `Shop the ${product.name} — premium streetwear from City Pulse. Free shipping on orders over $200.`,
        openGraph: {
            title: `${product.name} | City Pulse`,
            description: `Shop the ${product.name} — premium streetwear from City Pulse.`,
            images: [{ url: product.frontImage, width: 800, height: 1067, alt: product.name }],
        },
    };
}

export default async function ProductPage({ params }: Props) {
    const { id } = await params;
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) notFound();
    return <ProductDetail product={product} />;
}
