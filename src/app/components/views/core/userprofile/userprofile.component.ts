import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { AppLoginComponent } from "../app-login/app-login.component";
import { AppIsInRolesDirective } from '../../../../directives/app-is-in-roles.dir';
import { AppRoles } from '../../../../app.roles';
import { CommonModule } from '@angular/common';
import { UserprofileDropdownComponent } from "../userprofile-dropdown/userprofile-dropdown.component";

@Component({
  selector: 'app-userprofile',
  imports: [MatIcon, AppLoginComponent, AppIsInRolesDirective, CommonModule, UserprofileDropdownComponent],
  templateUrl: './userprofile.component.html',
  styleUrl: './userprofile.component.scss'
})
export class UserprofileComponent {
  AppRoles = AppRoles;
  show: boolean = true;

  changeShow() {
    this.show = !this.show;
  }
}