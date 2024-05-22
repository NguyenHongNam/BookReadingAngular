import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../models/book';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {
  private baseUrl = 'http://localhost:5002/Book';
  constructor(private http: HttpClient) { }

  getAllBooks(): Observable<any> {
    return this.http.get<Book[]>(`${this.baseUrl}/get`);
  }

  getBookById(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  createBook(book: Book): Observable<any> {
    return this.http.post(`${this.baseUrl}/post`, book);
  }

  updateBook(updateBook: Book): Observable<any> {
    const bookUrl = `${this.baseUrl}/${updateBook.bookId}`;
    return this.http.put<Book>(bookUrl, updateBook);
  }

  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  getFreeBooks(): Observable<any> {
    // Trả về danh sách sách miễn phí từ API
    return this.http.get<any[]>(`${this.baseUrl}/free`);
  }

  getNewBooks(): Observable<any[]> {
    // Trả về danh sách sách mới từ API
    return this.http.get<Book[]>(`${this.baseUrl}/new`);
  }
  getBooksforMembership(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/forMembership`);
  }
}
