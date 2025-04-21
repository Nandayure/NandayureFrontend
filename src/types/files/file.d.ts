export interface PdfFile {
  id: string;
  name: string;
  mimeType?: string;
  thumbnailLink?: string;
  iconLink?: string;
  webViewLink?: string;
  webContentLink?: string;
  parents?: string[];
}

export interface PaginatedFilesResponse {
  data: PdfFile[];
  limit: number;
  nextPageToken: string | null;
  totalItems: number;
}
