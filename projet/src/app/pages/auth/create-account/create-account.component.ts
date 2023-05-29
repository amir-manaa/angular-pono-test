import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserRole } from '@app/shared/enums/UserRole';
import { validateEmail } from '@app/shared/validators/validators';
import { CreateAccountService } from '@app/pages/auth/create-account/services/create-account.service';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  providers: [CreateAccountService]
})
export class CreateAccountComponent implements OnInit, OnDestroy {

  private destroy$!: Subject<boolean>;
  creatAccountForm!: FormGroup;
  submitted = false;
  userRole = UserRole;
  successAdd = false;
  userExist = false;

  constructor(
    private formBuilder: FormBuilder,
    private createAccountService: CreateAccountService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.creatLoginForm();  
  }

  submit() {
    this.submitted = true;

    if (this.creatAccountForm.invalid) {
      return;
    }

    this.createAccountService.registerUser(
      this.creatAccountForm.get('name')!.value,
      this.creatAccountForm.get('email')!.value,
      this.creatAccountForm.get('password')!.value,
      this.creatAccountForm.get('role')!.value
    ).pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(
      () => {
      this.router.navigate(['/login']);
    }, () => {
      this.userExist = true;
    })
  }

  get form() {
    return this.creatAccountForm;
  }

  private creatLoginForm() {
    this.creatAccountForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, validateEmail]],
      password: ['', [Validators.required]],
      role: [UserRole.Teacher, [Validators.required]],
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
}
