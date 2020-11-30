import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingComponents, UserRoutingModule } from './user-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserServices } from 'src/app/Services/user.service';
import { AuthInterceptor } from 'src/app/Services/auth.interceptor';


@NgModule({
  declarations: [ UserRoutingComponents  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
    
  ],
  providers : [UserServices,
  {
    provide :HTTP_INTERCEPTORS,
    useClass : AuthInterceptor,
    multi : true
  }
  ]
})
export class UserModule { }
