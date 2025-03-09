export interface IPostsResponseWithMeta {
  meta: {
    totalItems: string;
    totalPages: string;
    currentPage: string;
    perPage: string;
  };
  data: IPostsField[];
}

export interface IPostsField {
  id: number | null;
  user_id: number | null;
  title: string;
  body: string;
}
