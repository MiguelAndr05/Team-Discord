import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; 
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoginComponent } from './components/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        //HomeComponent,
        //FriendListComponent,
        AccountCreationComponent,
        ProfileComponent, // Declare the component here
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