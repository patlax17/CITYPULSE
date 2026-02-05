export default function ExperiencePage() {
    return (
        <div className="min-h-screen bg-background border-t border-zinc-800 flex flex-col items-center">
            {/* Use a placeholder for the video background */}
            <div className="w-full h-[70vh] bg-zinc-900 relative overflow-hidden flex items-center justify-center border-b border-zinc-800">
                <img src="/images/experience_hero.png" alt="Hero" className="absolute inset-0 w-full h-full object-cover opacity-50" />

                <div className="z-10 text-center space-y-4">
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter text-white leading-none">
                        Heritage
                    </h1>
                    <p className="font-mono text-accent uppercase tracking-[0.5em] text-sm">
                        Est. 2026 // Newark
                    </p>
                </div>
            </div>

            <div className="max-w-6xl w-full p-8 md:p-24 space-y-32">
                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 relative">
                        <img src="/images/experience_1.png" alt="Architecture" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="space-y-8">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Concrete<br />Narratives</h2>
                        <p className="font-mono text-zinc-500 text-sm leading-7 text-justify uppercase">
                            We build uniforms for the modern nomad. Those who navigate the lines between
                            architecture and chaos. Our fabric is sourced from the edges of the city.
                        </p>
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div className="space-y-8 md:text-right order-2 md:order-1">
                        <h2 className="text-4xl font-black uppercase tracking-tighter">Signal<br />Processing</h2>
                        <p className="font-mono text-zinc-500 text-sm leading-7 text-justify uppercase ml-auto">
                            The pulse is constant. It does not sleep. From the underground rail to the
                            rooftop transmission. We are listening.
                        </p>
                    </div>
                    <div className="aspect-[4/5] bg-zinc-900 border border-zinc-800 relative order-1 md:order-2">
                        <img src="/images/experience_2.png" alt="Signal" className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                </section>
            </div>
        </div>
    );
}
