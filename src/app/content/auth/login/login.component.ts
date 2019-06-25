import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthenticationService } from 'src/app/core/auth/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    username : new FormControl('', Validators.required),
    password : new FormControl('', Validators.required),
  })
  constructor(private authService : AuthenticationService, private route : Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe(ele => {
      console.log(ele);
      this.route.navigate(['home'])
    })
  }

}
