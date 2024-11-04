import Flag from '@/components/common/Flag';
import Nav from '@/components/dashboard/nav/nav';
import Sidebar from '@/components/dashboard/side-bar/side-bar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="hidden sm:block">
        <main className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 p-2">
            <Nav />
            <Flag />
            {children}
          </div>
        </main>
      </div>

      <div className="block sm:hidden w-full">
        <main className="min-h-screen w-full flex flex-col overflow-hidden">
          {/* navigation mobile */}
          <div className="flex items-center w-full">
            <Sidebar /> {/* Barra lateral a la izquierda */}
            <div className="flex w-full py-2">
              <Nav /> {/* Navbar a la derecha */}
            </div>
          </div>
          {children}
        </main>
      </div>
    </>
  );
}
