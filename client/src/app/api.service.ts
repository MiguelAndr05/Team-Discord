//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api/message';
   
    constructor(private http: HttpClient) { }
    getMessage() {
        return this.http.get(
            this.apiUrl);
    }
    
    
    postUser(userData: any) {
        console.log("Sending data: ", userData);
        return this.http.post('http://localhost:3000/users', userData, {
            headers: new HttpHeaders({ 'Content-Type': 'application/json' })
        });
    }


}
