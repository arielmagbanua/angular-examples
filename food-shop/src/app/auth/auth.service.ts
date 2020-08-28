import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private expirationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(userEmail: string, userPw: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
      {
        email: userEmail,
        password: userPw,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap((resData) => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  private async handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ): Promise<void> {
    const expirationDate = new Date();
    expirationDate.setSeconds(expirationDate.getSeconds() + expiresIn);
    // const expirationDate = new Date(new Date().getTime() + expiresIn);
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );
    this.user.next(user);
    await this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  login(userEmail: string, userPw: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
      {
        email: userEmail,
        password: userPw,
        returnSecureToken: true
      }
    ).pipe(
      catchError(this.handleError),
      tap(async (resData) => {
        await this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        );
      })
    );
  }

  async autoLogin(): Promise<void> {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      await this.autoLogout(expirationDuration);
    }
  }

  async autoLogout(expirationDuration: number): Promise<void> {
    this.expirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  async logout(): Promise<void> {
    this.user.next(null);
    await this.router.navigate(['/auth']);
    localStorage.removeItem('userData');

    if (this.expirationTimer) {
      clearTimeout(this.expirationTimer);
    }

    this.expirationTimer = null;
  }

  protected handleError(errorRes: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already.';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }

    return throwError(errorMessage);
  }
}
