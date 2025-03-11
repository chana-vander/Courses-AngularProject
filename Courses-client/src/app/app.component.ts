import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // ייבוא RouterOutlet ו-RouterModule
import { HomeComponent } from '../components/home/home.component';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { ShortenPipe } from '../pipes/shorten.pipe'; // ייבוא ShortenPipe
@Component({
  selector: 'app-root',
  imports: [
    HomeComponent,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    RouterOutlet, // הוספת RouterOutlet ל-imports
    ShortenPipe, // הוספת ShortenPipe ל-imports (אם משתמשים בו)
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'courses';
}