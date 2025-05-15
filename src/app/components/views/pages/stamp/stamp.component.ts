import { Component, OnInit } from '@angular/core';
import { StampService } from '../../../services/stamp.service';
import { Stamp } from '../../../../data/stamp';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stamp',
  imports: [CommonModule],
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit {
  constructor(private service: StampService) { }

  ngOnInit(): void {
    this.getStamps();
    this.getWorkTime();
    this.getWorkTimeLeft();
    this.getStatus();
  }

  workTime = '00:00:00';
  workTimeLeft = '00:00:00';
  status = 'N/A';
  stamps: string[] = [];
  oddStamps: string[] = [];
  evenStamps: string[] = [];

  stamp() {
    this.service.stamp().subscribe((response) => {

      this.stamps = response.map((stamp: Stamp) => stamp.time);

      this.oddStamps = this.stamps.filter((_, index) => index % 2 !== 0);
      this.evenStamps = this.stamps.filter((_, index) => index % 2 === 0);
      this.oddStamps.reverse();
      this.evenStamps.reverse();
    });
    window.location.reload();
  }

  getStamps() {
    this.service.getStamps().subscribe((response) => {
      this.stamps = response.map((stamp: Stamp) => stamp.time);
      this.oddStamps = this.stamps.filter((_, index) => index % 2 !== 0);
      this.evenStamps = this.stamps.filter((_, index) => index % 2 === 0);
      this.oddStamps.reverse();
      this.evenStamps.reverse();
    });
  }

  getWorkTime() {
    this.service.getWorkTime().subscribe((response) => {
      this.workTime = response.toString();
    });
  }

  getWorkTimeLeft() {
    this.service.getWorkTimeLeft().subscribe((response) => {
      this.workTimeLeft = response.toString();
    });
  }

  getStatus() {
    this.service.getStatus().subscribe((response) => {
      console.log(response);
      this.status = response;
    });
  }
}