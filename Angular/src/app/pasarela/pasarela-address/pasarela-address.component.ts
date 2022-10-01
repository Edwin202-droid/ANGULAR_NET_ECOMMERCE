import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AccountService } from '../../account/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-pasarela-address',
  templateUrl: './pasarela-address.component.html',
  styleUrls: ['./pasarela-address.component.scss']
})
export class PasarelaAddressComponent implements OnInit {

  @Input() checkOutForm!:FormGroup;
  
  constructor(private cuentaService: AccountService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  saveUserAddress(){
    this.cuentaService.updateUserAddress(this.checkOutForm.get('addressForm')?.value).subscribe(() =>{
      this.toastr.success('Address saved');
    },error =>{
      this.toastr.error(error.message);
    })
  }

}
