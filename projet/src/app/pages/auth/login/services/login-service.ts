import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { User } from '@app/shared/models/user';
import * as CryptoJS from 'crypto-js';

@Injectable()

export class LoginService {

    constructor() {}

    login(email: string, password: string): Observable<boolean> {
        const users = localStorage.getItem('users');
        if (!users) {
            return throwError('veuillez créer un compte');
        }
        
        const usersList: User[] = JSON.parse(users);

        const foundUser = usersList.find(user => {
            return user.email == email && user.password == password
        });

        if (foundUser) {
            localStorage.setItem('userConnect', JSON.stringify({...foundUser}));
            return of(true);
        } else {
            return throwError('login ou mot de passe incorrect.');
        }
    }

    getUserFromLocalStorage<User>()  {
        const localStorageVal = localStorage.getItem('user')
        if (localStorageVal) {
            return JSON.parse(localStorageVal);
        }
        
    }
}