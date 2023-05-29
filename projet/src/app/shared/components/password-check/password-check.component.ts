import { Component, Input, OnInit, DoCheck, Output, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-password-check',
  templateUrl: './password-check.component.html',
  styleUrls: ['./password-check.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordCheckComponent),
      multi: true
    }
  ]
})
export class PasswordCheckComponent implements OnInit, DoCheck, ControlValueAccessor {
  @Input() newPassword?: string;
  @Input() newPasswordConfirm?: string;
  @Input() isSecurePassword?: boolean;
  @Output() isSecurePasswordChange: EventEmitter<boolean> = new EventEmitter();

  checkSamePassword = true;
  messages: any;
  displayPasswordBox: boolean;
  minPasswordLength: boolean;
  oneUppercaseLetter: boolean;
  oneLowercaseLetter: boolean;
  oneNumberChar: boolean;
  specialChar: boolean;
  samePassword: boolean;
  checkoneLowercaseLetter: any;
  checkoneUppercaseLetter: any;
  checkoneNumberChar: any;
  checkoneSpecialChar: any;
  checkoneWhiteSpace: any;
  @Input('value') _value: any;
  onChange: any = () => { };
  onTouched: any = () => { };


  constructor() {
    this.displayPasswordBox = false;
    this.minPasswordLength = false;
    this.oneUppercaseLetter = false;
    this.oneLowercaseLetter = false;
    this.oneNumberChar = false;
    this.specialChar = false;
    this.samePassword = false;
    this.checkoneLowercaseLetter = new RegExp('^(?=.*[a-z])');
    this.checkoneUppercaseLetter = new RegExp('^(?=.*[A-Z])');
    this.checkoneNumberChar = new RegExp('^(?=.*[0-9])');
    this.checkoneSpecialChar = new RegExp('[^A-Za-z0-9]');
    this.checkoneWhiteSpace = new RegExp('[\\s]');
  }

  ngOnInit() {
  }

  ngDoCheck() {
    if (this.newPassword) {
      this.displayPasswordBox = true;
      if (this.checkSamePassword) {
        if (this.newPassword === this.newPasswordConfirm) {
          this.samePassword = true;
        } else {
          this.samePassword = false;
        }
      }
      if (this.newPassword.length >= 6) {
        this.minPasswordLength = true;
      } else {
        this.minPasswordLength = false;
      }
      if (this.checkoneLowercaseLetter.test(this.newPassword)) {
        this.oneLowercaseLetter = true;
      } else {
        this.oneLowercaseLetter = false;
      }
      if (this.checkoneUppercaseLetter.test(this.newPassword)) {
        this.oneUppercaseLetter = true;
      } else {
        this.oneUppercaseLetter = false;
      }
      if (this.checkoneNumberChar.test(this.newPassword)) {
        this.oneNumberChar = true;
      } else {
        this.oneNumberChar = false;
      }

      if (this.checkoneSpecialChar.test(this.newPassword) && !this.checkoneWhiteSpace.test(this.newPassword)) {
        this.specialChar = true;
      } else {
        this.specialChar = false;
      }

      if (
        this.oneNumberChar === true &&
        this.oneUppercaseLetter === true &&
        this.oneLowercaseLetter === true &&
        this.minPasswordLength === true &&
        this.specialChar === true) {
        this.isSecurePassword = true;
      } else {
        this.isSecurePassword = false;
      }
    } else {
      this.displayPasswordBox = false;
    }
    this.isSecurePasswordChange.emit(this.isSecurePassword);
    this.onChange(this.newPassword);
  }

  get value() {
    return this.isSecurePassword ? this.newPassword : null;
  }

  set value(val) {

  }

  writeValue(files: any): void {

  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {

  }
}
