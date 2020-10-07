import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

export interface AppError {
  error: boolean;
  statusCode: number;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  private appError: Subject<AppError> = new Subject();

  constructor() { }

  setAppError(message: string, statusCode?: number): void {
    this.appError.next({
      error: true,
      message,
      statusCode: statusCode ? statusCode : null
    });

  }
  getAppError(): Subject<AppError> {
    return this.appError;
  }

  reset(): void{
    this.appError.next({
      error: false,
      message: '',
      statusCode: null
    });
  }
}
