'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';
import { useGetByIdEmployee, useGetToken } from '@/hooks';
import { LayoutGrid, List } from "lucide-react"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import SkeletonLoader from '@/components/ui/skeleton-loader';
import EmployeeFilesList from '@/components/document-management/digital-files/EmployeeFilesList';
import { PageHeader } from '@/components/ui/section-title';
import { BackButton } from '@/components/ui/back-button';

export default function EmployeeDocumentsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { slug } = useParams();

  const viewModeFromParams = searchParams.get('viewMode') as "grid" | "list";
  const viewModeFromStorage = typeof window !== 'undefined' ? localStorage.getItem('viewMode') as "grid" | "list" : null;
  const initialViewMode = viewModeFromParams || viewModeFromStorage || "grid";

  const [viewMode, setViewMode] = useState<"grid" | "list">(initialViewMode);
  const [previousViewMode, setPreviousViewMode] = useState<"grid" | "list">(initialViewMode);

  useEffect(() => {
    localStorage.setItem('viewMode', viewMode);
  }, [viewMode]);

  const employeeId = Array.isArray(slug) ? slug[0] : slug;
  const { employeeById } = useGetByIdEmployee({ employeeId: Number(employeeId) });
  const { status: tokenStatus } = useGetToken();

  // Effect para asegurar que el viewMode esté en la URL cuando la página se carga o el slug cambia
  useEffect(() => {
    // Verificar si el viewMode en la URL coincide con el estado actual
    if (viewModeFromParams !== viewMode) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('viewMode', viewMode);
      const newUrl = `${window.location.pathname}?${params.toString()}`;
      router.replace(newUrl, { scroll: false });
    }
  }, [slug, viewMode, router]);

  const handleViewModeChange = (value: string) => {
    if (value === "grid" || "list") {
      setPreviousViewMode(viewMode);
      setViewMode(value as "grid" | "list");
    }
  }

  if (tokenStatus === 'loading') return <SkeletonLoader />;

  return (
    <MotionConfig transition={{
      type: "spring",
      duration: 0.4,
      bounce: 0.1
    }}>
      <div className="container mx-auto py-10">
        {/* Back button with animation - now above the header with proper spacing */}
        <motion.div
          className="flex w-full justify-start mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <BackButton href={`/document-management/digital-files`} label="Volver" />
        </motion.div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            <PageHeader
              title={`Documentos de ${employeeById?.Name} ${employeeById?.Surname1} ${employeeById?.Surname2}`}
              description="Acceda y gestione la documentación oficial de los colaboradores."
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            className="self-end sm:self-auto"
          >
            <ToggleGroup
              type="single"
              value={viewMode}
              onValueChange={handleViewModeChange}
            >
              <ToggleGroupItem
                value="grid"
                aria-label="Vista de cuadrícula"
                className="relative"
              >
                <LayoutGrid className="h-4 w-4" />
                {viewMode === "grid" && (
                  <motion.div
                    layoutId="employeeFilesViewIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </ToggleGroupItem>
              <ToggleGroupItem
                value="list"
                aria-label="Vista de lista"
                className="relative"
              >
                <List className="h-4 w-4" />
                {viewMode === "list" && (
                  <motion.div
                    layoutId="employeeFilesViewIndicator"
                    className="absolute inset-0 bg-primary/10 rounded-sm -z-10"
                    initial={false}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
              </ToggleGroupItem>
            </ToggleGroup>
          </motion.div>
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={viewMode}
            initial={{
              opacity: 0,
              x: viewMode === "grid" && previousViewMode === "list" ? -20 : 20,
              filter: "blur(8px)",
              scale: 0.97
            }}
            animate={{
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
              scale: 1
            }}
            exit={{
              opacity: 0,
              x: viewMode === "grid" ? 20 : -20,
              filter: "blur(8px)",
              scale: 0.97
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="mt-6">
              {employeeId && <EmployeeFilesList employeeId={employeeId} viewMode={viewMode} />}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}