'use client';
import PDFUploader from '@/components/common/pdf-uploader';
import { useParams } from 'next/navigation';

export default function Page() {
  const { slug } = useParams();
  return <PDFUploader />;
}
