import { Injectable } from '@angular/core';
import { User } from '@app/shared/models/user';

@Injectable({
    providedIn: 'root'
})

export class AuthenticationService {

    getCurrentUser(): User {
        return JSON.parse(localStorage.getItem('userConnect')!) as User;
    }

    isUserLoggedIn() {
        return this.getCurrentUser() != null;
    }
}