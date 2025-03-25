//app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { DetailsComponent } from './components/details/details.component';
import { ActivatedRoute, provideRouter, RouterLink, RouterModule } from '@angular/router';
import { Routes } from '@angular/router';
import { EditComponent } from './components/edit/edit.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FriendListComponent,
        DetailsComponent,
        EditComponent,
        AccountCreationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        RouterModule
    ],
    
    //provideRouter()
    providers: [provideHttpClient(), ],
    bootstrap: [AppComponent]
})
export class AppModule { }
