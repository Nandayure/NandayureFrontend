import { BaseFilterParams } from '@/types/common/base-filter'

export interface GetFilesQueryParams extends BaseFilterParams {
  pageToken?: string
  limit?: number
  orderDirection?: 'asc' | 'desc'
  orderBy?: 'modifiedTime' | 'name' | 'createdTime'
  name?: string
}

export interface FileItem {
  id: string
  name: string
  mimeType: string
  parents: string[]
  thumbnailLink: string
  iconLink: string
  webViewLink: string
  webContentLink: string
}

export interface GetFilesResponse {
  data: FileItem[]
  limit: number
  nextPageToken?: string
  totalItems: number
}
