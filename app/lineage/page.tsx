'use client';
import { motion } from 'framer-motion';

export default function LineagePage() {
    const heritageItems = [
        { title: 'NEWARK ORIGINS', year: '2026', aspect: '3/4' },
        { title: 'NIGERIAN ROOTS', year: '2026', aspect: '16/9' },
        { title: 'BRICK CITY PULSE', year: '2026', aspect: '3/4' },
        { title: 'LAGOS INFLUENCE', year: '2026', aspect: '16/9' },
        { title: 'INDUSTRIAL HERITAGE', year: '2026', aspect: '3/4' },
        { title: 'CULTURAL FUSION', year: '2026', aspect: '16/9' },
    ];

    return (
        <div className="min-h-screen bg-background pt-[80px]">
            {/* Hero */}
            <div className="border-b border-zinc-800 py-16 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
                        Lineage
                    </h1>
                    <p className="font-mono text-zinc-500 text-xs uppercase tracking-widest">
                        Newark Grit. Nigerian Soul. Global Vision.
                    </p>
                </motion.div>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
                {heritageItems.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="relative group cursor-pointer border-r border-b border-zinc-800"
                        style={{ aspectRatio: item.aspect }}
                    >
                        <div className="absolute inset-0 bg-zinc-900">
                            {/* Placeholder for heritage imagery */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-900" />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
                                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-foreground mb-2 text-center">
                                    {item.title}
                                </h3>
                                <span className="font-mono text-accent text-xs uppercase tracking-widest">
                                    {item.year}
                                </span>
                            </div>

                            {/* Accent Border on Hover */}
                            <div className="absolute inset-0 border-2 border-transparent group-hover:border-accent transition-colors duration-300" />
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Heritage Statement */}
            <div className="border-t border-zinc-800 bg-zinc-900/20 py-16 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <p className="text-lg text-zinc-400 leading-relaxed mb-8">
                        City Pulse is born from the intersection of Newark&apos;s industrial resilience
                        and Nigeria&apos;s vibrant cultural legacy. We honor both through heavyweight
                        garments built for the urban explorer.
                    </p>
                    <div className="grid grid-cols-2 gap-8 font-mono text-xs uppercase">
                        <div className="border border-zinc-800 p-6">
                            <p className="text-accent mb-2">Newark, NJ</p>
                            <p className="text-zinc-500">Industrial Grit</p>
                        </div>
                        <div className="border border-zinc-800 p-6">
                            <p className="text-ochre mb-2">Lagos, Nigeria</p>
                            <p className="text-zinc-500">Cultural Soul</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
