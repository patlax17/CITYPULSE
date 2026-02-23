'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '@/context/StoreContext';
import { useRef, useEffect, useState, useCallback } from 'react';

export default function Gateway() {
    const { isEntered, enterSite } = useStore();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [ready, setReady] = useState(false);
    const [isMuted, setIsMuted] = useState(false);      // optimistic: assume audio will play
    const [showTapHint, setShowTapHint] = useState(false); // shown only if autoplay-with-audio is blocked

    // Runs every time the gateway mounts (first visit + every resetGate return)
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        // Reset state for this mount
        setIsMuted(false);
        setShowTapHint(false);

        // Set volume and attempt unmuted play
        video.muted = false;
        video.volume = 0.7;

        const attemptPlay = async () => {
            try {
                await video.play();
                // Unmuted autoplay succeeded — audio is live
                setIsMuted(false);
                setShowTapHint(false);
            } catch {
                // Browser blocked unmuted autoplay — fall back to muted + hint
                video.muted = true;
                setIsMuted(true);
                try {
                    await video.play();
                } catch {
                    // Fully blocked (rare) — video stays as poster
                }
                setShowTapHint(true);
            }
        };

        attemptPlay();

        // CTA appears after 3.5s
        const timer = setTimeout(() => setReady(true), 3500);
        return () => {
            clearTimeout(timer);
            setReady(false);
        };
    }, [isEntered]); // re-run whenever isEntered toggles (covers resetGate)

    // Called when user taps anywhere — unmutes and dismisses hint
    const handleInteraction = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = false;
        video.volume = 0.7;
        setIsMuted(false);
        setShowTapHint(false);
    }, []);

    const toggleMute = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        const video = videoRef.current;
        if (!video) return;
        const newMuted = !video.muted;
        video.muted = newMuted;
        if (!newMuted) video.volume = 0.7;
        setIsMuted(newMuted);
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
                    onClick={handleInteraction}
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
                                    <path id="arch" d="M 30,220 Q 300,20 570,220" />
                                </defs>
                                <text
                                    fontFamily="var(--font-pirata), 'Old English Text MT', serif"
                                    fontSize="108"
                                    fill="#CC7722"
                                    letterSpacing="2"
                                >
                                    <textPath href="#arch" startOffset="50%" textAnchor="middle">
                                        City Pulse
                                    </textPath>
                                </text>
                            </svg>
                        </motion.div>

                        {/* Tagline */}
                        <motion.p
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 0.5, y: 0 }}
                            transition={{ delay: 2.4, duration: 1 }}
                            className="font-mono text-[10px] md:text-xs text-zinc-400 uppercase tracking-[0.3em] -mt-4"
                        >
                            City Never Sleeps · Style Never Fades
                        </motion.p>

                        {/* CTA Button */}
                        <motion.button
                            initial={{ opacity: 0, y: 16 }}
                            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => { e.stopPropagation(); handleInteraction(); enterSite(); }}
                            className="px-10 py-3.5 border border-zinc-600 text-ochre font-mono text-xs uppercase tracking-[0.25em] cursor-pointer hover:bg-ochre hover:text-black hover:border-ochre transition-all duration-500"
                            style={{ background: 'rgba(0,0,0,0.5)', pointerEvents: ready ? 'auto' : 'none' }}
                        >
                            Enter The Pulse
                        </motion.button>
                    </div>

                    {/* ── Corner: location ── */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        transition={{ delay: 3, duration: 1.2 }}
                        className="absolute bottom-6 left-6 font-mono text-[10px] text-zinc-600 uppercase tracking-widest"
                        style={{ zIndex: 3 }}
                    >
                        Newark, NJ — Est. 2026
                    </motion.div>

                    {/* ── Mute toggle (always visible after 3s) ── */}
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.6 }}
                        transition={{ delay: 3, duration: 1.2 }}
                        onClick={toggleMute}
                        aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        className="absolute bottom-6 right-6 font-mono text-[10px] text-zinc-400 uppercase tracking-widest flex items-center gap-1.5 hover:text-zinc-200 transition-colors duration-300"
                        style={{ zIndex: 5 }}
                    >
                        {isMuted ? (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <line x1="23" y1="9" x2="17" y2="15" />
                                <line x1="17" y1="9" x2="23" y2="15" />
                            </svg>
                        ) : (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            </svg>
                        )}
                        {isMuted ? 'Unmute' : 'Mute'}
                    </motion.button>

                    {/* ── "Tap for audio" hint — only shown if browser blocked unmuted autoplay ── */}
                    <AnimatePresence>
                        {showTapHint && (
                            <motion.div
                                initial={{ opacity: 0, y: 6 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -6 }}
                                transition={{ delay: 1, duration: 0.6 }}
                                className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[10px] uppercase tracking-widest text-zinc-300 pointer-events-none"
                                style={{
                                    zIndex: 6,
                                    background: 'rgba(0,0,0,0.55)',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    backdropFilter: 'blur(8px)',
                                }}
                            >
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                </svg>
                                Tap anywhere for audio
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.section>
            )}
        </AnimatePresence>
    );
}
