import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

  //Variable to hold the input text
  public inputMessage: string = "";
  //String array to hold messages between users
  public messageBox: string[] = [];
  //String array to hold friends
  public friendsList: string[] = ["Mario", "Luigi", "Bowser"];
  //String array to hold friend requests
  public friendRequest: string[] = [];
  
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

}
