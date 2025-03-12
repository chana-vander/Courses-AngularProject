import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signinForm: FormGroup;
  show = true;

  constructor(private fb: FormBuilder, private authService: UserService,private router: Router) {
    this.signinForm = this.fb.group({
      // user: this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['', Validators.required],
      // }),
    });
  }

  showpasword() {
    this.show = !this.show;
  }

  onSubmit(): void {
    localStorage.setItem('role', this.signinForm.value.role);

    if (this.signinForm.valid) {

      this.authService.signin(
        this.signinForm.value.name,
        this.signinForm.value.email,
        this.signinForm.value.password,
        this.signinForm.value.role
      ).subscribe({
        next: (data) => {
          console.log("✅ תגובת שרת (הרשמה מוצלחת):", data);
          // כאן תוכל להוסיף לוג נוסף במקרה של הצלחה
          alert("ברוך הבא! התחברת בהצלחה 🤩 הנך מועבר לעמוד הבית");
          this.router.navigate(['/']); // ניתוב לעמוד הבית
        },
        error: (err) => {
          console.error("❌ שגיאה בהרשמה: ", err);

          if (err.status === 400 && err.error?.message === "User already exists") {
            alert("❌ כתובת האימייל כבר רשומה במערכת. נסה להתחבר או להשתמש באימייל אחר.");
          }
          else if (err.status === 500) {
            alert(" שגיאת שרת פנימית(500).בדוק את הנתונים שהזנת ונסה שוב.");
          }
          else {
            alert("🚨 שגיאה בהרשמה, נסה שוב מאוחר יותר.");
          }
        }
      });
    }
  }
}

