import { Suspense } from "react";
import RequestTableManagement from "@/components/request-management/admin/request-management/request-table-management";

const RequestManagementPage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RequestTableManagement />
    </Suspense>
  );
};

export default RequestManagementPage;