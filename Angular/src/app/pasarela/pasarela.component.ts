import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-pasarela',
  templateUrl: './pasarela.component.html',
  styleUrls: ['./pasarela.component.scss']
})
export class PasarelaComponent implements OnInit {

  checkoutForm!:FormGroup;

  constructor(private fb: FormBuilder, private cuentaService: AccountService) { }

  ngOnInit(): void {
    this.createCheckOutForm();
    this.getAddressFormValues();
  }

  createCheckOutForm(){
    this.checkoutForm = this.fb.group({
      addressForm : this.fb.group({
        nombres: ['', Validators.required],
        apellidos: ['', Validators.required],
        direccion: ['', Validators.required],
        ciudad: ['', Validators.required],
        estado: ['', Validators.required],
        codigoPostal: ['', Validators.required],
      }),
      deliveryForm: this.fb.group({
        deliveryMethod: ['', Validators.required]
      }),
      paymenForm: this.fb.group({
        numeroTarjeta : ['', Validators.required],
      })
    })
  }

  getAddressFormValues(){
    this.cuentaService.getUserAddress().subscribe(address =>{
      if(address){
        this.checkoutForm.get('addressForm')?.patchValue(address);
      }
    });
  }

}
