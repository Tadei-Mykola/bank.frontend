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

   private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'X-CSRFToken': this.csrfToken || ''
    })
  };

  getAllUsers() {
    return this.http.get(`${this.baseUrl}users/users`);
  }

  getAllUserBanks(id: number) {
    return this.http.get(`${this.baseUrl}users/banks/${id}`);
  }

  addUser(body: AddUser) {
    return this.http.post(`${this.baseUrl}users/newUser`, body, this.httpOptions)
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
    return this.http.delete(`${this.baseUrl}users/delete/${id}`, this.httpOptions).pipe(tap(() => this.updateCsrfToken()));
  }

  deleteBank(user_id: number, bank_id: number) {
    return this.http.delete(`${this.baseUrl}users/bank/delete/${user_id}/${bank_id}`, this.httpOptions).pipe(tap(() => this.updateCsrfToken()));
  }

  public addBank(id_user: number, bank_name: string) {
    const data = {id_user: id_user, bank_name: bank_name}
    return this.http.post(`${this.baseUrl}users/bank`, data, this.httpOptions)
      .pipe(tap(() => this.updateCsrfToken())
      );
  }

  public changeUser(user: AddUser) {
    return this.http.put(`${this.baseUrl}users/update/${user.id}`, user, this.httpOptions)
    .pipe(tap(() => this.updateCsrfToken()));
  }
}