'use client';

import React, { useState, useCallback, useEffect } from 'react';
import { useDropzone, FileRejection } from 'react-dropzone';
import { Upload, File as FileIcon, X, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { notify } from '@/utils/notification';
import { uploadDocument } from '@/services/UploadDocument/uploadDocument';
import { useQueryClient } from '@tanstack/react-query';

interface Props {
  EmployeeId: string;
}

export default function PDFUploader({ EmployeeId }: Props) {
  const [file, setFile] = useState<File | null>(null); // Cambiado de array a un solo archivo
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [progress, setProgress] = useState(100);
  const queryClient = useQueryClient();
  const [isUploading, setIsUploading] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        const pdfFile = acceptedFiles[0];
        setFile(pdfFile); // Solo se guarda un archivo
      }

      if (fileRejections.length > 0) {
        setShowErrorModal(true);
        setProgress(100);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false, // Limita a un solo archivo
  });

  const removeFile = () => {
    setFile(null);
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsUploading(true);
    try {
      const FileName = generateFileName(file.name);
      await notify(
        uploadDocument({
          EmployeeId,
          FileName,
          file,
        }),
        {
          loading: `Subiendo ${file.name}...`,
          success: `${file.name} subido con éxito`,
          error: `Error al subir ${file.name}`,
        },
      );
      setFile(null);
      queryClient.invalidateQueries({ queryKey: ['files', EmployeeId] });
    } catch (error) {
      console.error('Error al subir archivos:', error);
    } finally {
      setIsUploading(false);
    }
  };

  // Función para generar el FileName basado en el nombre del archivo
  const generateFileName = (originalName: string) => {
    const date = new Date().toISOString().split('T')[0]; // Obtener fecha actual en formato YYYY-MM-DD
    return `${originalName}-${date}`;
  };

  useEffect(() => {
    if (showErrorModal) {
      const duration = 3000; // 3 segundos
      const interval = 50; // Actualizar cada 50ms
      let timer: NodeJS.Timeout;

      const updateProgress = () => {
        setProgress((prevProgress) => {
          if (prevProgress <= 0) {
            clearInterval(timer);
            setShowErrorModal(false);
            return 0;
          }
          return prevProgress - (interval / duration) * 100;
        });
      };

      timer = setInterval(updateProgress, interval);

      return () => clearInterval(timer);
    }
  }, [showErrorModal]);

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragActive
                ? 'Suelta el archivo PDF aquí'
                : 'Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionar'}
            </p>
          </div>
          {file && (
            <div className="mt-4 flex items-center justify-between bg-muted p-2 rounded">
              <div className="flex items-center space-x-2">
                <FileIcon className="h-5 w-5" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          <Button
            className="w-full mt-4"
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? 'Subiendo...' : `Subir archivo`}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={showErrorModal} onOpenChange={setShowErrorModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <AlertCircle className="h-5 w-5 text-destructive mr-2" />
              Error al subir archivo
            </DialogTitle>
          </DialogHeader>
          <DialogDescription>
            Solo se pueden subir archivos PDF. Por favor, intenta de nuevo con
            un archivo PDF.
          </DialogDescription>
          <Progress value={progress} className="mt-4" />
        </DialogContent>
      </Dialog>
    </>
  );
}
