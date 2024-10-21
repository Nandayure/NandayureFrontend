
import httpClient from "@/helpers/httpClient";
import { JobPosition } from "@/types";

export async function getAllJobPositions() {
  const JobPositions = await httpClient<JobPosition[]>({
    method: "GET",
    endpoint: "/job-positions",
  });
  return JobPositions;
}

export async function getJobPositionsById(jobPositionId: number) {
  const JobPosition = await httpClient<JobPosition>({
    method: "GET",
    endpoint: `/job-positions/${jobPositionId}`,
  });
  return JobPosition;
}