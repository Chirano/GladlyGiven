import { Component } from '@angular/core';
import { RouterPaths } from 'src/app/classes/routing/RoutePaths';
import { UserType } from 'src/app/classes/userProfiles/UserType';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { DonationService } from 'src/app/services/donation/donation.service';
import { EventManagerService } from 'src/app/services/events/event-manager.service';

@Component({
  selector: 'app-view-home',
  templateUrl: './view-home.component.html',
  styleUrls: ['./view-home.component.scss'],
})

export class ViewHomeComponent {
  amount : number = 0;
  appointments : number = 0;
  donors : number = 0;

  constructor(
    private donationService: DonationService,
    private authService: AuthService,
    ){}

  ngOnInit(): void{
    this.getReport();
    this.getTotalDonors();
    this.getAppointmentsCount();
  }

  getReport(): void{
    this.donationService.getDonationsAmonunt().subscribe(amount => this.amount = amount);
  }

  getAppointmentsCount(): void{
    this.donationService.getTotalAppointments().subscribe(appointments => this.appointments = appointments);
    console.log(this.appointments);
  }

  getTotalDonors(): void{
    this.donationService.getTotalDonors().subscribe(donors => this.donors = donors);
  
  }



  // User Filter
  // ---------------------------------------------------------

  isGuest() {
    return AuthService.SessionContext.userType === UserType.None;
  }

  isNotGuest() {
    return AuthService.SessionContext.userType != UserType.None;
  }

  isAdmin(): boolean {
    return AuthService.SessionContext.userType === UserType.Admin;
  }

  isRefugee(): boolean {
    return AuthService.SessionContext.userType === UserType.Refugee;
  }

  isServiceProvider(): boolean {
    return AuthService.SessionContext.userType === UserType.ServiceProvider;
  }

  isDonor(): boolean {
    return AuthService.SessionContext.userType === UserType.Donor;
  }

  // Routing
  // ---------------------------------------------------------
  toDontation() {
    EventManagerService.OnRouteEvent.emit(RouterPaths.ViewDonation);
  }
}
