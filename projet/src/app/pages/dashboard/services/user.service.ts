import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { User } from '@app/shared/models/user';

@Injectable()

export class UserService {

    private userProfileDetails = new BehaviorSubject<User | null>(null);
    
    constructor(
      private router: Router
    ) {}

    logout() {
      localStorage.removeItem('userConnect');
      this.router.navigateByUrl('/login');
    }

    get userProfile() {
        return this.userProfileDetails.value;
      }
}