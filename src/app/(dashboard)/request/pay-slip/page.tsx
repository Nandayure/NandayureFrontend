import PaySlipForm from '@/components/request/pay-slip/pay-slip-form';

const PaySlip = () => {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto bg-white border shadow-md rounded-lg overflow-hidden p-6">
        <PaySlipForm />
      </div>
    </div>
  );
};

export default PaySlip;
