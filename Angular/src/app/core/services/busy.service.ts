import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {

  busRequestCount = 0;

  constructor(private spinnerService: NgxSpinnerService) { }

  busy(){
    this.busRequestCount++;
    this.spinnerService.show(undefined, {
      type: 'pacman',
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    })
  }

  idle(){
    this.busRequestCount--;
    if(this.busRequestCount <= 0){
      this.busRequestCount = 0;
      this.spinnerService.hide();
    }
  }
}
