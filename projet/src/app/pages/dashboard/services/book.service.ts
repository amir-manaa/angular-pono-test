import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, filter, of, throwError } from 'rxjs';
import { shareReplay, take } from 'rxjs'
import { generateNewId } from '@app/shared/helpers/helpers';
import { DashboardService } from '@app/pages/dashboard/services/services';
import { Filters, Book } from '@app/shared/models/models';

@Injectable()

export class BookService {

    constructor(
        private dashboardService: DashboardService
    ) {}

    addBook(book: Partial<Book>): Observable<any>{
        let newBook = {
            id: generateNewId('books'),
            userId: this.getCurrentUser(), 
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

    getBooks(filters?: Filters): Observable<Book[]> {

        let bookStorage =  JSON.parse(localStorage.getItem('books')!) as Book[];
        let books: Book[] = bookStorage.filter(book => book.userId === this.getCurrentUser());

        if (filters) {

            if (filters.title && filters.title !== null) {
                books = books.filter(book => (book.title).includes(filters.title))
            }

            if (filters.author && filters.author !== null) {
                books = books.filter(book => (book.author).includes(filters.author))
            }

            if (filters.state !== null) {
                books = books.filter(book => book.new == filters.state)
            }


            if (filters.price && filters.price !== null) {
                if (filters.price === '5') {
                    books = books.filter(book => book.price < 5);
                }
                if (filters.price === '5 and 10') {
                    books = books.filter(book => book.price >= 5 && book.price <= 10);
                }
                if (filters.price === '10') {
                    books = books.filter(book => book.price > 10);
                }
            }
        }

        return of(books).pipe(
            shareReplay()
        )
    }

    private getCurrentUser(): number {
        return this.dashboardService.userProfile!.id;
    }
}