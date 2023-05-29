import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '@app/shared/models/user';

@Injectable()

export class DashboardService {

    private userProfileDetails = new BehaviorSubject<User | null>(null);
    private profileLoaded = false;

    refreshUserProfile(): void {
        let user: User = JSON.parse(localStorage.getItem('userConnect')!)
        this.userProfileDetails.next(user);
        this.profileLoaded = true;
        this.userProfileDetails.next(user);
    }

    get userProfile() {
        return this.userProfileDetails.value;
    }

    get isProfileLoaded(): boolean {
        return this.profileLoaded;
      }
}