'use client'
import { useTimeTracking } from '@/hooks';
import { Button } from '../ui/button';
import Image from 'next/image';
import { titleFont } from '@/config/fonts';

const TimeTrackingDragAndDrop = () => {
  const {
    dragging,
    uploadedFile,
    fileContent,
    fileInputRef,
    setDragging,
    onDrop,
    onDragOver,
    handleFileUpload,
    handleSave,
    handleDelete,
    openFileDialog,
  } = useTimeTracking();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className={`${titleFont.className} text-4xl mb-8`}>
        Control de Asistencia
      </h1>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
      />

      <div
        className={`border-4 border-dashed p-4 w-[800px] h-[300px] flex items-center justify-center overflow-hidden ${
          dragging ? 'border-blue-500 bg-blue-100' : 'border-gray-300 bg-white'
        }`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={() => setDragging(false)}
      >
        {uploadedFile ? (
          <div className="flex items-center justify-center w-full h-full">
            {uploadedFile.type.startsWith('image/') && fileContent && (
              <Image
                src={fileContent as string}
                alt={uploadedFile.name}
                width={400}
                height={300}
                className="object-contain max-w-full max-h-full"
              />
            )}

            {uploadedFile.type === 'text/plain' && fileContent && (
              <div className="overflow-auto w-full h-full p-2 border rounded bg-gray-50">
                <h3 className="font-bold">{uploadedFile.name}</h3>
              </div>
            )}

            {!uploadedFile.type.startsWith('image/') &&
              uploadedFile.type !== 'text/plain' && (
                <div className="p-2 border rounded">
                  <h3 className="font-bold">{uploadedFile.name}</h3>
                  <p>Tipo de archivo: {uploadedFile.type}</p>
                  <p>Tamaño: {(uploadedFile.size / 1024).toFixed(2)} KB</p>
                </div>
              )}
          </div>
        ) : (
          <p className="text-gray-500">Arrastra y suelta el archivo aquí</p>
        )}
      </div>

      <div className="mt-4 flex space-x-4">
        <Button onClick={openFileDialog} variant="select">
          Seleccionar archivo
        </Button>
        <Button onClick={handleSave}>Guardar</Button>
        <Button onClick={handleDelete} variant="destructive">
          Eliminar
        </Button>
      </div>
    </div>
  );
};

export default TimeTrackingDragAndDrop;
