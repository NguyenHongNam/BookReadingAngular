import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Membership } from '../models/membership';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class MembershipServiceService {
  private apiUrl = 'http://localhost:5002/api/Membership';
  constructor(private http: HttpClient) { }

  getMemberships(): Observable<Membership[]> {
    return this.http.get<Membership[]>(`${this.apiUrl}`);
  }

  // Method to get a specific membership by ID
  getMembership(id: number): Observable<Membership> {
    return this.http.get<Membership>(`${this.apiUrl}/${id}`);
  }

  // Method to add a new membership
  addMembership(membership: Membership): Observable<Membership> {
    const membershipUrl = `${this.apiUrl}`;
    return this.http.post<Membership>(membershipUrl, membership);
  }

  // Method to update an existing membership
  updateMembership(updatedMembership: Membership): Observable<any> {
    const membershipUrl = `${this.apiUrl}/${updatedMembership.membershipId}`;
    return this.http.put<Membership>(membershipUrl, updatedMembership);
  }

  // Method to delete a membership
  deleteMembership(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Method to search for memberships by name
  searchMemberships(name: string): Observable<Membership[]> {
    return this.http.get<Membership[]>(`${this.apiUrl}/search/${name}`);
  }
}
