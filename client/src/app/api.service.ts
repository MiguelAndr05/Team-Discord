//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './models/user';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/users';
   
    constructor(private http: HttpClient) { }
    getMessage() : Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
    }
    
    
    getById(id: string) : Observable<User>{
        return this.http.get<User>(this.apiUrl + "/" + id);
    }

    postUser(user: User) : Observable<User>{
        console.log("Creating User: ", user);
        return this.http.post<User>(this.apiUrl, user, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    put(id: string ,user: User) : Observable<User> {
        console.log("Updating User: ", user);
        return this.http.put<User>(this.apiUrl + "/" + id , user, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }

    delete(id: string) : Observable<User>{
        return this.http.delete<User>(this.apiUrl + "/" + id);
    }

}
