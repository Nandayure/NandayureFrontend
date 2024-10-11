import { PaySlipTemplateProps } from "@/types/templates/pay-slip";

export async function getPaySlipInfo({ id }: { id: string }) {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    // TODO:  Change the URL to the correct one
    `https://66331b88f7d50bbd9b48356d.mockapi.io/boletaPago/${id}`,
    options,
  );
  const data = (await res.json()) as PaySlipTemplateProps;
  return data;
}
