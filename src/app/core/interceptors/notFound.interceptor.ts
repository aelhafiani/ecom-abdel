import { inject } from '@angular/core';
import { HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


export function notFoundInterceptor(request: HttpRequest<any>, next: HttpHandlerFn) {
    const router:Router = inject(Router)
    return next(request).pipe(catchError(err => {
        if ([404].includes(err.status) ) {
            router.navigate(['**'])
        }

        const error = err.error?.message || err.statusText;
        console.error(err);
        return throwError(() => error);
    }))
}