'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderSuccessContent() {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        if (sessionId) setConfirmed(true);
    }, [sessionId]);

    return (
        <div className="min-h-screen bg-background flex items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-lg w-full border border-zinc-800 bg-zinc-900/30 p-12 text-center"
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring' }}
                >
                    <CheckCircle className="w-16 h-16 text-accent mx-auto mb-8" />
                </motion.div>

                <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">
                    Order Confirmed
                </h1>
                <p className="font-mono text-zinc-400 text-sm mb-2">
                    You&apos;re locked in. A receipt has been sent to your email.
                </p>
                <p className="font-mono text-zinc-600 text-xs uppercase tracking-widest mb-10">
                    City Pulse Global — EST. 2026
                </p>

                {confirmed && (
                    <p className="font-mono text-xs text-zinc-600 mb-8 border border-zinc-800 p-3">
                        Session: {sessionId?.slice(0, 24)}...
                    </p>
                )}

                <Link
                    href="/shop"
                    className="inline-flex items-center gap-2 border border-accent text-accent font-mono text-xs uppercase tracking-widest px-6 py-3 hover:bg-accent hover:text-black transition-all duration-300"
                >
                    Continue Shopping <ArrowRight className="w-4 h-4" />
                </Link>
            </motion.div>
        </div>
    );
}

export default function OrderSuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <OrderSuccessContent />
        </Suspense>
    );
}
