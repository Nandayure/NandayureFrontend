import React from 'react';
import { FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PdfFile } from '@/types';

interface FileCardProps {
  file: PdfFile;
}

const FileCard = ({ file }: FileCardProps) => {
  const handleFileSelect = async (fileId: string) => {
    const fileUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/google-drive-files/getFile/${fileId}`;
    window.open(await fileUrl, '_blank');
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 flex flex-col space-y-4">
        <div className="flex items-center space-x-2">
          <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
          <span className="font-semibold truncate">{file.name}</span>
        </div>
        <Button onClick={() => handleFileSelect(file.id)} className="w-full">
          <Eye className="w-4 h-4 mr-2" />
          Ver PDF
        </Button>
      </div>
    </div>
  );
};

export default FileCard;