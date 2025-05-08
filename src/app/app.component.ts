import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppheaderComponent } from "./components/views/core/appheader/appheader.component";
import { DashboardComponent } from "./components/views/pages/dashboard/dashboard.component";
import { SidebarComponent } from "./components/views/core/sidebar/sidebar.component";
import { FooterComponent } from "./components/views/core/footer/footer.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, AppheaderComponent, DashboardComponent, SidebarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'TimestampUI';
}
