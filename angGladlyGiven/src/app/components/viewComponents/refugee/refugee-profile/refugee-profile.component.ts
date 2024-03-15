import { Component } from '@angular/core';
import { RefugeeService } from 'src/app/services/data/javaSpring/refugee/refugee.service';
import { RefugeePage } from '../RefugeePage';

@Component({
  selector: 'app-refugee-profile',
  templateUrl: './refugee-profile.component.html',
  styleUrls: ['./refugee-profile.component.scss']
})
export class RefugeeProfileComponent {


  ngOnInit() {
    RefugeeService.currentRefugeePage = RefugeePage.Profile;
  }
}
