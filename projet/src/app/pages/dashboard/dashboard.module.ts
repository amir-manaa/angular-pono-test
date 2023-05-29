import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

import { AngularMaterialModule } from '@app/shared/modules/modules';
import { BooksComponent } from './books/books.component';
import { AddBookComponent } from './add-book/add-book.component';

import { 
  UserService,
  DashboardService,
  BookService
 } from '@app/pages/dashboard/services/services';
import { FiltersComponent } from './books/filters/filters.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BooksComponent,
    AddBookComponent,
    FiltersComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [UserService, DashboardService, BookService]
})
export class DashboardModule { }
