'use client';
import SkeletonLoader from '@/components/ui/skeleton-loader';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
const SalaryCertificateTemplate = dynamic(
  () =>
    import(
      '@/components/templates/salary-certificate/Salary-certificate-template'
    ),
  {
    ssr: false,
    loading: () => <SkeletonLoader className="w-full h-screen" />,
  },
);

type Params = {
  id: string;
};

export default function SalaryCertificateTemplatePage() {
  const { id } = useParams<Params>();
  return (
    <>
      <SalaryCertificateTemplate id={id} />
    </>
  );
}
