import { Component } from '@angular/core';
import { UserprofileComponent } from "../userprofile/userprofile.component";

@Component({
  selector: 'app-appheader',
  imports: [UserprofileComponent],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.scss'
})
export class AppheaderComponent {

}
