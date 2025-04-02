import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Router } from '@angular/router';
import { using } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private api: ApiService, private router: Router){}

  //Variable to hold the input text
  public inputMessage: string = "";
  //String array to hold messages between users
  public messageBox: string[] = [];
  //String array to hold friends
  public friendsList: string[] = ["Mario", "Luigi", "Bowser"];
  //Store current user
  public currentUser: any = null;
  
  public receiverUsername: String = "";
  public receiverDiscriminator: String = "";
  public inputFriendRequest: String = "";

  //String array to hold friend requests
  public friendRequest: String [] = [];

  ngOnInit(): void {
      this.api.getCurrentUser().subscribe({
        next: (user) => {
          console.log("Logged in as: ", user);
          this.currentUser = user;
        },
        error: (error) => {
          console.error("Could not find user: ", error);
        }
      });
  }
  
  //Method to send message after clicking a button
  sendMessage(){
    //Create this instance of inputMessage
    var userMessage = this.inputMessage;

    if(userMessage){
      //Push userMessage to messageBox array
      this.messageBox.push(userMessage);
      //Clear the input textfield after sending message
      this.inputMessage = "";
    }
  }

  //Logout Method
  logout(){
    this.api.logoutUser().subscribe({
      next: (res) => {
        console.log("Logged out of user: ", res);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error("Logout failed: ", error);
      }
    });
  }


  //Friend Request method
  sendFriendRequest(){

    if(!this.inputFriendRequest.includes("#")){
      
      alert("Please enter a valid username");
      return;
    }
    //Split data at the #
    var splitFriendRequestData = this.inputFriendRequest.split("#");
    //Store indecies in separate variables
    var receiverUsername = splitFriendRequestData[0].trim();
    var receiverDiscriminator = splitFriendRequestData[1].trim();

    console.log("Sending Friend Request:", { receiverUsername, receiverDiscriminator });

    this.api.sendFriendRequestPost(receiverUsername, receiverDiscriminator).subscribe({
      
      next: (res: any) => {
        if(res.success === false){

          alert(res.message);
        }else{

          alert("Friend Request sent");
        
        }
        
        this.inputFriendRequest = "";
      },
      error: (error) => {
        console.error("Failed to send a friend request", error);
        alert("Failed to send a friend request")
      }
    });
  }

}
