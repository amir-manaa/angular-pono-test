import { Component, OnInit } from '@angular/core';
import { DashboardService, UserService } from '@app/pages/dashboard/services/services'; 
import { User } from '@app/shared/models/user';
import { UserRole } from '@app/shared/enums/UserRole';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userProfile!: User;
  userRole = UserRole;

  constructor(
    private dashboardService: DashboardService,
    private userService: UserService
  ) {}

    ngOnInit(): void {
      this.getUserProfile();
    }

    logout() {
      this.userService.logout();
    }

    private getUserProfile() {
      this.dashboardService.refreshUserProfile();
      if (this.dashboardService.isProfileLoaded && this.dashboardService.userProfile !== null) {
        this.userProfile = this.dashboardService.userProfile;
      }
    }
}
