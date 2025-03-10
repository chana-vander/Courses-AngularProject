import { Component } from '@angular/core';
// import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-home',
  imports: [RouterLink,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  //הקצאת משתנה לשמירת תפקיד/סוג המשתמש -מנהל / משתמש רגיל וכו
  role:string|any=localStorage.getItem('role');

}
