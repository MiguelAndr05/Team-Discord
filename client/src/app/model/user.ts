export class UserModel{
    userId: number;
    friendId: number;
    userName: String;
    email: String;
    phoneNumber: String;
    friendsList: String[];
    friendRequests: String[];

    constructor(){
        this.userId = 1;
        this.friendId = 10;
        this.userName = "hi12";
        this.email = "fake@gc.ca";
        this.phoneNumber = "123-456-7890";
        this.friendsList = ["Bob Smith"];
        this.friendRequests = ["Martha Smith"];
    }
}