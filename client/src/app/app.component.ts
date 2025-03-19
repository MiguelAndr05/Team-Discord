import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from './api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  router = inject(Router);
  title = 'Client';
  message: any;

  constructor(private apiService: ApiService) { };
  ngOnInit() {
    this.apiService.getMessage().subscribe(data => {
      this.message = data;
    });
  }

}