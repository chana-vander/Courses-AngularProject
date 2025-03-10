import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private apiUrlGet = 'http://localhost:3000/api/users '; // כתובת ה-API לכניסה

  private loginUrl = 'http://localhost:3000/api/auth/login';
  private signinUrl='http://localhost:3000/api/auth/register';
  

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    console.log("login in service");
    const user = { email, password };
    console.log("user",user);
    
    return this.http.post(this.loginUrl, user)
  }

  signin(name: string, email: string, password: string, role: string): Observable<any> {
    const user = { name, email, password, role }
    console.log(user);
    return this.http.post(this.signinUrl, user);
  }
  // פונקציה להחזרת כל המשתמשים
  // getUser(): Observable<any[]> {
  // return this.apiUrlGet.get<any[]>(this.apiUrlGet);
  // }
}

