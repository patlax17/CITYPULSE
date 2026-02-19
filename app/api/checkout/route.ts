import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { PRODUCTS } from '@/lib/data';

export async function POST(req: NextRequest) {
    try {
        const { productId, size } = await req.json();

        const product = PRODUCTS.find((p) => p.id === productId);
        if (!product) {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }

        const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

        const session = await stripe.checkout.sessions.create({
            mode: 'payment',
            line_items: [
                {
                    quantity: 1,
                    price_data: {
                        currency: 'usd',
                        unit_amount: product.price * 100, // Stripe uses cents
                        product_data: {
                            name: product.title,
                            description: size ? `Size: ${size}` : undefined,
                            images: [`${baseUrl}${product.image}`],
                            metadata: {
                                product_id: product.id,
                                size: size || 'N/A',
                            },
                        },
                    },
                },
            ],
            shipping_address_collection: {
                allowed_countries: ['US', 'NG', 'GB', 'CA'],
            },
            metadata: {
                product_id: product.id,
                product_title: product.title,
                size: size || 'N/A',
            },
            success_url: `${baseUrl}/order-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${baseUrl}/shop`,
            // Receipt auto-sent to buyer by Stripe
            payment_intent_data: {
                receipt_email: undefined, // Stripe will populate from buyer's card
                metadata: {
                    product_title: product.title,
                    size: size || 'N/A',
                },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Something went wrong';
        console.error('[CHECKOUT ERROR]', message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
