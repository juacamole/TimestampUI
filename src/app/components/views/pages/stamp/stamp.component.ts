import { Component, OnInit } from '@angular/core';
import { StampService } from '../../../services/stamp.service';
import { Stamp } from '../../../../data/stamp';
import { CommonModule } from '@angular/common';
import { NavigationService } from '../../../../services/navigation.service';

@Component({
  selector: 'app-stamp',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit {
  constructor(
    private service: StampService,
    private navigationService: NavigationService
  ) { }

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
    this.navigationService.reload();
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
      this.workTime = response.workTime;
    });
  }

  getWorkTimeLeft() {
    this.service.getWorkTimeLeft().subscribe((response) => {
      this.workTimeLeft = response.workTimeLeft;
    });
  }

  getStatus() {
    this.service.getStatus().subscribe((response) => {
      this.status = response;
    });
  }
}