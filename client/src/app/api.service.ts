//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    // URL data is pulled and posted to
    private apiUrl = 'http://localhost:3000/users';
   
    constructor(private http: HttpClient) { }
    // GET List: gets the User array from the given URL
    getMessage() : Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
    
    // GET one Obj: gets one user by its ID
    getById(id: string) : Observable<User>{
        return this.http.get<User>(this.apiUrl + "/" + id);
    }

    // POST Create: makes a user from what's in formGroup
    postUser(user: User) : Observable<User>{
        console.log("Creating User: ", user);
        return this.http.post<User>(this.apiUrl, user, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    // PUT Update: updates an existing user
    put(id: string ,user: User) : Observable<User> {
        console.log("Updating User: ", user);
        return this.http.put<User>(this.apiUrl + "/" + id , user, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    // DELETE: deletes an existing user 
    delete(id: string) : Observable<User>{
        return this.http.delete<User>(this.apiUrl + "/" + id);
    }

}
