import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserHomeComponent} from "./users/user-home/user-home.component";
import { AppComponent } from './app.component';
import { NotFoundError } from '@angular/core/primitives/di';

const routes: Routes = [
  {path: "", redirectTo: "", pathMatch: 'full'},
  {path: "users/user-home", component:UserHomeComponent},

  // has to be last path
  //{path: "**", component:NotFoundError}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
