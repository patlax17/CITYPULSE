'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { useRef, useEffect, useState } from 'react';

export default function Gateway() {
    const { isEntered, enterSite } = useStore();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ready, setReady] = useState(false);

    // Ensure autoplay fires even after hydration
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay blocked — video stays as poster fallback
            });
        }
        // Mark "ready" after 3.5s so user soaks in the video before CTA appears
        const timer = setTimeout(() => setReady(true), 3500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence mode="wait">
            {!isEntered && (
                <motion.section
                    key="gateway"
                    className="fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden"
                    style={{ border: '1px solid #27272a' }}
                    initial={{ opacity: 1, y: 0 }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                >
                    {/* ── Background Video with slow Ken Burns zoom ── */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ zIndex: 0 }}
                        initial={{ scale: 1 }}
                        animate={{ scale: 1.08 }}
                        transition={{ duration: 20, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }}
                    >
                        <video
                            ref={videoRef}
                            src="/landing_video.mp4"
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* ── Dark Overlay — slightly lighter so video breathes ── */}
                    <motion.div
                        className="absolute inset-0"
                        style={{ zIndex: 1 }}
                        initial={{ background: 'rgba(0,0,0,0.9)' }}
                        animate={{ background: 'rgba(0,0,0,0.6)' }}
                        transition={{ duration: 3, ease: 'easeOut' }}
                    />

                    {/* ── Cinematic vignette ── */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            zIndex: 2,
                            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)',
                        }}
                    />

                    {/* ── 1px grid border overlay ── */}
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ border: '1px solid #27272a', zIndex: 4 }}
                    />

                    {/* ── Main Content ── */}
                    <div
                        className="relative flex flex-col items-center justify-center gap-10 px-4"
                        style={{ zIndex: 3 }}
                    >
                        {/* Arched "City Pulse" SVG text-path — slower reveal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85, y: 30 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
                            aria-label="City Pulse"
                        >
                            <svg
                                viewBox="0 0 600 260"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{
                                    width: 'clamp(280px, 80vw, 700px)',
                                    overflow: 'visible',
                                    filter: 'drop-shadow(0 0 32px rgba(204,119,34,0.4)) drop-shadow(0 4px 12px rgba(0,0,0,0.6))',
                                }}
                            >
                                <defs>
                                    {/* Arch path */}
                                    <path
                                        id="arch"
                                        d="M 30,220 Q 300,20 570,220"
                                    />
                                </defs>

                                <text
                                    fontFamily="var(--font-pirata), 'Old English Text MT', serif"
                                    fontSize="108"
                                    fill="#CC7722"
                                    letterSpacing="2"
                                >
                                    <textPath
                                        href="#arch"
                                        startOffset="50%"
                                        textAnchor="middle"
                                    >
                                        City Pulse
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>

                        {/* Tagline — fades in after title */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            transition={{ delay: 2.4, duration: 1 }}
                            className="font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-[0.3em] -mt-4"
                        >
                            City Never Sleeps · Style Never Fades
                        </motion.p>

                        {/* CTA Button — delayed 3.5s so user absorbs the atmosphere */}
                        <motion.button
                            initial={{ opacity: 0, y: 16 }}
                            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            onClick={enterSite}
                            className="px-10 py-3.5 border border-zinc-600 text-ochre font-mono text-xs uppercase tracking-[0.25em] cursor-pointer hover:bg-ochre hover:text-black hover:border-ochre transition-all duration-500"
                            style={{ background: 'rgba(0,0,0,0.5)', pointerEvents: ready ? 'auto' : 'none' }}
                        >
                            Enter The Pulse
                        </motion.button>
                    </div>

                    {/* ── Subtle corner coordinates — later reveal ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 3, duration: 1.2 }}
                        className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest"
                        style={{ zIndex: 3 }}
                    >
                        Newark, NJ — Est. 2026
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 3, duration: 1.2 }}
                        className="absolute bottom-6 right-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest"
                        style={{ zIndex: 3 }}
                    >
                        CP ® Lineage
                    </motion.div>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
