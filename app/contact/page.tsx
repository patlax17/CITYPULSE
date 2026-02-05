'use client';

export default function ContactPage() {
    return (
        <div className="min-h-[calc(100vh-80px)] border-t border-zinc-800 flex items-center justify-center p-8 bg-background">
            <div className="max-w-xl w-full space-y-12">
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-foreground">
                        Contact<br />Protocol
                    </h1>
                    <p className="font-mono text-zinc-500 uppercase text-xs tracking-widest">
                        Inquiries regarding orders, Wholesale, or collaboration.
                    </p>
                </div>

                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="block font-mono text-xs uppercase text-zinc-500">Subject</label>
                        <div className="relative">
                            <select className="w-full bg-black border border-zinc-700 p-4 text-white font-mono text-xs uppercase focus:border-accent outline-none appearance-none rounded-none cursor-pointer">
                                <option>Order Inquiry</option>
                                <option>Product Support</option>
                                <option>Press / Media</option>
                                <option>Other</option>
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500 text-xs">▼</div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block font-mono text-xs uppercase text-zinc-500">Email Destination</label>
                        <input
                            type="email"
                            className="w-full bg-black border border-zinc-700 p-4 text-white font-mono text-xs uppercase focus:border-accent outline-none placeholder:text-zinc-800 transition-colors"
                            placeholder="USER@DOMAIN.COM"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="block font-mono text-xs uppercase text-zinc-500">Transmission</label>
                        <textarea
                            rows={6}
                            className="w-full bg-black border border-zinc-700 p-4 text-white font-mono text-xs uppercase focus:border-accent outline-none placeholder:text-zinc-800 resize-none transition-colors"
                            placeholder="ENTER MESSAGE..."
                        />
                    </div>

                    <button className="w-full py-4 bg-foreground text-black font-black uppercase tracking-widest hover:bg-accent transition-colors text-sm">
                        Send Transmission
                    </button>
                </form>

                <div className="border-t border-zinc-800 pt-8 flex justify-between font-mono text-xs text-zinc-600 uppercase">
                    <span>City Pulse Systems</span>
                    <span>INFO@CITYPULSE.COM</span>
                </div>
            </div>
        </div>
    );
}
