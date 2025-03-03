'use client';

import React, { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
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
import { usePdfUpload } from '@/hooks/files/useUploadPdfFiles';

interface Props {
  EmployeeId: string;
}

export default function PDFUploader({ EmployeeId }: Props) {
  const {
    file,
    showErrorModal,
    setShowErrorModal,
    errorModalProgress,
    isUploading,
    onDrop,
    removeFile,
    handleUpload,
    startErrorModalTimer,
  } = usePdfUpload({ employeeId: EmployeeId });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'] },
    multiple: false,
  });

  // Iniciar el timer cuando se muestra el modal de error
  useEffect(() => {
    if (showErrorModal) {
      const timer = startErrorModalTimer();
      return () => clearInterval(timer);
    }
  }, [showErrorModal, startErrorModalTimer]);

  return (
    <>
      <Card className="w-full max-w-md mx-auto">
        <CardContent className="p-6">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/50 hover:border-muted-foreground'
            }`}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {isDragActive
                ? 'Suelta el archivo PDF aquí'
                : 'Arrastra y suelta un archivo PDF aquí, o haz clic para seleccionar'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Solo archivos PDF
            </p>
          </div>

          {/* Archivo seleccionado */}
          {file && (
            <div className="mt-4 flex items-center justify-between bg-muted p-3 rounded">
              <div className="flex items-center space-x-2 overflow-hidden">
                <FileIcon className="h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                <span className="text-xs text-muted-foreground">
                  ({Math.round(file.size / 1024)} KB)
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={removeFile}
                className="h-8 w-8 flex-shrink-0"
                aria-label="Eliminar archivo"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Botón de subida */}
          <Button
            className="w-full mt-4"
            onClick={handleUpload}
            disabled={!file || isUploading}
          >
            {isUploading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Subiendo...
              </>
            ) : (
              'Subir archivo'
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Modal de error */}
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
          <Progress value={errorModalProgress} className="mt-4" />
        </DialogContent>
      </Dialog>
    </>
  );
}