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
            shipping_options: [
                {
                    shipping_rate_data: {
                        type: 'fixed_amount',
                        fixed_amount: { amount: 999, currency: 'usd' }, // $9.99
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
                        fixed_amount: { amount: 1999, currency: 'usd' }, // $19.99
                        display_name: 'Express Shipping',
                        delivery_estimate: {
                            minimum: { unit: 'business_day', value: 2 },
                            maximum: { unit: 'business_day', value: 3 },
                        },
                    },
                },
            ],
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
