import React from 'react';
import { useEmployeeFiles } from '@/hooks/files/useEmployeeFiles';
import SkeletonLoader from '../SkeletonLoader';
import FileCard from '../FileCard';
import { motion, AnimatePresence } from 'framer-motion';

interface EmployeeFilesListProps {
  employeeId: string;
}

const EmployeeFilesList = ({ employeeId }: EmployeeFilesListProps) => {
  const { files, isLoading, isError, error } = useEmployeeFiles(employeeId);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (isError) {
    return <div className="text-red-500 text-center">{error?.message}</div>;
  }

  // Container variant for parent animation
  const containerVariant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // 80ms stagger between children
        delayChildren: 0.1, // Small delay before starting animations
      }
    }
  };

  // Card variants
  const cardVariant = {
    hidden: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
      y: 20
    },
    show: {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0.2
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      filter: "blur(4px)",
      transition: {
        duration: 0.3,
        ease: [0.4, 0, 0.2, 1] // Standard curve (ease-in-out)
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Archivos del Empleado</h1>
      <AnimatePresence mode="wait">
        {files && files.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariant}
            initial="hidden"
            animate="show"
          >
            {files.map((file, index) => (
              <motion.div
                key={file.id}
                variants={cardVariant}
                layoutId={`file-${file.id}`}
                custom={index}
                exit="exit"
                className="relative"
              >
                <FileCard file={file} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            className="text-center text-gray-500 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No hay archivos disponibles para este empleado.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EmployeeFilesList;