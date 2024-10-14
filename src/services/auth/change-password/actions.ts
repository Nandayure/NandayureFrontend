import { ChangePassword } from "@/types";

export async function postChangePassword(
  resetPassword: ChangePassword,
  token: string,
) {
  const { OldPassword, Password } = resetPassword;
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      oldPassword: OldPassword,
      newPassword: Password,
    }),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
