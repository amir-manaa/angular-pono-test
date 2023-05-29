import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Filters } from '@app/shared/models/models';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  filtersForm!: FormGroup;
  filters!: Filters;

  @Output() filtersEvent = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  search() {
    this.filters = {
      title: this.filtersForm.get('title')!.value,
      author: this.filtersForm.get('author')!.value,
      price: this.filtersForm.get('price')!.value,
      state: this.filtersForm.get('state')!.value
    }

    this.filtersEvent.emit(this.filters)
  }

  private createForm() {
    this.filtersForm = this.formBuilder.group({
      title: [null],
      author: [null],
      price: [null],
      state: [null]
    })
  }
}
