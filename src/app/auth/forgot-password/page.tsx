import ForgotPasswordForm from '@/components/auth/forgot-password/forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between px-4 sm:px-6 lg:px-8 py-24 select-none">
      <div className="w-full sm:w-96 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <ForgotPasswordForm />
      </div>
    </main>
  );
};

export default ForgotPasswordPage;
