export interface Study {
  id: number;
  name: string;
  StudyCategoryId: string;
}

export interface PatchStudy {
  name: string;
  StudyCategoryId: string;
}
