import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Ensure FormsModule is imported
import { HomeComponent } from './components/home/home.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';

import { LoginComponent } from './components/login/login.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FriendListComponent,
        AccountCreationComponent, // Declare the component here
        LoginComponent, // Declare the component here
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule // Import FormsModule if using [(ngModel)]
    ],
    providers: [provideHttpClient()],
    bootstrap: [AppComponent]
})
export class AppModule {}