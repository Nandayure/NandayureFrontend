import RequestVacationForm from '@/components/request/request-vacation/request-vacation-form';

const VacationRequestPage = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden p-6">
        <RequestVacationForm />
      </div>
    </div>
  );
};

export default VacationRequestPage;
