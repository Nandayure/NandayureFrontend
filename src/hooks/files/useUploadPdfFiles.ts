import { useState, useCallback } from 'react';
import { FileRejection } from 'react-dropzone';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { uploadDocument } from '@/services';
import { notify } from '@/utils/notification';

interface UsePdfUploadProps {
  folderId: string;
}

export function usePdfUpload({ folderId }: UsePdfUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalProgress, setErrorModalProgress] = useState(100);
  const queryClient = useQueryClient();

  const { mutate, isPending: isUploading } = useMutation({
    mutationFn: async (fileToUpload: File) => {
      const fileName = generateFileName(fileToUpload.name);
      return await uploadDocument({
        FolderId: folderId,
        FileName: fileName,
        file: fileToUpload,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['employee-files', folderId],
      });
      setIsOpen(false);
      setFile(null);
    },
  });

  // Generar nombre de archivo con fecha formateada
  const generateFileName = (originalName: string): string => {
    const date = format(new Date(), 'yyyy-MM-dd', { locale: es });
    return `${originalName}-${date}`;
  };

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const uploadedFile = acceptedFiles[0];

        const visualFile = Object.assign(uploadedFile, {
          uploadedAt: new Date()

        });
  
        setFile(visualFile); 
      }
  
      if (fileRejections.length > 0) {
        setShowErrorModal(true);
        setErrorModalProgress(100);
      }
    },
    [],
  );

  const removeFile = useCallback(() => {
    setFile(null);
  }, []);

  const handleUpload = useCallback(() => {
    if (!file) return;

    notify(
      new Promise((resolve, reject) => {
        mutate(file, {
          onSuccess: (data) => resolve(data),
          onError: (error) => reject(error),
        });
      }),
      {
        loading: `Subiendo ${file.name}...`,
        success: `${file.name} subido con éxito`,
        error: `Error al subir ${file.name}`,
      },
    );
  }, [file, mutate]);

  const startErrorModalTimer = useCallback(() => {
    const duration = 3000;
    const interval = 50;

    const timer = setInterval(() => {
      setErrorModalProgress((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          setShowErrorModal(false);
          return 0;
        }
        return prev - (interval / duration) * 100;
      });
    }, interval);

    return timer;
  }, []);

  return {
    file,
    showErrorModal,
    setShowErrorModal,
    errorModalProgress,
    isUploading,
    onDrop,
    removeFile,
    handleUpload,
    isOpen,
    setIsOpen,
    startErrorModalTimer,
  };
}
