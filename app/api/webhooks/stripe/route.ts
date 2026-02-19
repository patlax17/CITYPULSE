import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { Resend } from 'resend';
import Stripe from 'stripe';

const resend = new Resend(process.env.RESEND_API_KEY);
const NOTIFY_EMAIL = process.env.ORDER_NOTIFICATION_EMAIL!;

export async function POST(req: NextRequest) {
    const body = await req.text(); // Raw body required for Stripe signature
    const sig = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Webhook error';
        console.error('[WEBHOOK SIGNATURE ERROR]', message);
        return NextResponse.json({ error: message }, { status: 400 });
    }

    // Only handle successful payments
    if (event.type === 'checkout.session.completed') {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleOrderSuccess(session);
    }

    return NextResponse.json({ received: true });
}

async function handleOrderSuccess(session: Stripe.Checkout.Session) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const sessionAny = session as any;
    const {
        metadata,
        amount_total,
        customer_details,
    } = session;
    const shipping_details = sessionAny.shipping_details as {
        address?: {
            line1?: string; line2?: string; city?: string;
            state?: string; postal_code?: string; country?: string;
        };
    } | null;

    const productTitle = metadata?.product_title || 'Unknown Product';
    const size = metadata?.size || 'N/A';
    const amountPaid = amount_total ? `$${(amount_total / 100).toFixed(2)}` : 'N/A';
    const buyerName = customer_details?.name || 'Customer';
    const buyerEmail = customer_details?.email || 'N/A';
    const shippingAddress = shipping_details?.address
        ? [
            shipping_details.address.line1,
            shipping_details.address.line2,
            shipping_details.address.city,
            shipping_details.address.state,
            shipping_details.address.postal_code,
            shipping_details.address.country,
        ]
            .filter(Boolean)
            .join(', ')
        : 'N/A';

    const orderTime = new Date().toLocaleString('en-US', {
        timeZone: 'America/New_York',
        dateStyle: 'full',
        timeStyle: 'short',
    });

    try {
        await resend.emails.send({
            from: 'City Pulse Orders <orders@citypulseglobal.com>',
            to: NOTIFY_EMAIL,
            subject: `🛒 New Order — ${productTitle}`,
            html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Courier New', monospace; background: #050505; color: #e5e5e5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 24px; }
    .header { border-bottom: 1px solid #27272a; padding-bottom: 24px; margin-bottom: 32px; }
    .brand { font-size: 28px; font-weight: 900; letter-spacing: -0.05em; text-transform: uppercase; }
    .accent { color: #00FF41; }
    .badge { display: inline-block; background: #00FF41; color: #000; font-size: 11px; font-weight: 700; padding: 4px 10px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 24px; }
    .section { border: 1px solid #27272a; padding: 20px; margin-bottom: 16px; }
    .label { font-size: 10px; text-transform: uppercase; letter-spacing: 0.15em; color: #52525b; margin-bottom: 6px; }
    .value { font-size: 16px; font-weight: 700; color: #e5e5e5; }
    .amount { font-size: 28px; font-weight: 900; color: #00FF41; }
    .footer { margin-top: 40px; padding-top: 24px; border-top: 1px solid #27272a; font-size: 11px; color: #52525b; text-transform: uppercase; letter-spacing: 0.1em; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="brand">CITY <span class="accent">PULSE</span></div>
      <div style="font-size:11px; color:#52525b; margin-top:4px; text-transform:uppercase; letter-spacing:0.15em;">Order Notification System</div>
    </div>

    <div class="badge">⚡ New Order Received</div>

    <div class="section">
      <div class="label">Product</div>
      <div class="value">${productTitle}</div>
      ${size !== 'N/A' ? `<div style="margin-top:8px;"><span class="label">Size: </span><span style="color:#00FF41;font-size:13px;">${size}</span></div>` : ''}
    </div>

    <div class="section">
      <div class="label">Amount Paid</div>
      <div class="amount">${amountPaid}</div>
    </div>

    <div class="section">
      <div class="label">Customer</div>
      <div class="value">${buyerName}</div>
      <div style="margin-top:4px; font-size:13px; color:#a1a1aa;">${buyerEmail}</div>
    </div>

    <div class="section">
      <div class="label">Ship To</div>
      <div class="value" style="font-size:14px; line-height:1.6;">${shippingAddress}</div>
    </div>

    <div class="section">
      <div class="label">Order Time (ET)</div>
      <div class="value" style="font-size:13px;">${orderTime}</div>
    </div>

    <div class="footer">
      City Pulse Global &mdash; Newark, NJ &mdash; EST. 2026<br>
      Stripe Session ID: ${session.id}
    </div>
  </div>
</body>
</html>
            `,
        });
        console.log(`[ORDER EMAIL SENT] ${productTitle} → ${NOTIFY_EMAIL}`);
    } catch (err) {
        console.error('[EMAIL ERROR]', err);
    }
}
