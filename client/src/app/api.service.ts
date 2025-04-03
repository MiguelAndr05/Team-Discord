//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/api/message';

  constructor(private http: HttpClient) {}
  getMessage() {
    return this.http.get(this.apiUrl);
  }

  //Post to create user
  createAccountPost(userPost: any) {
    return this.http.post(
      'http://localhost:3000/api/users/createAccount',
      userPost,
      {
        withCredentials: true,
      }
    );
  }

  //Post to login to existing user
  loginAccountPost(accountData: any) {
    return this.http.post(
      'http://localhost:3000/api/users/loginAccount',
      accountData,
      {
        withCredentials: true,
      }
    );
  }

  //Get Current user
  getCurrentUser() {
    return this.http.get('http://localhost:3000/api/users/me', {
      withCredentials: true,
    });
  }

  //Logout of user account
  logoutUser() {
    return this.http.get('http://localhost:3000/api/users/logout', {
      withCredentials: true,
    });
  }

  //Post Friend Request
  sendFriendRequestPost(receiverUsername: string,receiverDiscriminator: string){
    return this.http.post('http://localhost:3000/api/users/sendFriendRequest',
      {
        receiverUsername,
        receiverDiscriminator,
      },
      {
        withCredentials: true,
      });
    }

    //Accept Friend request
    acceptFriendRequestPost(senderID: string){
        return this.http.post('http://localhost:3000/api/users/acceptFriendRequest', {
            senderID,
        },{
            withCredentials: true,
        });
    }

    //Decline Friend request
    declineFriendRequestPost(senderID: string){
        return this.http.post('http://localhost:3000/api/users/declineFriendRequest', {
            senderID,
        },{
            withCredentials: true,
        });
    }
}
