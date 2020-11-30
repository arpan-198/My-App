import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserAuth } from 'src/app/Models/userAuth.model';
import { UserServices } from 'src/app/Services/user.service';
import { ValidationCheck } from 'src/app/Services/validation.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  _user_Signup_Form : FormGroup;
  constructor(private fb : FormBuilder ,private auth :UserServices , private valid : ValidationCheck , private route : Router) { }

  ngOnInit(): void {
    this._user_Signup_Form = this.fb.group({
      _name : ['',[Validators.required]],
      _email : ['',[Validators.required,this.valid.checkEmailValidation()]],
      _password : ['',[Validators.required,this.valid.checkPasswordValidation()]],
      _conPassword : ['',Validators.required]
    },{validator : this.valid.checkConfirmPassword})
  }

  signup(){
    let _data : IUserAuth={
      'name' : this.name.value,
      'email' : this.email.value,
      'password' : this.pwd.value
    }

    this.auth.httpPostUserSignup(_data).subscribe(
      (next)=>{ alert(next.message) },
      (err)=>{ console.log(err); },
      ()=>{ this.route.navigate(['login']); }
    )
    



  }
  get name(){
    return this._user_Signup_Form.get('_name');
  }

  get email(){
    return this._user_Signup_Form.get('_email');
  }

  get cPwd(){
    return this._user_Signup_Form.get('_conPassword');
  }

  get pwd(){
    return this._user_Signup_Form.get('_password');
  }
}
