import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Account, accountLogin } from '../models/account';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Initialize loggedIn based on the existence and validity of the token
  private loggedIn = new BehaviorSubject<boolean>(this.tokenExistsAndIsValid());

  constructor(private http: HttpClient) { }
  private tokenExistsAndIsValid(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
  }

  
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  isLoggedInCurrentValue(): boolean {
    return this.loggedIn.getValue();
  }

  public register(account: Account): Observable<any> {
    return this.http.post<any>("https://localhost:7004/api/Auth/register", account);
  }

  public login(account: accountLogin): Observable<string> {
    return this.http.post("https://localhost:7004/api/Auth/login", account, {responseType: 'text'}).pipe(
      tap(token => {
        localStorage.setItem('loggedIn', 'true'); 
        this.loggedIn.next(true);
      })
    );
  }

}