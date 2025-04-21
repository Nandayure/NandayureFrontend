export interface GetFilesQueryParams {
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
  previusPageToken?: string
  hasNextPage: boolean
  hasPreviusPage: boolean
}

