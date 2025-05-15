import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { AppAuthService } from "../../../services/app.auth.service";


@Component({
    selector: 'app-login',
    templateUrl: './app-login.component.html',
    styleUrls: ['./app-login.component.scss'],
    imports: [NgIf],
})
export class AppLoginComponent implements OnInit {

  username = ''
  useralias = ''

  constructor(
    private router: Router,
    private authService : AppAuthService
  ) {}

  ngOnInit(): void {
    this.authService.usernameObservable.subscribe(name => {
      this.username = name;
    });
    this.authService.useraliasObservable.subscribe(alias => {
      this.useralias = alias;
    });
  }

  public login () {
    this.authService.login();
  }

  public logout () {
    this.authService.logout()
  }

  public isAuthenticated () : boolean {
    return this.authService.isAuthenticated()
  }

}
