import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PRODUCTS } from '@/lib/data';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

        // Two modes:
        // 1. Single product: { productId, size }               — Buy Now / PDP
        // 2. Full cart:      { items: [{id, size, quantity}] } — Cart Drawer
        let line_items: NonNullable<Parameters<typeof stripe.checkout.sessions.create>[0]['line_items']>;
        let metadataSummary = '';

        if (body.items && Array.isArray(body.items)) {
            // ── CART MODE: multiple line items ──
            line_items = body.items.map((cartItem: { id: string; size?: string; quantity: number }) => {
                const product = PRODUCTS.find((p) => p.id === cartItem.id);
                if (!product) throw new Error(`Product ${cartItem.id} not found`);
                return {
                    quantity: cartItem.quantity,
                    price_data: {
                        currency: 'usd',
                        unit_amount: product.price * 100,
                        product_data: {
                            name: product.title,
                            description: cartItem.size ? `Size: ${cartItem.size}` : undefined,
                            images: [`${baseUrl}${product.image}`],
                            metadata: { product_id: product.id, size: cartItem.size || 'N/A' },
                        },
                    },
                };
            });
            metadataSummary = body.items
                .map((i: { id: string; quantity: number }) => `${i.id}(x${i.quantity})`)
                .join(', ');
        } else {
            // ── SINGLE PRODUCT MODE ──
            const { productId, size } = body;
            const product = PRODUCTS.find((p) => p.id === productId);
            if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 });

            line_items = [{
                quantity: 1,
                price_data: {
                    currency: 'usd',
                    unit_amount: product.price * 100,
                    product_data: {
                        name: product.title,
                        description: size ? `Size: ${size}` : undefined,
                        images: [`${baseUrl}${product.image}`],
                        metadata: { product_id: product.id, size: size || 'N/A' },
                    },
                },
            }];
            metadataSummary = `${product.id}(x1)`;
        }

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items,
            shipping_address_collection: {
                allowed_countries: ['US', 'NG', 'GB', 'CA'],
            },
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 999, currency: 'usd' },
                        display_name: 'Standard Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 5 },
                            maximum: { unit: 'business_day', value: 7 },
                        },
                    },
                },
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 1999, currency: 'usd' },
                        display_name: 'Express Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 2 },
                            maximum: { unit: 'business_day', value: 3 },
                        },
                    },
                },
            ],
            metadata: { items: metadataSummary },
            success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/shop`,
            payment_intent_data: {
                receipt_email: undefined,
                metadata: { items: metadataSummary },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        console.error('[CHECKOUT ERROR]', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
