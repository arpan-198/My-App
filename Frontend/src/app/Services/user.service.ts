import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError } from 'rxjs/operators';
import { IUserAuth } from "../Models/userAuth.model";


@Injectable()
export class UserServices{
    private _post_userLoginURL:string = "http://localhost:7001/login";
    private _post_userSignupURL:string = "http://localhost:7001/signup";
    private _post_userUploadURL:string = "http://localhost:7000/upload";
    private _get_userUploadDataURL:string = "http://localhost:7000/table";
    private _delete_userLogoutURL:string = "http://localhost:7001/logout";
    constructor(private http : HttpClient){}


    private errorhandle(errorResponse : HttpErrorResponse){
        if(errorResponse.error instanceof ErrorEvent){
            alert("Client Side Error"+errorResponse.error.message);
            
        }
        else{
            if(errorResponse.error.message && errorResponse.error.message!=="Invalid Token"){
                alert(errorResponse.error.message);
            }
            else if(errorResponse.error.message==="Invalid Token"){
                alert("Try Again");
            }
            
        }
        return throwError('There is a Problem with Service');
    }



    httpPostUserLogin(Data : IUserAuth): Observable<any>{

        return this.http.post<IUserAuth>(this._post_userLoginURL,Data)
        .pipe(
            catchError(this.errorhandle)
        )
    }


    httpPostUserSignup(Data : IUserAuth): Observable<any>{

        return this.http.post<IUserAuth>(this._post_userSignupURL,Data)
        .pipe(
            catchError(this.errorhandle)
        )
    }


    httpPostUserUpload(Data : FormData): Observable<any>{
        
        return this.http.post<any>(this._post_userUploadURL,Data)
        .pipe(
            catchError(this.errorhandle)
        )
    }





    httpGetUploadedData() : Observable<any>{
        return this.http.get<any>(this._get_userUploadDataURL)
        .pipe(
            catchError(this.errorhandle)
        )
    }


    httpDeleteLogout() : Observable<any>{
        return this.http.delete<any>(this._delete_userLogoutURL)
        .pipe(
            catchError(this.errorhandle)
        )
    }


}