import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  DashboardComponent,
  AddBookComponent
 } from '@app/pages/components';

import { BooksComponent } from '@app/pages/components';
const routes: Routes = [
  { path: '', component: DashboardComponent, children: [
    { path: 'books', title: 'Books', component: BooksComponent },
    { path: 'add-book', title: 'Add Book', component: AddBookComponent }
  ] 
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
