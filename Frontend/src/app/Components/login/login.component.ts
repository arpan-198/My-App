import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { IUserAuth } from 'src/app/Models/userAuth.model';
import { UserServices } from 'src/app/Services/user.service';
import { ValidationCheck } from 'src/app/Services/validation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  _user_Login_Form : FormGroup;
  constructor(private fb : FormBuilder ,private auth :UserServices , private route : Router , private valid : ValidationCheck , private cookieservice : CookieService) { }

  ngOnInit(): void {
    this._user_Login_Form = this.fb.group({
      _email : ['',[Validators.required,this.valid.checkEmailValidation()]],
      _password : ['',[Validators.required,this.valid.checkPasswordValidation()]]
    })
  }

  checkLogin(){
    let _data : IUserAuth={
      'email' : this.email.value,
      'password' : this.pwd.value
    }

    this.auth.httpPostUserLogin(_data).subscribe(
      (next)=>{
      
        this.cookieservice.set("Access_TOKEN",next['access-token'], 1, 'login','localhost', false, "Strict");

        this.cookieservice.set("Refresh_TOKEN",next['refresh-token'], 1, 'login','localhost', false, "Strict");
       },
      (err)=>{ console.log(err); },
      ()=>{  this.route.navigate(['uupload'])    }
    )
    



  }

  get email(){
    return this._user_Login_Form.get('_email');
  }

  get pwd(){
    return this._user_Login_Form.get('_password');
  }
}
