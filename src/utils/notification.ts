import toast from 'react-hot-toast';

export const notify = async <T>(promise: Promise<T>, messages: { loading: string, success: string, error: string }) => {
  return toast.promise(promise, {
    loading: messages.loading,
    success: messages.success,
    error: messages.error,
  });
};

export const showError = (message: string) => {
  toast.error(message, { duration: 2500 });
};

export const showSuccess = (message: string) => {
  toast.success(message, { duration: 2500 });
};
