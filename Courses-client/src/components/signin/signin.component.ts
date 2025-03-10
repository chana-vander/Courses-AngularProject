import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-signin',
  imports: [ReactiveFormsModule],
  // imports:[],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})
export class SigninComponent {
  signinForm: FormGroup;
  show = true;

  constructor(private fb: FormBuilder, private authService: UserService) {
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
    console.log("in onSunbmit function");
    localStorage.setItem('role', this.signinForm.value.role);

    if (this.signinForm.valid) {
      console.log(this.signinForm.value);
      this.authService.signin(this.signinForm.value.name, this.signinForm.value.email, this.signinForm.value.password, this.signinForm.value.role).subscribe({
        next: (data) => {
          // שמור את ה-ID של המשתמש בלוקלסטורג
          console.log("data ",data);
          localStorage.setItem('id', data.userId); // זה assuming שה-`id` נמצא בתשובת ה-API
          console.log("התחברת בהצלחה");
        },
        error: (err) => console.log("no")
      });
    }
  }
}
  // onSubmit(): void {
  //   localStorage.setItem('role',this.registerForm.value.user.role)
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //     this.authService.signUp(this.registerForm.value.user.name,this.registerForm.value.user.email,this.registerForm.value.user.password,this.registerForm.value.user.role).subscribe({
  //       next: (data) => console.log("התחברת בהצלחה"), error: (err) => console.log("no")
  //     });
  //   };
  // }

