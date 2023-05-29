import { FormControl, FormGroup } from '@angular/forms';

export function validateEmail(control: FormControl) {
  const regex = new RegExp(/^\w+([.+-]|\w+)*@\w+([.-]\w+)*\.\w{2,3}$/);
  return (regex.test(control.value)) ? null : { 'notValidEmail': true };
}
export function validatePassword(control: FormControl) {
  let EMAIL_REGEXP_ONE_LOWERCASE = new RegExp('^(?=.*[a-z])');
  let EMAIL_REGEXP_ONE_UPPERCASE = new RegExp('^(?=.*[A-Z])');
  let EMAIL_REGEXP_ONE_NUMBER_CHAR = new RegExp('^(?=.*[0-9])');
  let EMAIL_REGEXP_ONE_SPECIAL_CHAR = new RegExp('[^A-Za-z0-9]');
  let EMAIL_REGEXP_WHITE_SPACE_CHAR = new RegExp('[\\s]');
  return (
    EMAIL_REGEXP_ONE_LOWERCASE.test(control.value) &&
    EMAIL_REGEXP_ONE_UPPERCASE.test(control.value) &&
    EMAIL_REGEXP_ONE_NUMBER_CHAR.test(control.value) &&
    EMAIL_REGEXP_ONE_SPECIAL_CHAR.test(control.value) &&
    !EMAIL_REGEXP_WHITE_SPACE_CHAR.test(control.value) &&
    control.value.length >= 6) ? null : { 'notValidPassword': true };
}