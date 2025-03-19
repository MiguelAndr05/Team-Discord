//api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from './model/user'; 

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    getMessage() {
        return this.http.get(
            'http://localhost:3000/api/message');
    }
    // posts message back w/userObj to api/message so server.js can save it to the database
    postMyMessage(userObj: UserModel){
        return this.http.post("http://localhost:3000/api/message", userObj);
    }
}
