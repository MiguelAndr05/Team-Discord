import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service'; // Import SocketService
import { User } from '../../models/user.model';
import { Message } from '../../models/message.model';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private socketService: SocketService // Inject SocketService
  ) {}

  // Variable to hold the input text
  public inputMessage: string = '';
  // Updated type for messageBox
  public messageBox: { text: string; senderName: string; timestamp: string }[] = [];
  // String array to hold friends
  public friendsList: string[] = [];
  // Store current user
  public currentUser: any = {};

  public receiverUsername: string = '';
  public receiverDiscriminator: string = '';
  public inputFriendRequest: string = '';

  // String array to hold friend requests
  public friendRequest: string[] = [];

  public activeChatUser: any; // Variable to store the active chat user

  ngOnInit(): void {
    this.api.getCurrentUser().subscribe({
      next: (user) => {
        console.log('Logged in as: ', user); 
        this.currentUser = user;

        // Emit the user's data to the backend
        this.socketService.emit('register-user', {
          name: user.username, 
          id: user._id,       
        });
      },
      error: (error) => {
        console.error('Could not find user: ', error);
      },
    });

    // Listen for private messages
    this.socketService.on('private-message', (data: { text: string; senderName: string; timestamp: string }) => {
      console.log('Private message received:', data);

      // Add the private message to the messageBox
      this.messageBox.push({
        text: data.text,
        senderName: data.senderName,
        timestamp: new Date(data.timestamp).toLocaleString(),
      });
    });

    this.socketService.on('friend-request', (data: any) => {
      console.log('Friend request received:', data);
      alert(`Friend request received from ${data.senderUsername}`);
    });
  }

  sendMessage() {
    const userMessage = this.inputMessage;

    if (userMessage) {
      this.socketService.emit('message', { text: userMessage });

      this.messageBox.push({
        text: userMessage,
        senderName: 'You',
        timestamp: new Date().toLocaleString(),
      });

      this.inputMessage = '';
    }
  }

  sendPrivateMessage(recipientId?: string) {
    const userMessage = this.inputMessage;

    if (userMessage && this.activeChatUser) {
      console.log('Emitting private-message event:', {
        recipientId: recipientId || this.activeChatUser._id, // Use the passed recipientId or fallback to activeChatUser._id
        text: userMessage,
      });

      // Emit the private message to the server
      this.socketService.emit('private-message', {
        recipientId: recipientId || this.activeChatUser._id,
        text: userMessage,
      });

      // Add the message to the local message box
      this.messageBox.push({
        text: userMessage,
        senderName: 'You',
        timestamp: new Date().toLocaleString(),
      });

      // Clear the input field
      this.inputMessage = '';
    }
  }

  startPrivateChat(friend: any) {
    console.log('Starting private chat with:', friend);
    console.log('Current user ID:', this.currentUser._id); // Debug log
    console.log('Friend ID:', friend._id); // Debug log
  
    this.activeChatUser = friend;
  
    // Fetch messages from the database
    this.api.getMessages(this.currentUser._id, friend._id).subscribe({
      next: (messages: Message[]) => {
        console.log('Fetched messages:', messages); // Debug log
        this.messageBox = messages.map((message) => ({
          text: message.text,
          senderName: message.senderId === this.currentUser._id ? 'You' : friend.username,
          timestamp: new Date(message.timestamp).toLocaleString(),
        }));
      },
      error: (error) => {
        console.error('Failed to fetch messages:', error); // Debug log
      },
    });
  }

  saveMessage() {
    if (this.inputMessage && this.activeChatUser) {
      const messageData = {
        senderId: this.currentUser._id,
        recipientId: this.activeChatUser._id,
        text: this.inputMessage,
      };

      this.api.saveMessage(messageData).subscribe({
        next: (response) => {
          console.log('Message saved:', response);

          // Add the message to the local message box
          this.messageBox.push({
            text: this.inputMessage,
            senderName: 'You',
            timestamp: new Date().toLocaleString(),
          });

          // Clear the input field
          this.inputMessage = '';
        },
        error: (error) => {
          console.error('Failed to save message:', error);
        },
      });
    }
  }

  // Logout Method
  logout() {
    this.api.logoutUser().subscribe({
      next: (res) => {
        console.log('Logged out of user: ', res);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Logout failed: ', error);
      },
    });
  }

  sendFriendRequest() {
    if (!this.inputFriendRequest.includes('#')) {
      alert('Please enter a valid username');
      return;
    }
    // Split data at the #
    const splitFriendRequestData = this.inputFriendRequest.split('#');
    const receiverUsername = splitFriendRequestData[0].trim();
    const receiverDiscriminator = splitFriendRequestData[1].trim();

    console.log('Sending Friend Request:', { receiverUsername, receiverDiscriminator });

    this.api.sendFriendRequestPost(receiverUsername, receiverDiscriminator).subscribe({
      next: (res: any) => {
        if (res.success === false) {
          alert(res.message);
        } else {
          alert('Friend Request sent');
        }
        this.inputFriendRequest = '';
      },
      error: (error) => {
        console.error('Failed to send a friend request', error);
        alert('Failed to send a friend request');
      },
    });
  }

  // Accept Friend Request
  acceptFriendRequest(senderID: string) {
    this.api.acceptFriendRequestPost(senderID).subscribe({
      next: (res: any) => {
        alert(res.message);
        // Update the currentUser object
        this.api.getCurrentUser().subscribe({
          next: (user) => {
            this.currentUser = user;
          },
        });
      },
      error: (error) => {
        console.error('Accept request failed', error);
      },
    });
  }

  // Decline Friend Request
  declineFriendRequest(senderID: string) {
    this.api.declineFriendRequestPost(senderID).subscribe({
      next: (res: any) => {
        alert(res.message);
        // Update the currentUser object
        this.api.getCurrentUser().subscribe({
          next: (user) => {
            this.currentUser = user;
          },
        });
      },
      error: (error) => {
        console.error('Decline request failed', error);
      },
    });
  }
}