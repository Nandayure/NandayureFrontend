export * from './types';
export * from './errors';
export * from './client';

import { HttpClient } from './client';

// Crear y exportar una instancia por defecto
const httpClient = new HttpClient();
export default httpClient;