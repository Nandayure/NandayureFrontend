import Flag from '@/components/common/Flag';
import Nav from '@/components/dashboard/nav/nav';
import Sidebar from '@/components/dashboard/side-bar/side-bar';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-screen sm:w-auto flex md:flex-row flex-col overflow-hidden">
      <div>
        {/* navigation desktop */}
        <div className="hidden sm:block">
          <Sidebar />
          <div className="flex-1 py-2">
            <Nav />
            <div className="hidden sm:block">
              <Flag />
            </div>
          </div>
        </div>

        {/* navigation mobile */}
        <div className="block sm:hidden">
          <div className="flex items-center">
            <Sidebar /> {/* Barra lateral a la izquierda */}
            <div className="flex-1 py-2">
              <Nav /> {/* Navbar a la derecha */}
            </div>
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
