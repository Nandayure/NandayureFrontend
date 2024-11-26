export { default as useChangePassword } from './auth/change-password/usePostChangePassword';
export { default as useForgotPassword } from './auth/forgot-password/usePostSendEmail';
export { default as useLogin } from './auth/login/usePostLogin';
export { default as useRegister } from './auth/register/usePostEmployee';
export { default as usePostResetPassword } from './auth/reset-password/usePostResetPasssword';
export { default as useGetMaritalStatus } from './auth/register/useGetMaritalStatus';
export { default as usePostEmployee } from './auth/register/usePostEmployee';

export { default as useGetEmployeeId } from './common/useGetEmployeeId';
export { default as useGetRoles } from './common/useGetRoles';
export { default as useGetToken } from './common/useGetToken';

export { default as useGetByIdEmployee } from './profile/useGetByIdEmployee';
export { default as useUpdateEmployee } from './profile/useUpdateEmployee';

export { default as usePostPaySlip } from './request/pay-slip/usePostPaySlip';
export { default as usePostVacation } from './request/request-vacation/usePostVacation';
export { default as usePostSalaryCetificates } from './request/salary-certificates/usePostSalaryCetificates';

export { default as useTimeTracking } from './time-tracking/useTimeTracking';

export { default as useSalaryCertificateTemplates } from './templates/salary-certificate/useSalaryCertificateTemplates';
export { default as useuseVacationsData } from './templates/vacations/useVacationsData';
export { default as useGetPaySlipTemplate } from './templates/pay-slip/usePaySlipTemplate';

export { default as useGetAllRequest } from './request-management/useGetAllRequest';
export { default as useGetAllRequestById } from './request-management/useGetAllRequesById';
export { default as useGetCurrentToApprove } from './request-management/useGetCurrentToApprove';

export { default as useGetAllDepartments } from './system-configuration/departments/queries/useGetAllDepartments';
export { default as useGetDepartmentById } from './system-configuration/departments/queries/useGetDepartmentById';
export { default as useDeleteDepartment } from './system-configuration/departments/commands/useDeleteDepartment';
export { default as usePostDepartment } from './system-configuration/departments/commands/usePostDepartment';
export { default as usePatchDepartament } from './system-configuration/departments/commands/usePatchDepartment';

export { default as useGetAllDepartmentPrograms } from './system-configuration/department-programs/queries/useGetAllDepartmentPrograms';
export { default as useGetDepartmentProgramById } from './system-configuration/department-programs/queries/useGetByIdDepartmentProgram';
export { default as usePostDepartmentProgram } from './system-configuration/department-programs/commands/usePostDepartmentProgram';
export { default as usePatchDepartamentProgram } from './system-configuration/department-programs/commands/usePatchDepartmentProgram';
export { default as useDeleteDepartmentProgram } from './system-configuration/department-programs/commands/useDeleteDepartmentProgram';

export { default as useGetAllEmployees } from './system-configuration/employees/queries/useGetAllEmployees';

export { default as useGetAllBudgetCodes } from './system-configuration/budget-codes/queries/useGetAllBudgetCodes';
export { default as useGetBudgetCodeById } from './system-configuration/budget-codes/queries/useGetBudgetCodeById';
export { default as usePostBudgetCode } from './system-configuration/budget-codes/commands/usePostBudgetCode';
export { default as usePatchBudgetCode } from './system-configuration/budget-codes/commands/usePatchBudgetCode';
export { default as useDeleteBudgetCode } from './system-configuration/budget-codes/commands/useDeleteBudgetCode';

export { default as useGetAllStudiesCategory } from './system-configuration/studies-category/queries/useGetAllStudiesCategory';
export { default as useGetStudiesCategoryById } from './system-configuration/studies-category/queries/useGetStudiesCategoryById';
export { default as usePostStudiesCategory } from './system-configuration/studies-category/commands/usePostStudiesCategory';
export { default as usePatchStudiesCategory } from './system-configuration/studies-category/commands/usePatchStudiesCategory';
export { default as useDeleteStudiesCategory } from './system-configuration/studies-category/commands/useDeleteStudiesCategory';

export { default as useGetAllStudies } from './system-configuration/studies/queries/useGetAllStudies';
export { default as useGetStudyById } from './system-configuration/studies/queries/useGetStudyById';
export { default as usePostStudy } from './system-configuration/studies/commands/usePostStudy';
export { default as usePatchStudy } from './system-configuration/studies/commands/usePatchStudy';
export { default as useDeleteStudy } from './system-configuration/studies/commands/useDeleteStudy';

export { default as useGetAllTypeFinancialInstitutions } from './system-configuration/type-financial-institutions/queries/useGetAllTypeFinancialInstitutions';
export { default as useGetTypeFinancialInstitutionById } from './system-configuration/type-financial-institutions/queries/useGetTypeFinancialInstitutionById';
export { default as usePostTypeFinancialInstitution } from './system-configuration/type-financial-institutions/commands/usePostTypeFinancialInstitution';
export { default as usePatchTypeFinancialInstitution } from './system-configuration/type-financial-institutions/commands/usePatchTypeFinancialInstitution';
export { default as useDeleteTypeFinancialInstitution } from './system-configuration/type-financial-institutions/commands/useDeleteTypeFinancialInstitution';

export { default as useGetAllJobPositions } from './system-configuration/job-positions/queries/useGetAllJobPositions';
export { default as useGetJobPositionById } from './system-configuration/job-positions/queries/useGetJobPositionById';
export { default as usePostJobPosition } from './system-configuration/job-positions/commands/usePostJobPosition';
export { default as usePatchJobPosition } from './system-configuration/job-positions/commands/usePatchJobPosition';
export { default as useDeleteJobPosition } from './system-configuration/job-positions/commands/useDeleteJobPosition';

export { default as useGetAllFinancialInstitutions } from './system-configuration/financial-institutions/queries/useGetAllFinancialInstitutions';
export { default as useGetFinancialInstitutionById } from './system-configuration/financial-institutions/queries/useGetFinancialInstitutionById';
export { default as usePostFinancialInstitution } from './system-configuration/financial-institutions/commands/usePostFinancialInstitution';
export { default as usePatchFinancialInstitution } from './system-configuration/financial-institutions/commands/usePatchFinancialInstitution';
export { default as useDeleteFinancialInstitution } from './system-configuration/financial-institutions/commands/useDeleteFinancialInstitution';

export {default as useGetAllCivilStatus} from './system-configuration/civilStatus/queries/useGetAllCivilState'
export {default as useGetCivilStatusById} from './system-configuration/civilStatus/queries/useGetByIdCivilState'
export {default as useDeleteCivilStatus} from './system-configuration/civilStatus/commands/useDeleteCivilState'
export {default as usePostCivilStatus} from './system-configuration/civilStatus/commands/usePostCivilState'
export {default as usePatchCivilStatus} from './system-configuration/civilStatus/commands/usePatchCivilState'


export { default as useGetAllGender } from './system-configuration/gender/queries/useGetAllGender';
export { default as usePostGender } from './system-configuration/gender/commads/usePostGender';
export { default as usePatchGender } from './system-configuration/gender/commads/usePatchGender';
export { default as useDeleteGender } from './system-configuration/gender/commads/useDeleteGender';

export {default as useDeleteAnnuity} from './system-configuration/annuities/commands/useDeleteAnnuity';
export {default as usePatchAnnuity} from './system-configuration/annuities/commands/usePatchAnnuity';
export {default as usePostAnnuity} from './system-configuration/annuities/commands/usePostAnnuity';
export {default as useGetAllAnnuities} from './system-configuration/annuities/queries/useGetAllAnnuities';
export {default as useGetAnnuity} from './system-configuration/annuities/queries/useGetAnnuityById';
export {default as useGetEmployees} from './system-configuration/annuities/queries/useGetEmployees';