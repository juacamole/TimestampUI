import { Component } from '@angular/core';
import { UserprofileComponent } from "../userprofile/userprofile.component";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: 'app-appheader',
  imports: [UserprofileComponent, FooterComponent],
  templateUrl: './appheader.component.html',
  styleUrl: './appheader.component.scss'
})
export class AppheaderComponent {

}
