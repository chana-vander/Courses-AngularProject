import { Component } from '@angular/core';
import { FormBuilder, FormsModule, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; // חובה לייבא!
// import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  myForm: FormGroup;
  errorMessage: string = ''; // הודעת שגיאה במקרה של כשלון בהתחברות
  router: any;
  msg: string='';

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.myForm = this.fb.group({
      // user: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
      // }),
    });
  }
  onSubmit() {
    console.log(("onSubmit function start"));

    if (this.myForm?.valid) {
      console.log(("onSubmit function start"));
      const { email, password } = this.myForm.value;
      console.log(("send data to api service"));
      console.log(email);
      console.log(password);
      
      // קריאה ל-API
    this.userService.login(email, password).subscribe(
      response => {
        console.log("res",response.userId);
        
        // שמור את ה-token בלוקלסטורג
        localStorage.setItem('token', response.token);
        // שמור את ה-ID של המשתמש בלוקלסטורג
        localStorage.setItem('userId', response.userId); // Assuming שה-API מחזיר את ה-ID בתשובה
        console.log("loocalStorage.getItem('userId')",localStorage.getItem('userId'));
        
        console.log("משתמש קיים");
        alert("ברוך שובך למערכת")
        // this.router.navigate(['/home']); // ניתוב לעמוד הבית
      },
        error => {
          console.error('Login failed:', error);
          console.log("משתמש לא קיים");
          this.msg = "משתמש לא קיים יש לעבור לעמוד ההרשמה"
          // this.router.navigate(['/signup']); // ניתוב לעמוד ההרשמה
        }
      );
    }
    else
      console.log("not valid");
  }
}
