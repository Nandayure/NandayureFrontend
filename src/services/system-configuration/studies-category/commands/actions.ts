import { StudiesCategory,PatchStudiesCategory } from "@/types";
import httpClient from "@/helpers/httpClient";

export async function postStudiesCategory(data: StudiesCategory) {
  const studiesCategory = await httpClient<StudiesCategory>({
    method: "POST",
    endpoint: "/studies-categories",
    data,
  });
  return studiesCategory;
}

interface PatchStudiesCategoryProps {
  studiesCategoryId: number;
  studiesCategory: PatchStudiesCategory;
}

export async function patchStudiesCategory({
  studiesCategoryId,
  studiesCategory,
}: PatchStudiesCategoryProps) {
  const updatedStudiesCategory = await httpClient<StudiesCategory>({
    method: "PATCH",
    endpoint: `/studies-categories/${studiesCategoryId}`,
    data: studiesCategory,
  });
  return updatedStudiesCategory;
}

export async function deleteStudiesCategory(studiesCategoryId: number) {
  const response = await httpClient<void>({
    method: "DELETE",
    endpoint: `/studies-categories/${studiesCategoryId}`,
  });
  return response;
}

