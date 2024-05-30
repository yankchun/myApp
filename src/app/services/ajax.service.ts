import { Injectable } from '@angular/core';
import { Observable, catchError, delay, map, of, throwError, timer } from 'rxjs';

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

  // checkEmailNotTaken(email: string): Observable<boolean> {
  //   console.log('Checking email:', email);
  //   const emailsTaken = ['test@example.com', 'example@test.com'];
  //   return timer(1000).pipe(
  //     map(() => !emailsTaken.includes(email)),
  //     catchError((error) => {
  //       console.error("Email check failed", error);
  //       return throwError(() => new Error('Email validation failed'));
  //     })
  //   );
  // }

  // checkPhoneNumberNotTaken(phoneNumber: string): Observable<boolean> {
  //   console.log('Checking Phone Number:', phoneNumber);
  //   const phoneNumbersTaken = ['0123456789', '0112223333'];
  //   return timer(1000).pipe(
  //     map(() => {
  //       const isNotTaken = !phoneNumbersTaken.includes(phoneNumber);
  //       console.log('Phone number not taken:', isNotTaken);
  //       return isNotTaken;
  //     }),
  //     catchError((error) => {
  //       console.error("Phone number check failed", error);
  //       return throwError(() => new Error('Phone number validation failed'));
  //     })
  //   );
  // }

  checkPhoneNumber(phoneNumber: string): Observable<boolean> {
    // Simulation of backend checking the phone number
    const validNumbers = ['01234567890', '01123456789']; // Example valid numbers
    return of(!validNumbers.includes(phoneNumber)).pipe(
      delay(500) // Simulating network delay
    );
  }

  checkEmail(email: string): Observable<boolean> {
    // Simulation of backend checking the email
    const validEmails = ['example@example.com', 'test@test.com']; // Example valid emails
    console.log("validEmails.includes(email): ", validEmails.includes(email));
    console.log("of(!validEmails.includes(email)): ", of(!validEmails.includes(email)));
    return of(!validEmails.includes(email)).pipe(
      delay(0) // Simulating network delay
    );
    // return !validEmails.includes(email);
  }
}
