import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root'
})
export class RatingServiceService {
  private apiUrl = 'http://localhost:5002/api/Rating';
  constructor(private http: HttpClient) { }

  // Cập nhật đánh giá
  updateRating(id: number, rating: Rating): Observable<any> {
    const updateUrl = `${this.apiUrl}/update/${id}`;

    // Set headers if needed (e.g., content type)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.put(updateUrl, rating, { headers }).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Xóa đánh giá
  deleteRating(id: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/delete/${id}`;

    return this.http.delete(deleteUrl).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  // Lấy danh sách bình luận theo BookId
  getRatingsByBook(bookId: number): Observable<any> {
    const getByBookUrl = `${this.apiUrl}/get-by-book/${bookId}`;

    return this.http.get(getByBookUrl).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }


  
  createRating(ratingDTO: Rating): Observable<any> {
    const createUrl = `${this.apiUrl}/create`;

    return this.http.post(createUrl, ratingDTO).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
}
