export default function ArchivePage() {
    const items = Array.from({ length: 9 }).map((_, i) => i);

    return (
        <div className="min-h-screen bg-black columns-1 md:columns-3 gap-0 space-y-0">
            {items.map((i) => (
                <div key={i} className="relative w-full break-inside-avoid px-0 py-0 group cursor-pointer">
                    {/* 
                   We want a gallery feel.
                   Randomize aspect ratio?
                 */}
                    <div style={{ aspectRatio: i % 2 === 0 ? '3/4' : '16/9' }} className="w-full bg-zinc-900 border border-zinc-800 relative overflow-hidden">
                        <img
                            src={`/images/archive_${(i % 4) + 1}.png`}
                            alt="Archive"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-white/10 font-black text-4xl uppercase opacity-100 mix-blend-overlay">
                            Archive 00{i + 1}
                        </div>
                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-colors duration-500" />

                        <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="bg-black text-white px-2 py-1 text-xs font-mono uppercase">
                                CAMPAIGN 202{i}
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
