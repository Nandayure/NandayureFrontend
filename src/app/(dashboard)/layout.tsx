import Flag from '@/components/common/Flag';
import Nav from '@/components/dashboard/nav/nav';
import Sidebar from '@/components/dashboard/side-bar/side-bar';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden sm:block">
        <main className="min-h-screen flex">
          <Suspense fallback={<div>Loading...</div>}>
            <Sidebar />
          </Suspense>
          <div className="flex-1 p-2">
            <Suspense fallback={<div>Loading...</div>}>
              <Nav />
            </Suspense>
            <Flag />
            {children}
          </div>
        </main>
      </div>

      <div className="block sm:hidden w-full">
        <main className="min-h-screen w-full flex flex-col overflow-hidden">
          {/* navigation mobile */}
          <div className="flex items-center w-full">
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar /> {/* Barra lateral a la izquierda */}
            </Suspense>
            <div className="flex w-full py-2">
              <Suspense fallback={<div>Loading...</div>}>
                <Nav /> {/* Navbar a la derecha */}
              </Suspense>
            </div>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
