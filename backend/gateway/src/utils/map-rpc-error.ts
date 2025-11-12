import { HttpException } from '@nestjs/common';
import { catchError, throwError } from 'rxjs';

export const mapRpcError = (defaultMsg: string) =>
  catchError((err) => {
    const status = err?.status || 500;
    const message = err?.message || defaultMsg;
    return throwError(() => new HttpException(message, status));
  });
