import { ForgotPassword } from "@/types";


export async function postForgotPassword(Email: ForgotPassword) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(Email),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/forgot-password`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
