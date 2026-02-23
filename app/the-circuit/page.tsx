'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Mail } from 'lucide-react';

export default function TheCircuitPage() {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleEmailSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email) {
            setIsSubmitted(true);
            console.log('Email submitted:', email);
        }
    };

    return (
        <div className="min-h-screen bg-background border-t border-zinc-800 pt-[80px]">
            {/* Hero Section */}
            <div className="relative border-b border-zinc-800 bg-gradient-to-b from-zinc-900/50 to-background">
                <div className="absolute inset-0 opacity-10">
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                            <path d="M10 10h20v20h-20z M40 40h20v20h-20z M70 10h20v20h-20z"
                                stroke="currentColor" strokeWidth="0.5" fill="none" className="text-accent" />
                            <circle cx="20" cy="20" r="2" fill="currentColor" className="text-accent" />
                            <circle cx="50" cy="50" r="2" fill="currentColor" className="text-accent" />
                            <circle cx="80" cy="20" r="2" fill="currentColor" className="text-accent" />
                        </pattern>
                        <rect width="100%" height="100%" fill="url(#circuit)" />
                    </svg>
                </div>

                <div className="relative max-w-4xl mx-auto px-6 py-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Zap className="w-16 h-16 mx-auto mb-6 text-accent" />
                        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                            The Circuit
                        </h1>
                        <p className="font-mono text-zinc-400 text-sm uppercase tracking-widest max-w-2xl mx-auto">
                            Private Drops. Silent Announcements.<br />Newark Grit. Nigerian Soul.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Email Capture — full width centred */}
            <div className="max-w-2xl mx-auto px-6 py-20">
                <div className="border border-zinc-800 p-10 bg-zinc-900/30">
                    <Mail className="w-12 h-12 mb-6 text-accent" />
                    <h2 className="text-3xl font-black uppercase mb-4">Join The Circuit</h2>
                    <p className="font-mono text-sm text-zinc-400 mb-8 leading-relaxed">
                        Get exclusive access to private drops, early releases, and Circuit-only rewards.
                        No spam. No noise. Just the pulse.
                    </p>

                    {isSubmitted ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="border border-accent bg-accent/10 p-6 text-center"
                        >
                            <p className="font-mono text-accent text-sm uppercase">
                                You&apos;re in the Circuit
                            </p>
                            <p className="font-mono text-zinc-400 text-xs mt-2">
                                Check your email for confirmation
                            </p>
                        </motion.div>
                    ) : (
                        <form onSubmit={handleEmailSubmit} className="space-y-4">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="your@email.com"
                                required
                                className="w-full px-4 py-3 bg-background border border-zinc-800 text-foreground font-mono text-sm focus:border-accent focus:outline-none transition-colors"
                            />
                            <button
                                type="submit"
                                className="w-full py-3 border border-zinc-800 bg-background text-foreground font-mono text-xs uppercase tracking-widest hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-300"
                            >
                                Enter The Circuit
                            </button>
                        </form>
                    )}
                </div>
            </div>

            {/* Circuit Benefits */}
            <div className="border-t border-zinc-800 bg-zinc-900/20 py-16">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-3xl font-black uppercase text-center mb-12">Circuit Benefits</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        {[
                            { title: 'EARLY ACCESS', desc: 'First to know about new drops' },
                            { title: 'EXCLUSIVE REWARDS', desc: 'Circuit-only discounts and items' },
                            { title: 'VIP TREATMENT', desc: 'Priority shipping and support' }
                        ].map((benefit, i) => (
                            <div key={i} className="border border-zinc-800 p-6 bg-background hover:border-accent transition-colors">
                                <h3 className="font-mono text-accent text-sm uppercase mb-2">{benefit.title}</h3>
                                <p className="text-zinc-400 text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
