import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BookService } from  '@app/pages/dashboard/services/services';
import { Book } from '@app/shared/models/models';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  addBookForm!: FormGroup;
  submitted = false;
  errorMessage = null;

  @ViewChild('successAlter') successAlter!: ElementRef;
  @ViewChild('errorAlert') errorAlert!: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.creatForm();
  }

  private creatForm() {
    this.addBookForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      price: ['', [Validators.required]],
      new: ['', [Validators.required]]
    })
  }

  get form() {
    return this.addBookForm;
  }

  addBook() {
    this.submitted = true;
    if (this.addBookForm.invalid) {
      return;
    }

    let newBook: Partial<Book> = {
      title: this.addBookForm.get('title')!.value,
      author: this.addBookForm.get('author')!.value,
      price: this.addBookForm.get('price')!.value,
      new: this.addBookForm.get('new')!.value,
    }

    this.bookService.addBook(newBook).subscribe(
      () => {
        this.submitted = false;
        this.addBookForm.reset();
        this.renderer.removeClass(this.successAlter.nativeElement, 'hide')
      },
      () => this.renderer.removeClass(this.errorAlert.nativeElement, 'hide')
    )
  }

}
