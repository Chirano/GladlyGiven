import { Component } from '@angular/core';

@Component({
  selector: 'app-refugee-searchbar',
  templateUrl: './refugee-searchbar.component.html',
  styleUrls: ['./refugee-searchbar.component.scss']
})

export class RefugeeSearchbarComponent {
  onSearchSubmit(searchInput: string) {
    if (!searchInput || searchInput.trim() === '') {
      return;
    }

    console.log("searched for:", searchInput);
  }
}
