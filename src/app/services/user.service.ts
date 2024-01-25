import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AddUser, User } from 'src/assets/interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://127.0.0.1:8000/';
  private csrfToken: string | null = null;
  constructor(private http: HttpClient) {
    this.getCsrfToken().subscribe(
        response => this.csrfToken = response.csrf_token,
        error => console.error('Failed to get CSRF token:', error)
      );
   }

  getAllUsers() {
    return this.http.get(`${this.baseUrl}users/users`);
  }

  getAllUserBanks(id: number) {
    return this.http.get(`${this.baseUrl}users/banks/${id}`);
  }

  addUser(body: AddUser) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'X-CSRFToken': this.csrfToken || ''
      })
    };

    return this.http.post(`${this.baseUrl}users/newUser`, body, httpOptions)
      .pipe(tap(() => this.updateCsrfToken())
      );
  }

  private getCsrfToken(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/csrf-token');
  }

  private updateCsrfToken(): void {
    this.getCsrfToken().subscribe(
      response => this.csrfToken = response.csrf_token,
      error => console.error('Failed to update CSRF token:', error)
    );
  }

  deleteUser(id: number) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRFToken': this.csrfToken || ''
        })
      };
    return this.http.delete(`${this.baseUrl}users/delete/${id}`, httpOptions).pipe(tap(() => this.updateCsrfToken()));
  }

  deleteBank(user_id: number, bank_id: number) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRFToken': this.csrfToken || ''
        })
      };
    return this.http.delete(`${this.baseUrl}users/bank/delete/${user_id}/${bank_id}`, httpOptions).pipe(tap(() => this.updateCsrfToken()));
  }

  public addBank(bank_name: any) {
    const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRFToken': this.csrfToken || ''
        })
      };
      return this.http.post(`${this.baseUrl}users/newUser`, bank_name, httpOptions)
        .pipe(tap(() => this.updateCsrfToken())
        );
  }
}