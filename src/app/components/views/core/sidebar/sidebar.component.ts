import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AppAuthService } from '../../../services/app.auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AppRoles } from '../../../../app.roles';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  protected AppRoles = AppRoles;
  isAdmin$: Observable<boolean>;

  constructor(private authService: AppAuthService) {
    this.isAdmin$ = this.authService.getRoles().pipe(
      map(roles => roles.includes('Admin'))
    );
  }
}
