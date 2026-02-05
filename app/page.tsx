'use client';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] border-t border-zinc-800 bg-background relative overflow-hidden">
      {/* Background ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 to-background opacity-50" />

      <div className="relative z-10 text-center space-y-8 p-4">
        <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.8]">
          Newark<br />Origins
        </h2>
        <p className="font-mono text-zinc-500 uppercase tracking-widest text-xs md:text-sm max-w-md mx-auto">
          Heavyweight garments for the urban explorer.
          <br />Global shipping available.
        </p>
        <Link
          href="/shop"
          className="inline-block px-12 py-4 border border-zinc-700 bg-black text-foreground hover:bg-accent hover:text-black hover:border-accent transition-all duration-300 font-mono text-xs uppercase tracking-[0.2em]"
        >
          Shop All
        </Link>
      </div>
    </div>
  );
}
