export interface BudgetCode {
  id: number;
  CodSalary: string;
  CodExtra: string;
  CodAnuity: string;
  CodSalaryPlus: string;
}

export interface PatchBudgetCode {
  CodSalary?: string;
  CodExtra?: string;
  CodAnuity?: string;
  CodSalaryPlus?: string;
}