import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { SignupComponent } from 'src/app/Components/signup/signup.component';
import { TableComponent } from 'src/app/Components/table/table.component';
import { UploadComponent } from 'src/app/Components/upload/upload.component';


const routes: Routes = [
  {
    path : "login",
    component : LoginComponent
  },
  {
    path : "signup",
    component : SignupComponent
  },
  {
    path : "uupload" ,
    component : UploadComponent
  },
  {
    path : "table",
    component : TableComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }


export const UserRoutingComponents = [ LoginComponent , SignupComponent , UploadComponent , TableComponent ]
