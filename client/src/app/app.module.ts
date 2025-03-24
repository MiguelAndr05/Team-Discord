//app.module.ts

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { provideRouter } from '@angular/router';
import { Routes } from '@angular/router';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FriendListComponent,
        AccountCreationComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    
    //provideRouter()
    providers: [provideHttpClient(), ],
    bootstrap: [AppComponent]
})
export class AppModule { }
