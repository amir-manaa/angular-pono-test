import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { LoginService } from '@app/pages/auth/login/services/login-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  errorMessage = null;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.creatLoginForm();  
  }

  loginSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.loginService.login(email, password)
    .subscribe(
      success => {
      this.router.navigate(['/dashboard']);
    }, error => {
      this.errorMessage = error
    })
  }

  private creatLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  get form() {
    return this.loginForm;
  }
}
