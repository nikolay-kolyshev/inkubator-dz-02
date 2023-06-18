export type PaginationView<Entity> = {
    pagesCount: number;
    page: number;
    pageSize: number;
    totalCount: number;
    items: Array<Entity>;
};
