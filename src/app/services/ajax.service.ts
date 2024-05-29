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
}
