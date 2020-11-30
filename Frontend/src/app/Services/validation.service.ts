import { RegExpSupply } from './RegEx.service';
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
@Injectable({
    providedIn:'root'
})
export class ValidationCheck {

    constructor(private reg:RegExpSupply){}

    checkEmailValidation(): ValidatorFn {
        return (control:AbstractControl):{[key: string]: any} | null=>{
            const email=control.value;
            if(email=="" || email == null) return null;
            return email && this.reg.email.test(email) ? null:{'emailValidation':{value:control.value,message:"Email Does Not Valid"}};
        };
    }

    checkPasswordValidation(): ValidatorFn {
        return (control:AbstractControl):{[key: string]: any} | null =>{
            const password=control.value;
            if(password== "" || password == null) return null;
            return password && this.reg.password.test(password) ? null:{'passwordValidation':{value:control.value,message:"Password Does Not Valid"}};
        };
    }


    checkConfirmPassword(control: AbstractControl):ValidationErrors | null{
            const confirmPassword=control.get('_conPassword').value;
            const password=control.get('_password').value;
            if(confirmPassword == "")return null;
           return confirmPassword && password && confirmPassword != password ? {'validatePassword':{value:confirmPassword,message:"Password mismatch"}} : null;
        }
    
}