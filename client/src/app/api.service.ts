//api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model'; 
import { Message } from './models/message.model'; 


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

  // Fetch the current user
  getCurrentUser(): Observable<User> {
    return this.http.get<User>('/api/users/me'); 
  }

  getMessages(userId: string, friendId: string): Observable<Message[]> {
  return this.http.get<Message[]>(
    `http://localhost:3000/api/messages/${userId}/${friendId}`,
    {
      withCredentials: true, 
    }
  );
}

  saveMessage(messageData: { senderId: string; recipientId: string; text: string }) {
    return this.http.post('/api/messages', messageData);
  }

  //Logout of user account
  logoutUser() {
    return this.http.get('http://localhost:3000/api/users/logout', {
      withCredentials: true,
    });
  }

  //Post Friend Request
  sendFriendRequestPost(receiverUsername: string, receiverDiscriminator: string) {
    return this.http.post(
      'http://localhost:3000/api/users/sendFriendRequest',
      {
        receiverUsername,
        receiverDiscriminator,
      },
      {
        withCredentials: true,
      }
    );
  }

  //Accept Friend request
  acceptFriendRequestPost(senderID: string) {
    return this.http.post(
      'http://localhost:3000/api/users/acceptFriendRequest',
      {
        senderID,
      },
      {
        withCredentials: true,
      }
    );
  }

  //Decline Friend request
  declineFriendRequestPost(senderID: string) {
    return this.http.post(
      'http://localhost:3000/api/users/declineFriendRequest',
      {
        senderID,
      },
      {
        withCredentials: true,
      }
    );
  }
}
