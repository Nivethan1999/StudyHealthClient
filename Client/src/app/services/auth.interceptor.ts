import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthIntercepter implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('authToken');
        console.log('Interceptor - Token:', token);
        if(token){  
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                },
            });
        }
        return next.handle(req);
    }
}