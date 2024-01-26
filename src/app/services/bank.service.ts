import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AddBank, AddUser, User } from 'src/assets/interface';

@Injectable({
  providedIn: 'root'
})
export class BankService {
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

  getAllBanks() {
    return this.http.get(`${this.baseUrl}bank/banks`);
  }

  getAllBankUsers(id: number) {
    return this.http.get(`${this.baseUrl}bank/users/${id}`);
  }

  addBank(body: AddBank) {
    return this.http.post(`${this.baseUrl}bank/newBank`, body, this.httpOptions)
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

  deleteBank(id: number) {
    return this.http.delete(`${this.baseUrl}bank/delete/${id}`, this.httpOptions).pipe(tap(() => this.updateCsrfToken()));
  }

  public changeBank(bank: AddBank) {
    return this.http.put(`${this.baseUrl}bank/update/${bank.id}`, bank, this.httpOptions)
    .pipe(tap(() => this.updateCsrfToken()));
  }
}