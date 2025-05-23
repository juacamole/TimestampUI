import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppIsInRolesDirective } from '../../../../directives/app-is-in-roles.dir';
import { AppRoles } from '../../../../app.roles';
import { CommonModule } from '@angular/common';
import { UserprofileDropdownComponent } from "../userprofile-dropdown/userprofile-dropdown.component";
import { AppAuthService } from '../../../services/app.auth.service';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-userprofile',
  imports: [MatIcon, AppIsInRolesDirective, CommonModule, UserprofileDropdownComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent implements OnInit {
  constructor(private authservice: AppAuthService) { } 
  AppRoles = AppRoles;
  show = true;
  userAlias = '';

  ngOnInit() {
    this.getUserName();
  }

  changeShow() {
    this.show = !this.show;
  }

  getUserName() {
    this.authservice.useraliasObservable.subscribe(alias => {
      this.userAlias = alias;
    });
  }
}