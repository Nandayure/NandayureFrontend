import * as XLSX from 'xlsx';

// Format date for display
export const formatDate = (dateString: string): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('es-CR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// Calculate percentage
export const calculatePercentage = (value: number, total: number): string => {
  if (total === 0) return '0%';
  return `${((value / total) * 100).toFixed(1)}%`;
};

// Prepare summary data for export
export const prepareSummaryData = (summaryData: any) => {
  return [
    {
      Métrica: 'Total de Solicitudes',
      Valor: summaryData.totalRequests,
      Porcentaje: '100%',
      'Última Actualización': formatDate(summaryData.lastUpdated),
    },
    {
      Métrica: 'Solicitudes Aprobadas',
      Valor: summaryData.totalApproved.total,
      Porcentaje: calculatePercentage(
        summaryData.totalApproved.total,
        summaryData.totalRequests,
      ),
      'Última Actualización': formatDate(summaryData.lastUpdated),
    },
    {
      Métrica: 'Solicitudes Rechazadas',
      Valor: summaryData.totalRejected.total,
      Porcentaje: calculatePercentage(
        summaryData.totalRejected.total,
        summaryData.totalRequests,
      ),
      'Última Actualización': formatDate(summaryData.lastUpdated),
    },
    {
      Métrica: 'Solicitudes Pendientes',
      Valor: summaryData.totalPending.total,
      Porcentaje: calculatePercentage(
        summaryData.totalPending.total,
        summaryData.totalRequests,
      ),
      'Última Actualización': formatDate(summaryData.lastUpdated),
    },
  ];
};

// Prepare request type data for export
export const prepareRequestTypeData = (summaryData: any) => {
  return [
    {
      'Tipo de Solicitud': summaryData.vacationRequests.name,
      Cantidad: summaryData.vacationRequests.total,
      Porcentaje: `${summaryData.vacationRequests.percentage.toFixed(1)}%`,
    },
    {
      'Tipo de Solicitud': summaryData.salaryCertificateRequests.name,
      Cantidad: summaryData.salaryCertificateRequests.total,
      Porcentaje: `${summaryData.salaryCertificateRequests.percentage.toFixed(
        1,
      )}%`,
    },
    {
      'Tipo de Solicitud': summaryData.paymentConfirmationRequests.name,
      Cantidad: summaryData.paymentConfirmationRequests.total,
      Porcentaje: `${summaryData.paymentConfirmationRequests.percentage.toFixed(
        1,
      )}%`,
    },
  ];
};

// Prepare request status data for export
export const prepareRequestStatusData = (summaryData: any) => {
  return [
    {
      Estado: 'Aprobadas',
      Cantidad: summaryData.totalApproved.total,
      Porcentaje: calculatePercentage(
        summaryData.totalApproved.total,
        summaryData.totalRequests,
      ),
    },
    {
      Estado: 'Rechazadas',
      Cantidad: summaryData.totalRejected.total,
      Porcentaje: calculatePercentage(
        summaryData.totalRejected.total,
        summaryData.totalRequests,
      ),
    },
    {
      Estado: 'Pendientes',
      Cantidad: summaryData.totalPending.total,
      Porcentaje: calculatePercentage(
        summaryData.totalPending.total,
        summaryData.totalRequests,
      ),
    },
  ];
};

// Export data to Excel with multiple sheets
export const exportDashboardToExcel = (
  summaryData: any,
  fileName = 'dashboard-solicitudes',
): void => {
  const workbook = XLSX.utils.book_new();

  // Create sheets for each data set
  const summarySheet = XLSX.utils.json_to_sheet(
    prepareSummaryData(summaryData),
  );
  const typeSheet = XLSX.utils.json_to_sheet(
    prepareRequestTypeData(summaryData),
  );
  const statusSheet = XLSX.utils.json_to_sheet(
    prepareRequestStatusData(summaryData),
  );

  // Add sheets to workbook
  XLSX.utils.book_append_sheet(workbook, summarySheet, 'Resumen');
  XLSX.utils.book_append_sheet(workbook, typeSheet, 'Por Tipo');
  XLSX.utils.book_append_sheet(workbook, statusSheet, 'Por Estado');

  // Auto-size columns for each sheet
  const sheets = ['Resumen', 'Por Tipo', 'Por Estado'];
  sheets.forEach((sheet) => {
    const worksheet = workbook.Sheets[sheet];
    const range = XLSX.utils.decode_range(worksheet['!ref'] || 'A1');

    const cols: any[] = [];
    for (let C = range.s.c; C <= range.e.c; ++C) {
      let maxWidth = 10; // Default width
      for (let R = range.s.r; R <= range.e.r; ++R) {
        const cell = worksheet[XLSX.utils.encode_cell({ r: R, c: C })];
        if (cell && cell.v) {
          const width = (cell.v.toString().length + 2) * 1.2;
          if (width > maxWidth) maxWidth = width;
        }
      }
      cols.push({ wch: maxWidth });
    }
    worksheet['!cols'] = cols;
  });

  // Generate file
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
};

// Export data to CSV (combines all data into one CSV)
export const exportDashboardToCSV = (
  summaryData: any,
  fileName = 'dashboard-solicitudes',
): void => {
  // Combine all data with section headers
  const allData = [
    { Sección: 'RESUMEN DE SOLICITUDES' },
    ...prepareSummaryData(summaryData),
    { Sección: '' }, // Empty row as separator
    { Sección: 'DISTRIBUCIÓN POR TIPO DE SOLICITUD' },
    ...prepareRequestTypeData(summaryData),
    { Sección: '' }, // Empty row as separator
    { Sección: 'DISTRIBUCIÓN POR ESTADO DE SOLICITUD' },
    ...prepareRequestStatusData(summaryData),
  ];

  const worksheet = XLSX.utils.json_to_sheet(allData);
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
