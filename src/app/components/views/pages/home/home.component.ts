import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

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
  constructor(private router: Router) { }
  showMessage: boolean = false;

  onClick(): void {
    this.showMessage = !this.showMessage;
    console.log('Button clicked!');
  }

    async navigate() {
        await this.router.navigate(['/stamp']);
        window.location.reload();
    }
}