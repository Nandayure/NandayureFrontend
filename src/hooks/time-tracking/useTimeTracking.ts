import { useRef, useState } from 'react';

const useTimeTracking = () => {
  const [dragging, setDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string | ArrayBuffer | null>(
    null,
  );

  
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result);
      };
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileContent(reader.result);
      };
      if (file.type.startsWith('image/')) {
        reader.readAsDataURL(file);
      } else if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    }
  };

  const handleSave = () => {
    if (uploadedFile) {
      alert(`Archivo "${uploadedFile.name}" guardado correctamente.`);
    } else {
      alert('No se ha cargado ningún archivo.');
    }
  };

  const handleDelete = () => {
    setUploadedFile(null);
    setFileContent(null);
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return {
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
  };
};
export default useTimeTracking;
