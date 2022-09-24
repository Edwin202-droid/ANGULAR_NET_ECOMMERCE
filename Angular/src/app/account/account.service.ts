import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, of } from 'rxjs';
import { IUser } from '../shared/models/user';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentUserSource = new ReplaySubject<IUser>(1);
  currentUser$ = this.currentUserSource.asObservable();

  baseUrl = 'https://localhost:5001/api/';
  constructor(private http: HttpClient, private router:Router) { }


  login(values: any){
    return this.http.post(this.baseUrl + 'cuenta/login', values).pipe(
      map((user: any) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  registro(values:any){
    return this.http.post(this.baseUrl + 'cuenta/registro', values).pipe(
      map((user:any) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logOut(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null as unknown as IUser)
    this.router.navigateByUrl('/');
  }

  verificarEmailExiste(email:string){
    return this.http.get(this.baseUrl+ 'cuenta/EmailExiste?email='+email);
  }

  cargarUsuario(token:string){
    if(token === null){
      this.currentUserSource.next(null as unknown as IUser);
      return of();
    }
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);
    return this.http.get(this.baseUrl + 'cuenta' + {headers}).pipe(
      map((user:any) =>{
        if(user){
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }


}
