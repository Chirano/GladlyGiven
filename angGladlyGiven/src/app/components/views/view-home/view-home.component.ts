import { Component } from '@angular/core';
import { DonationReports } from 'src/app/classes/DonationsReport';
import { DonationService } from 'src/app/services/donation/donation.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss'],
})


export class ViewHomeComponent {

  report: DonationReports ={
    appointments: 0, 
    amount: 0,
    volunteers: 0,
  }

  constructor(
    private donationService: DonationService,
    private eventManager: EventManagerService,
    ){}

  ngOnInit(): void{
    this.getReport();
  }

  getReport(): void{
    this.donationService.getDonationsReport().subscribe(report => this.report = report);
  }
}
