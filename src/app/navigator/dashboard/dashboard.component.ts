import { SessionStorageService, UserDetails } from './../../services/session-storage.service';
import { IconService } from './../../services/icon.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userDetails: UserDetails;

  constructor(
    public iconService: IconService,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.userDetails = this.sessionStorage.getUserDetails();
  }

}
