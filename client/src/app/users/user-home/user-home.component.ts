import { Component, inject } from '@angular/core';
import { UserModel } from '../../model/user';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-user-home',
  standalone: false,
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent {
  // obj and obj array to test displaying objs
  userObj: UserModel = new UserModel();
  userList: UserModel[] = [this.userObj,this.userObj,this.userObj];
  // checking if objs can be added & trying to use post method in api.service.ts
  // to send the obj to server.js
  appendListElement(){
    //apiObj: ApiService = new ApiService().postMyMessage();
    this.userList[this.userList.length] = this.userObj;
  }
  // deletes obj from array
  deleteListElement(){
    this.userList.pop();
  }
}
