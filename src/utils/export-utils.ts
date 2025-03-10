import * as XLSX from 'xlsx';

// Helper function to format dates in a readable format
export const formatDate = (dateString: string | null | undefined): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// Helper to get request type name
export const getRequestTypeName = (typeId: number): string => {
  const types: Record<number, string> = {
    1: 'Vacaciones',
    2: 'Constancia salarial',
    3: 'Boletas de pago',
  };
  return types[typeId] || `Tipo ${typeId}`;
};

// Helper to get request state name
export const getRequestStateName = (stateId: number): string => {
  const states: Record<number, string> = {
    1: 'Pendiente',
    2: 'Aprobado',
    3: 'Rechazado',
  };
  return states[stateId] || `Estado ${stateId}`;
};

// Function to prepare data for export
export const prepareDataForExport = (requests: any[]): any[] => {
  return requests.map((request) => {
    // Get the most recent approval
    const lastApproval =
      request.RequestApprovals && request.RequestApprovals.length > 0
        ? request.RequestApprovals[request.RequestApprovals.length - 1]
        : null;

    // Get request details based on type
    let requestDetails = '';
    if (request.RequestTypeId === 1 && request.RequestVacation) {
      requestDetails = `Días: ${
        request.RequestVacation.daysRequested
      }, Salida: ${formatDate(
        request.RequestVacation.departureDate,
      )}, Regreso: ${formatDate(request.RequestVacation.entryDate)}`;
    } else if (
      request.RequestTypeId === 2 &&
      request.RequestSalaryCertificate
    ) {
      requestDetails = `Motivo: ${request.RequestSalaryCertificate.reason}`;
    } else if (
      request.RequestTypeId === 3 &&
      request.RequestPaymentConfirmation
    ) {
      requestDetails = `Motivo: ${request.RequestPaymentConfirmation.reason}`;
    }

    return {
      ID: request.id,
      'Fecha de Solicitud': formatDate(request.date),
      'Tipo de Solicitud': getRequestTypeName(request.RequestTypeId),
      Estado: getRequestStateName(request.RequestStateId),
      'Cédula Empleado': request.EmployeeId,
      'Nombre Empleado': request.Employee
        ? `${request.Employee.Name} ${request.Employee.Surname1} ${request.Employee.Surname2}`
        : '',
      Detalles: requestDetails,
      'Última Observación': lastApproval ? lastApproval.observation : '',
      'Fecha Última Aprobación': lastApproval
        ? formatDate(lastApproval.ApprovedDate)
        : '',
    };
  });
};

// Function to export data to Excel
export const exportToExcel = (data: any[], fileName = 'solicitudes'): void => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Solicitudes');

  // Auto-size columns
  const colWidths = data.reduce((acc, row) => {
    Object.keys(row).forEach((key) => {
      const length = (row[key]?.toString() || '').length;
      acc[key] = Math.max(acc[key] || 0, length);
    });
    return acc;
  }, {} as Record<string, number>);

  worksheet['!cols'] = Object.keys(colWidths).map((key) => ({
    wch: Math.min(colWidths[key] + 2, 50),
  }));

  // Generate file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// Function to export data to CSV
export const exportToCSV = (data: any[], fileName = 'solicitudes'): void => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const csv = XLSX.utils.sheet_to_csv(worksheet);

  // Create a download link
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', `${fileName}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
