import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { Account } from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly TOKEN_KEY = 'access_token';
  private readonly ACCOUNT_ID = 'AccountId';
  private baseUrl = 'http://localhost:5002/Auth'; // URL của API
  private authTokenKey = 'authToken';
  private accountId = 'foundAccount';
  constructor(private http: HttpClient) {
    this.checkLoginStatus();
   }

   private checkLoginStatus(): void {
    const token = localStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.isLoggedInSubject.next(true);
    }
  }
  loginSuccess(token: string,accountid:number): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ACCOUNT_ID, accountid.toString());
    this.isLoggedInSubject.next(true);
  }
  getUserFromToken(): Account | null {
    const token = this.getAuthToken();
    if (!token) return null;
  
    const decodedToken = this.decodeToken(token);
    return decodedToken ? {
        accountId: decodedToken.AccountId, // Assuming claim has AccountId (adjust if different)
        username: decodedToken.Username,
        password: decodedToken.Password,
        email: decodedToken.Email,
        fullname: decodedToken.Fullname,
        gender: decodedToken.Gender, // Assuming claim has Gender (adjust if different)
        balance: decodedToken.Balance,
        membership: decodedToken.Membership,
        path: decodedToken.Path,
        role: decodedToken.Role,
        createdDate: new Date(decodedToken.CreatedDate), // Assuming claim has CreatedDate (adjust if different)
    } : null;
  }

  getUserById(id: number): Observable<Account> {
    return this.http.get<Account>(`${this.baseUrl}/${id}`);
  }
  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isLoggedInSubject.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }
  signIn(user: UserForm): Observable<AuthToken> {
    const signInUrl = `${this.baseUrl}/sign-in`;

    // Set headers if needed (e.g., content type)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(signInUrl, user, { headers }).pipe(
      map((response: any) => {
        // Assuming your API returns the AuthToken object
        this.setAuthToken(response as AuthToken);
        return response as AuthToken;
      }),
      catchError((error) => {
        // Handle error appropriately, e.g., log or throw a custom exception
        throw error;
      })
    );
  }
  editAccount(user: Account): Observable<any> {
    const accountUrl = `${this.baseUrl}/edit/${user.accountId}`;
    return this.http.put<Account>(accountUrl, user);
  }
  getAccount(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/get/${id}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  register(user: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }
  setAuthToken(token: any): void {
    localStorage.setItem(this.authTokenKey, token.accessToken);
    localStorage.setItem(this.accountId, token.accountId);
  }

  getAuthToken(): string | null {
    const storedToken = localStorage.getItem(this.authTokenKey);
    return storedToken ? storedToken : null;
  }

  clearAuthToken(): void {
    localStorage.removeItem(this.authTokenKey);
  }

  checkToken(accessToken: string): Observable<any> {
    const checkTokenUrl = `${this.baseUrl}/Auth/validate-token`;

    // Send only the accessToken in the request body
    const requestBody = { AccessToken: accessToken };

    return this.http.post(checkTokenUrl, requestBody).pipe(
      map((response: any) => {
        // Handle the response as needed
        return response;
      }),
      catchError((error) => {
        // Handle error appropriately, e.g., log or throw a custom exception
        console.log(error);
        throw error;
      })
    );
  }

  async checkLogined(): Promise<boolean> {
    const token: string | null = this.getAuthToken();

    if (token) {
      try {

        await this.checkToken(token).toPromise();
        return true;

      } catch (error) {

        this.clearAuthToken();
        return false;

      }
    } else {

      this.clearAuthToken();
      return false;

    }
  }

  decodeToken(token: string | null) {
    if (!token) return null;

    const parts = token.split('.');

    if (parts.length !== 3) {
      throw new Error('Invalid token format');
    }

    try {
      const decoded = atob(parts[1]);
      const json = JSON.parse(decoded);
      return json;

    } catch (error) {
      console.error(error);
      return null;
    }

  }

  hasRole(targetRole: string): boolean {
    const decodedToken = this.decodeToken(this.getAuthToken());

    // Check if the decoded token has a 'roles' property and if it contains the target role
    return decodedToken && decodedToken.Role && decodedToken.Role == targetRole;
  }

  // Gửi yêu cầu HTTP để đăng ký
  signUp(user: Account): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, user);
  }
  updateUserInfo(updatedUser: Account) {
    const token = localStorage.getItem('accessToken');
    if (token) {
      return this.http.put(`${this.baseUrl}/edit/${updatedUser.accountId}`, updatedUser, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    }
    return null;
  }

  // Gửi yêu cầu HTTP để xác thực token
  validateToken(tokenData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/validate-token`, tokenData);
  }

  // Gửi yêu cầu HTTP để lấy thông tin tài khoản
  getAccountList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get-all`);
  }

  // Gửi yêu cầu HTTP để xóa tài khoản
  deleteAccount(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  deposit(accountId: number, amount: number, series: string): Observable<any> {
    const depositUrl = `${this.baseUrl}/deposit/${accountId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Tạo body request với amount và series
    const body = { amount, series };

    return this.http.put(depositUrl, body, { headers }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
  changePassword(accountId: number, currentPassword: string, newPassword: string): Observable<any> {
    const changePasswordUrl = `${this.baseUrl}/change-password/${accountId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { currentPassword, newPassword };

    return this.http.put(changePasswordUrl, body, { headers }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
  getMembershipStats(): Observable<any> {
    return this.http.get(`${this.baseUrl}/membership-stats`);
  }

  registerMembership(accountId: number, membershipId: number): Observable<any> {
    const registerMembershipUrl = `${this.baseUrl}/register-membership/${accountId}`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.post(registerMembershipUrl, membershipId, { headers }).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
}
export interface UserForm {
  Username: string;
  Password: string;
}

export interface AuthToken {
  AccessToken: string;
  Expires: number;
}