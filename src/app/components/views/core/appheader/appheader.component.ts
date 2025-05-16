import { Component } from '@angular/core';
import { UserprofileComponent } from "../userprofile/userprofile.component";

@Component({
  selector: 'app-appheader',
  standalone: true,
  imports: [UserprofileComponent],
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.scss']
})
export class AppheaderComponent {}
