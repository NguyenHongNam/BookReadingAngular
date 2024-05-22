export interface Book {
    bookId: number;
    title: string;
    description?: string;
    publisher?: string;
    content?: string;
    imgsrc?: string;
    views: number;
    releaseDate?: Date;
    forMembership?: boolean;
    price?: number;
    categoryId?: number;
    category?: string;
    authorId?: number;
    author?: string;
  }