'use client';
import { StoreProvider } from '@/context/StoreContext';
import Header from '@/components/Header';
import NavDrawer from '@/components/NavDrawer';
import CartDrawer from '@/components/CartDrawer';
import Gateway from '@/components/Gateway';
import NotificationModal from '@/components/NotificationModal';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <StoreProvider>
            <Gateway />
            <Header />
            <NavDrawer />
            <CartDrawer />
            <NotificationModal />
            <main className="pt-[80px] min-h-screen bg-background">
                {children}
            </main>
        </StoreProvider>
    );
}
