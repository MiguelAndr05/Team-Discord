import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
<<<<<<< HEAD
=======
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b


//Array of routes to each component
const routes: Routes = [
<<<<<<< HEAD
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: 'FriendList', component: FriendListComponent},
  {path: 'account-creation', component: AccountCreationComponent}
=======
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'account-creation', component: AccountCreationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
>>>>>>> 195735727c9c031afdc8bc73d3bb6f53173f117b

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
