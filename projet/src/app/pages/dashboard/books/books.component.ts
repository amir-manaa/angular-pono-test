import { Component, OnInit } from '@angular/core';
import { DashboardService, BookService } from '@app/pages/dashboard/services/services';
import { Observable } from 'rxjs';
import { User, Book, Filters } from '@app/shared/models/models';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  currentUser!: User;
  books!: Observable<Book[]>;

  constructor(
    private dashboardService: DashboardService,
    private bookService: BookService
  ) { }

  ngOnInit(): void {
    this.getCurrentUser();
    this.getBooks();
  }

  getCurrentUser() {
    this.currentUser = this.dashboardService.userProfile!;
  }

  getBooks(filters?: Filters) {
    this.books = this.bookService.getBooks(filters);
  }

  searchBooks(filters: Filters) {
    this.getBooks(filters)
  }
}
