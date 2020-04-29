import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  baseUrl = "http://127.0.0.1:8000";
  httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<any>{
    return this.http.get(this.baseUrl + '/users/', 
    {headers : this.httpHeaders} );
  }

  getOneUser(): Observable<any>{
    return this.http.get(this.baseUrl + '/users/' +  + '/', 
    {headers : this.httpHeaders} );
  }

  registerNewUser(user): Observable<any>{
    const body = {id : user.id,
                 username: user.username,
                 email: user.email, 
                 };
    return this.http.post(this.baseUrl + '/users/' , body, {headers : this.httpHeaders} ) ;
  }

  sendOneEmail(user): Observable<any>{
    const body = {to_email : user.email,
                 subject : 'Your URL to see your housing history',
                 message : 'Welcome to our amazing housing app ' + user.username + ',\nThis is your url to see yourhousing history : http://localhost:4200/list-housing/' + user.token + '\n\n Have a nice day,/nCyberratss', 
                 };
    return this.http.post(this.baseUrl + '/emails/' , body, {headers : this.httpHeaders} ) ;
  }
  
}