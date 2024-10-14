
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Console } from 'console';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface FormFields {
  EmployeeId: string;
  Password: string;
}

const usePostLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = handleSubmit(async ({ EmployeeId, Password }) => {
    setIsLoading(true);
    const responseNextAuth = await signIn('credentials', {
      EmployeeId,
      Password,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      setError(responseNextAuth.error);
      setIsLoading(false);
      return;
    } else {
      router.push('/');
    }
  });

  return {
    onSubmit,
    register,
    errors,
    isLoading,
    error,
  };
};
export default usePostLogin;
