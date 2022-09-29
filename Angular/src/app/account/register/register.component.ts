import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { Router } from '@angular/router';
import { of, switchMap, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registroForm!:FormGroup;
  errors: string[]=[];

  constructor(private fb: FormBuilder, private cuentaService: AccountService,
    private router: Router) { }

  ngOnInit(): void {
    this.createRegistroForm();
  }

  createRegistroForm(){
    this.registroForm = this.fb.group({
      displayName: ['', [Validators.required]],
      email: ['', [Validators.required], [this.validarEmailExiste()]],
      password: ['', [Validators.required]]
    })
  }

  onSubmit(){
    this.cuentaService.registro(this.registroForm.value).subscribe(response =>{
      this.router.navigateByUrl('/shop')
    },error =>{
      console.log(error);
      this.errors = error.errors;
    })
  }

  validarEmailExiste() : AsyncValidatorFn{
    return control => {
      return timer(500).pipe(
        switchMap(() => {
          if(!control.value){
            return of(null);
          }
          return this.cuentaService.verificarEmailExiste(control.value).pipe(
            map(res =>{
              return res ? { emailExist : true } : null;
            })
          );
        })
      )
    }
  }

}
