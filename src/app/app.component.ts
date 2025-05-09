import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppheaderComponent } from "./components/views/core/appheader/appheader.component";
import { SidebarComponent } from "./components/views/core/sidebar/sidebar.component";
import { FooterComponent } from "./components/views/core/footer/footer.component";
import { AppIsInRolesDirective } from './directives/app-is-in-roles.dir';
import { AppRoles } from './app.roles';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppheaderComponent, SidebarComponent, FooterComponent, AppIsInRolesDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  AppRoles = AppRoles;
  title = 'TimestampUI';
}
