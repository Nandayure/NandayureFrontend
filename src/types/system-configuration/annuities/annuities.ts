export interface Annuity { 
  id: number;
  Date: string;
  Description: string;
  Amount: number; 
  EmployeeId: string | number;
  employee?: AnnuityEmployee | null; 
}

export interface PatchAnnuity {
  id?: number;
  Date?: string;
  Description?: string;
  Amount?: number;
  EmployeeId?: number;  
}

export interface PatchAnnuityProps {
  annuityId: number;
  annuity: PatchAnnuity;
}


export interface AnnuityEmployee {
  id: string;
  Name: string;
  Surname1: string;
  Surname2: string;
}
