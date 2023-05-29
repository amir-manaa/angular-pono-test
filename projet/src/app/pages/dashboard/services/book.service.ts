import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { pipe, take } from 'rxjs'
import { Book } from '@app/shared/models/models';
import { generateNewId } from '@app/shared/helpers/helpers';

@Injectable()

export class BookService {

    addBook(book: Partial<Book>): Observable<any>{
        let newBook = {
            id: generateNewId('books'),
            ...book
        }
        let bookStorage =  JSON.parse(localStorage.getItem('books')!);
        if (bookStorage !== null) {
            bookStorage.push(newBook);
            localStorage.setItem('books', JSON.stringify(bookStorage));
        } else {
            localStorage.setItem('books', JSON.stringify([newBook]));
        }
        return of(true).pipe(take(1));
    }
}