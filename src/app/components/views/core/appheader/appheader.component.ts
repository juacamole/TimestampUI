import { Component } from '@angular/core';
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { AppIsInRolesDirective } from "../../../../directives/app-is-in-roles.dir";
import { AppLoginComponent } from "../app-login/app-login.component";
import { AppRoles } from "../../../../app.roles";

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [UserprofileComponent, AppIsInRolesDirective, AppLoginComponent],
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent {
  readonly AppRoles = AppRoles;
}
