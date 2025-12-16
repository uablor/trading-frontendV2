export interface Params {
    page?: number;
    per_page?: number;
    search?: string;
    type?: 'all' | 'paginate';
    sort?: 'ASC' | 'DESC'
}

export interface PaginateEntity<T> {
  data: T[];
  pagination: {
    count: number;
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
