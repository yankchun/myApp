import { Injectable } from '@angular/core';
import { Observable, catchError, delay, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AjaxService {

  constructor() { }

  // This function is just to simulate like waiting for a server call
  performAsyncCheck(): Observable<void> {
    return of(undefined).pipe(
      delay(1000),
      catchError((error) => {
        console.error("Server validation failed", error);
        return throwError(() => new Error('Validation failed'));
      })
    );
  }

  checkPhoneNumber(phoneNumber: string): Observable<boolean> {
    const validNumbers = ['01234567890', '01123456789'];
    return of(!validNumbers.includes(phoneNumber)).pipe(
      delay(1000)
    );
  }

  checkEmail(email: string): Observable<boolean> {
    const validEmails = ['example@example.com', 'test@test.com'];
    return of(!validEmails.includes(email)).pipe(
      delay(1000)
    );
  }
}
