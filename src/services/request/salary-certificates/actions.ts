import { RequestSalaryCertificate } from "@/types";


export async function getSalaryCertificates() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_BACKEND_UR}/salary-certificates`,
    options,
  );
  const data = await res.json();
  return data;
}

export async function postSalaryCertificates(
  salaryCertificate: RequestSalaryCertificate,
  token: string,
) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(salaryCertificate),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/request-salary-certificates`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
