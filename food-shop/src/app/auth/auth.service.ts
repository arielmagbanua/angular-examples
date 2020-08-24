import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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
  constructor(private http: HttpClient) {
  }

  signUp(userEmail: string, userPw: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDoXHYfxxZ77ER4Qz5eVNUyLInfDLxEG3M',
      {
        email: userEmail,
        password: userPw,
        returnSecureToken: true
      }
    ).pipe(
      catchError((errorRes) => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }

        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already.';
            break;
        }

        return throwError(errorMessage);
      })
    );
  }

  login(userEmail: string, userPw: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDoXHYfxxZ77ER4Qz5eVNUyLInfDLxEG3M',
      {
        email: userEmail,
        password: userPw,
        returnSecureToken: true
      }
    );
  }
}
