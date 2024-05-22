import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Author } from '../models/author';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorServiceService {

  private apiUrl = 'http://localhost:5002/Author';
  constructor(private http: HttpClient) { }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.apiUrl);
  }


  // Lấy tác giả theo ID
  getAuthorById(id: number): Observable<Author> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Author>(url);
  }
  get4Author(): Observable<Author[]> {
    const url = `${this.apiUrl}/top-4-royalties`;
    return this.http.get<Author[]>(url);
  }

  // Thêm tác giả mới
  addAuthor(author: Author): Observable<Author> {
    const categoryUrl = `${this.apiUrl}`;
    return this.http.post<Author>(categoryUrl, author);
  }

  // Cập nhật thông tin tác giả
  updateAuthor(updateAuthor: Author): Observable<any> {
    const categoryUrl = `${this.apiUrl}/${updateAuthor.authorId}`;
    return this.http.put<Author>(categoryUrl, updateAuthor);
  }

  // Xoá tác giả
  deleteAuthor(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  // Lấy nhuận bút của tác giả
  getAuthorRoyalties(id: number): Observable<number> {
    const url = `${this.apiUrl}/royalties/${id}`;
    return this.http.get<number>(url);
  }
}
