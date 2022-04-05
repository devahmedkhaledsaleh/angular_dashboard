import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticationLoginForm: FormGroup;
  email: FormControl;
  password: FormControl;

  initFormControl() {
    this.email = new FormControl('');
    this.password = new FormControl('');
  }

  createForm() {
    this.authenticationLoginForm = new FormGroup({
      email: this.email, 
      password: this.password, 
    });
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) {
    this.initFormControl();
    this.createForm();
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const observer = {
      next: (res: any) => {
        localStorage.setItem('adminInfo', JSON.stringify(res));
        localStorage.setItem('adminToken', res.token);
        this.router.navigate(['']);
        
      },
      error: (err: Error) => console.log(err.message),  
    };

    this.authenticationService
      .userLogin(this.authenticationLoginForm.value)
      .subscribe(observer);
  }

}
