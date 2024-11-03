export interface FinancialInstitutions {
  id: number;
  TypeFinancialInstitutionId: number;
  name: string;
  description: string;
  deductionPercentage: number;
}

export interface PatchFinancialInstitutions {
  name?: string;
  deductionPercentage?: number;
  description?: string;
  TypeFinancialInstitutionId?: number;
}
