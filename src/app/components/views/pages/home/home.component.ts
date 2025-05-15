import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppAuthService } from '../../../services/app.auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [
    NgIf,
    RouterModule
  ],
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router: Router, private authService: AppAuthService) {}

    async navigate() {
        await this.router.navigate(['/stamp']);
        window.location.reload();
    }

    isAuthenticated() {
        return this.authService.isAuthenticated();
    }
}