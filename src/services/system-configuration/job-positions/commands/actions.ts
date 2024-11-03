
import httpClient from "@/helpers/httpClient";
import { JobPosition, PatchJobPosition } from "@/types";

export async function postJobPosition(data: JobPosition) {
  const JobPosition = await httpClient<JobPosition>({
    method: "POST",
    endpoint: "/job-positions",
    data,
  });
  return JobPosition;
}

interface PatchJobPositionProps {
  jobPositionId: number;
  jobPosition: PatchJobPosition;
}

export async function patchJobPosition({
  jobPositionId,
  jobPosition,
}: PatchJobPositionProps) {
  const updatedJobPosition = await httpClient<JobPosition>({
    method: "PATCH",
    endpoint: `/job-positions/${jobPositionId}`,
    data: jobPosition,
  });
  return updatedJobPosition;
}

export async function deleteJobPosition(jobPositionId: number) {
  const response = await httpClient<void>({
    method: "DELETE",
    endpoint: `/job-positions/${jobPositionId}`,
  });
  return response;
}