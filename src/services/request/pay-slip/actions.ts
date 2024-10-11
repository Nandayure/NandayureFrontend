import { RequestPaySlip } from "@/types";


export async function getPaySlip() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_MOCK_BACKEND_UR}/request-payment-confirmations`,
    options,
  );
  const data = await res.json();
  return data;
}

export async function postPaySlip(paySlip: RequestPaySlip, token: string) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paySlip),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/request-payment-confirmations`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
