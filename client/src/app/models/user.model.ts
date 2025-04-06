export interface User {
    _id: string;
    username: string;
    friendsList: string[]; 
    friendRequests: string[]; 
    discriminator: string;
  }