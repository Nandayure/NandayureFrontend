import React from 'react';
import clsx from 'clsx';

const SkeletonLoader = ({ className }: { className?: string }) => {
  return (
    <div className={clsx('animate-pulse bg-gray-200 rounded', className)} />
  );
};

export default SkeletonLoader;
