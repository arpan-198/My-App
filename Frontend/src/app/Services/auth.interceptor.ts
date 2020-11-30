import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpErrorResponse,
    HttpClient,
    HttpResponse
  } from "@angular/common/http";
  import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { UserServices } from "./user.service";
  
  
  
  @Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private _getTokenURL:string = "http://localhost:7001/token";
    constructor(private authService: UserServices  ,private cookieservice : CookieService , private http : HttpClient , private route: Router ) { }
  
    intercept(req: HttpRequest<any>, next: HttpHandler) {
  
  
      const authToken = this.cookieservice.get('Access_TOKEN');
      const authRequest = req.clone({
        headers: req.headers.set("Authorization", "Bearer"+ " " + authToken)
      });
      return next.handle(authRequest).pipe(
        catchError((error: HttpResponse<any>)=>{
          
          if(error.status===401 && error['error'].message==="Invalid Token"){
              let _data ={
                token : this.cookieservice.get('Refresh_TOKEN')
              }
              this.http.post(this._getTokenURL,_data).subscribe(
                (data)=>{
                  this.cookieservice.set("Access_TOKEN",data['access-token'], 1, 'login','localhost', false, "Strict");
                  const newAuthToken = this.cookieservice.get('Access_TOKEN');
                  const newAuthRequest = req.clone({
                    headers: req.headers.set("Authorization", "Bearer"+ " " + newAuthToken)
                  });
                  return next.handle(newAuthRequest);

                },
                (err)=>{
                  this.cookieservice.deleteAll('/', 'localhost');
                  alert("Error Occure");
                  this.route.navigate(['login']);
                  
                }
              )
            
          }
          

          return throwError(error);
        })
      )
    }
  }