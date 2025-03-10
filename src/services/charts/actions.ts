import httpClient from '@/helpers/httpClient';
import { RequestDashboardStatistics } from '@/types';

const BASE_URL = '/analitics';

export const fecthSummaryRequest =
  async (): Promise<RequestDashboardStatistics> => {
    return await httpClient<RequestDashboardStatistics>({
      method: 'GET',
      endpoint: `${BASE_URL}/requestsSummary`,
    });
  };
