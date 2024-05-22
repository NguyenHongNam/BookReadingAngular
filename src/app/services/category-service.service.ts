import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {

  private apiUrl = 'http://localhost:5002/Category';
  constructor(private http: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  addCategory(category: Category): Observable<Category> {
    const categoryUrl = `${this.apiUrl}`;
    return this.http.post<Category>(categoryUrl, category);
  }

  updateCategory(updatedCategory: Category): Observable<any> {
    const categoryUrl = `${this.apiUrl}/${updatedCategory.categoryId}`;
    return this.http.put<Category>(categoryUrl, updatedCategory);
  }

  // Method to delete a membership
  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
