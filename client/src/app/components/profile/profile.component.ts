import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { SocketService } from '../../socket.service'; // Import SocketService

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  constructor(
    private api: ApiService,
    private router: Router,
    private socketService: SocketService // Inject SocketService
  ) {}

  // Variable to hold the input text
  public inputMessage: string = '';
  // String array to hold messages between users
  public messageBox: string[] = [];
  // String array to hold friends
  public friendsList: string[] = [];
  // Store current user
  public currentUser: any = {};

  public receiverUsername: string = '';
  public receiverDiscriminator: string = '';
  public inputFriendRequest: string = '';

  // String array to hold friend requests
  public friendRequest: string[] = [];

  ngOnInit(): void {
      // Fetch the current user
      this.api.getCurrentUser().subscribe({
        next: (user) => {
          console.log('Logged in as: ', user);
          this.currentUser = user;
          console.log(user);

          // // Emit the logged-in user's name to the server
          // this.socketService.emit('register-user', {
          //   name: user.username,
          //   id: id._id // Replace with the correct property
          // });

        },
        error: (error) => {
          console.error('Could not find user: ', error);
        },
      });

    this.socketService.on('message', (data: any) => {
      console.log('Message received from server:', data);
      this.messageBox.push(data.text); 
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

     
      this.messageBox.push();

     
      this.inputMessage = '';
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