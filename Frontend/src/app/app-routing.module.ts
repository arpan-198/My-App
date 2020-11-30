import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustompreloadService } from './Services/custompreload.service';


const routes: Routes = [
  {
    path : "",
    loadChildren : ()=> import('./Modules/user/user.module').then(m=>m.UserModule),
    data : {preload : true}
  },
  {
    path : "**",
    pathMatch : "full",
    redirectTo : ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy : CustompreloadService
    }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
