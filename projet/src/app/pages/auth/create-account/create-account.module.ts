import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { CreateAccountRoutingModule } from './create-account-routing.module';
import { CreateAccountComponent } from './create-account.component';

import { PasswordCheckComponent } from '@app/shared/components/components';


@NgModule({
  declarations: [
    CreateAccountComponent,
    PasswordCheckComponent
  ],
  imports: [
    CommonModule,
    CreateAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CreateAccountModule { }
