import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserAccountComponent} from "./user-account/user-account.component";
import {UserAccountCreationComponent} from "./user-account-creation/user-account-creation.component";



const appRoutes: Routes = [
  { path: '', redirectTo: 'myaccount', pathMatch: 'full' },
  { path: 'myaccount', component: UserAccountComponent },
  { path: 'newaccount', component: UserAccountCreationComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}

