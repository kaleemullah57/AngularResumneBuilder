import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
// import { AuthService } from './auth.service';

@Injectable()
export class authInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('jwtToken'); // Retrieve token from local storage
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`), // Add token to headers
      });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
