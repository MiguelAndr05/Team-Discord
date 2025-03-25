import { NgModule } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { DetailsComponent } from './components/details/details.component';
import { EditComponent } from './components/edit/edit.component';


//Array of routes to each component
const routes: Routes = [
  {path: '', redirectTo: 'Home', pathMatch: 'full'},
  {path: 'Home', component: HomeComponent},
  {path: "Details/:id", component: DetailsComponent},
  {path: "Edit/:id", component : EditComponent},
  {path: 'FriendList', component: FriendListComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes), RouterLink],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
