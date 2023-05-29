import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { User } from '@app/shared/models/user';
import { Observable ,of, throwError } from 'rxjs'
import { generateNewId } from '@app/shared/helpers/helpers';


@Injectable()

export class CreateAccountService {

    registerUser(name: string, email: string, password: string, role: 0 | 1): Observable<Error | boolean> {
        let newUser: User = {
            id: generateNewId('users'),
            name: name,
            email: email,
            password: password,
            role: role
        }
        console.log(newUser);
        return this.addNewUser(newUser);
    }

    isUserLoggedIn(): User {
        return JSON.parse(localStorage.getItem('users')!) as User;
    }

    private addNewUser(newUser: User): Observable<boolean | Error> {

        if (!localStorage.getItem('users')) {
            localStorage.setItem('users', JSON.stringify([newUser]));
            return of(true);
        } else {
            let usersList: User[] = JSON.parse(localStorage.getItem('users')!); 

            if (usersList.filter(user => user.email == newUser.email).length > 0) {
                return throwError('user existe deja !');
            }

            usersList.push(newUser);
            localStorage.setItem('users', JSON.stringify(usersList));
            return of(true);
        }
    }
}