import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseIrl = 'https://localhost:5001/api/';
  validationErrors :any;

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

  get404Error(){
    this.http.get(this.baseIrl+ 'products/42').subscribe(response =>{

    }, error =>{
      console.log(error)
    });
  }

  get500Error(){
    this.http.get(this.baseIrl+ 'buggy/servererror').subscribe(response =>{

    }, error =>{
      console.log(error)
    });
  }

  get400Error(){
    this.http.get(this.baseIrl+ 'buggy/badrequest').subscribe(response =>{

    }, error =>{
      console.log(error)
    });
  }

  get400ValidationError(){
    this.http.get(this.baseIrl+ 'products/cuarentaydos').subscribe(response =>{

    }, error =>{
      console.log(error);
      this.validationErrors = error.errors
    });
  }
}
