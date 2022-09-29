import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router, ActivatedRoute } from '@angular/router';

export class UserLogin{
  email:string;
  password:string;
  constructor(){
    this.email = '';
    this.password = ''
  }
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  returnUrl !:string;

  constructor(private cuentaService: AccountService, private router: Router,
    private activatedRoute: ActivatedRoute) {

    }

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this.createLoginForm();
  }

  createLoginForm(){
    this.loginForm = new FormGroup({
      //email: new FormControl('',[Validators.required, Validators.pattern('^[\\w-\.]+@([\\w-]+\.)+[\\w-]{2,4}$')]),
      email: new FormControl('',[Validators.required]),
      password: new FormControl('',Validators.required),
    })
  }

  onSubmit(){
    let login = new UserLogin();
    login.email = this.loginForm.get('email')?.value.value
    login.password = this.loginForm.get('password')?.value.value
    this.cuentaService.login(login).subscribe(() =>{
      this.router.navigateByUrl(this.returnUrl)
    }, error =>{
      console.log(error);
    })
  }

}
