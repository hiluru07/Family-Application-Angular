import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { Inject, inject } from '@angular/core';
import { Loading } from '../Services/loading';
import { catchError, finalize, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const token = localStorage.getItem("token");

  if (token) {
    const clone = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clone);
  }
  return next(req);
};
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadservice = inject(Loading);

  const skipUrl = environment.API_BASE_URL;

  const skip = req.url.startsWith(skipUrl);

  if (!skip) {
    loadservice.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!skip) {
        loadservice.hide();
      }
    })
  );
};

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = Inject(Router)

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 0) {
        router.navigate(['/error'], { queryParams: { code: 0 } });
      }

      if (error.status === 401) {
        localStorage.clear();
        router.navigate(['/error'], { queryParams: { code: 401 } });
      }

      if (error.status === 500) {
        router.navigate(['/error'], { queryParams: { code: 500 } });
      }

      return throwError(() => error)
    })
  )
}

