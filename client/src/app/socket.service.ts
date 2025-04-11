import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket;

  constructor() {
    // Connect to the Socket.IO server
    this.socket = io('https://team-discord-server.onrender.com'); // Replace with your server URL

    // Log connection status
    this.socket.on('connect', () => {
      console.log('Connected to Socket.IO server:', this.socket.id);

      // Emit the logged-in user's name to the server
      const userName = localStorage.getItem('userName'); // Replace with your method of getting the user's name
      if (userName) {
        this.socket.emit('register-user', { name: userName });
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.IO server');
    });
  }

  // Emit an event to the server
  emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  // Listen for an event from the server
  on(event: string, callback: (data: any) => void): void {
    this.socket.on(event, callback);
  }

  // Disconnect from the server
  disconnect(): void {
    this.socket.disconnect();
  }
}