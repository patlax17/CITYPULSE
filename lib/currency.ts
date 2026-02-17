// Currency utilities for City Pulse
// Honoring Nigerian heritage with Naira support

export type Currency = 'USD' | 'NGN';

// Exchange rate: 1 USD = 1650 NGN (configurable)
export const EXCHANGE_RATE = 1650;

export function convertPrice(priceUSD: number, currency: Currency): number {
    if (currency === 'NGN') {
        return priceUSD * EXCHANGE_RATE;
    }
    return priceUSD;
}

export function formatPrice(price: number, currency: Currency): string {
    if (currency === 'NGN') {
        return `₦${price.toLocaleString('en-NG', { maximumFractionDigits: 0 })}`;
    }
    return `$${price.toFixed(2)}`;
}

export function formatCurrency(priceUSD: number, currency: Currency): string {
    const converted = convertPrice(priceUSD, currency);
    return formatPrice(converted, currency);
}
