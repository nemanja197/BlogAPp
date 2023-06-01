import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Users } from 'src/app/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{
constructor(private authService:AuthService){}
  ngOnInit(): void {
  }
  form: Users = {
    email: '',
    password: '',
  };

  onSubmit(){
    this.authService.login(this.form);
  }

}
