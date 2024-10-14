import { Employee, Gender, JobPosition, MaritalStatus } from '@/types';

export async function getGenders() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/genders`,
    options,
  );
  const data = (await res.json()) as Gender[];
  return data;
}

export async function getMaritalStatus() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/marital-status`,
    options,
  );
  const data = (await res.json()) as MaritalStatus[];
  return data;
}

export async function getJobsPositions() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/job-positions`,
    options,
  );
  const data = (await res.json()) as JobPosition[];
  return data;
}

export async function getEmbargoes() {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/embargoes`,
    options,
  );
  const data = await res.json();
  return data;
}

export async function postEmployee(employee: Employee) {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(employee),
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/employees`,
    options,
  );
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message);
  }
  return data;
}
