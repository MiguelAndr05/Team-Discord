import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'; // Ensure FormsModule is imported
import { HomeComponent } from './components/home/home.component';
import { FriendListComponent } from './components/friend-list/friend-list.component';
import { AccountCreationComponent } from './components/account-creation/account-creation.component';
<<<<<<< HEAD
=======
import { LoginComponent } from './components/login/login.component';
>>>>>>> 5160624370ee10cf43bc1d178ba469a72ac5f6db

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        FriendListComponent,
<<<<<<< HEAD
        AccountCreationComponent // Declare the component here
=======
        AccountCreationComponent,
        LoginComponent // Declare the component here
>>>>>>> 5160624370ee10cf43bc1d178ba469a72ac5f6db
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