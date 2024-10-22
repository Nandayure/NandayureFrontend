export { default as useChangePassword } from './auth/change-password/usePostChangePassword';
export { default as useForgotPassword } from './auth/forgot-password/usePostSendEmail';
export { default as useLogin } from './auth/login/usePostLogin';
export { default as useRegister } from './auth/register/usePostEmployee';
export { default as usePostResetPassword } from './auth/reset-password/usePostResetPasssword';
export { default as useGetEmbargoes } from './auth/register/useGetEmbargoes';
export { default as useGetGenders } from './auth/register/useGetGenders';
export { default as useGetJobPositions } from './auth/register/useGetJobPositions';
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


export {default as useGetAllCivilStatus} from './system-configuration/civilStatus/queries/useGetAllCivilState'
export {default as useGetCivilStatusById} from './system-configuration/civilStatus/queries/useGetByIdCivilState'
export {default as useDeleteCivilStatus} from './system-configuration/civilStatus/commands/useDeleteCivilState'
export {default as usePostCivilStatus} from './system-configuration/civilStatus/commands/usePostCivilState'
export {default as usePatchCivilStatus} from './system-configuration/civilStatus/commands/usePatchCivilState'


