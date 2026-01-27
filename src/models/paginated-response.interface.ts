export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    totalRecords: number;
    currentPage: number;
    pageSize: number;
  }
}