import { CurrentToApprove } from "@/types";
import { RequestDetails } from "@/types/request-management/commonTypes";

export async function getAllRequests() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests`,
    options,
  );
  const data = (await res.json()) as RequestDetails[];
  return data;
}

export async function getAllRequestsById(employeeId: number) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/requests/${employeeId}`,
    options,
  );
  const data = (await res.json()) as RequestDetails[];
  return data;
}

export async function getCurrentToApprove(token: string) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/request-approvals/currentToApprove`,
    options,
  );
  const data = (await res.json()) as CurrentToApprove[];
  return data;
}

export async function patchRequestApproval(
  id: number,
  data: { approved: boolean; observation: string },
  token: string,
) {
  const options = {
    method: 'PATCH',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/request-approvals/${id}`,
    options,
  );
  return res;
}
