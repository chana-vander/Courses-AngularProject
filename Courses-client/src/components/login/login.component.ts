import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  myForm: FormGroup;
  errorMessage: string = ''; // הודעת שגיאה במקרה של כשלון בהתחברות
  msg: string='';

  constructor(private fb: FormBuilder, private userService: UserService,private router:Router) {
    this.myForm = this.fb.group({
      // user: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      // }),
    });
  }
  
  onSubmit() {
    if (this.myForm?.valid) {
      const { email, password } = this.myForm.value;
      console.log(email);
      console.log(password);   
      // קריאה ל-API
    this.userService.login(email, password).subscribe(
      response => {
        // שמור את ה-token בלוקלסטורג
        localStorage.setItem('token', response.token);
        // שמור את ה-ID של המשתמש בלוקלסטורג
        localStorage.setItem('userId', response.userId); // Assuming שה-API מחזיר את ה-ID בתשובה
        console.log("loocalStorage.getItem('userId')",localStorage.getItem('userId'));
        alert("ברוך שובך למערכת הנך מועבר לעמוד הבית")
        this.router.navigate(['/']); // ניתוב לעמוד הבית
      },
        error => {
          console.error('Login failed:', error);
          console.log("משתמש לא קיים");
          alert("משתמש לא קיים הנך מועבר לעמוד ההרשמה");
          this.router.navigate(['/signin']); // ניתוב לעמוד ההרשמה
        }
      );
    }
    else
      console.log("not valid");
  }
}
