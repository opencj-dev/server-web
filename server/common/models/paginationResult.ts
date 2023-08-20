export class PaginationResult<T> {
  items: Array<T>;
  offset: number;
  limit: number;
  total: number;

  constructor(items: Array<T>, offset: number, limit: number, total: number) {
    this.items = items;
    this.offset = offset;
    this.limit = limit;
    this.total = total;
  }
}
