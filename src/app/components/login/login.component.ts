import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { AuthService } from 'src/app/services/auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
              private authService: AuthService, /*private alertService: AlertService*/) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;

      // reset alerts on submit
      // this.alertService.clear();

      // stop here if form is invalid
      if (this.form.invalid) {
          return;
      }

      this.loading = true;
      this.authService.auth(this.f.email.value, this.f.password.value).subscribe(data => {
        this.router.navigate(["/courses"]);
      }, error => {
        this.loading = false;
      });

  }
}
