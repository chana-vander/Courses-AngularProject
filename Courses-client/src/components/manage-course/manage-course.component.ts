import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../service/course.service';
import { Token } from '@angular/compiler';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-manage-course',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-course.component.html',
  styleUrl: './manage-course.component.css'
})
export class ManageCourseComponent {

  courseForm!: FormGroup;
  selectedCourse: any = null;
  isEditMode: boolean = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.route.queryParams.subscribe(params => {
      if (params['edit'] === 'true') {
        this.selectedCourse = history.state.course; // קבלת הנתונים דרך הניווט
        this.isEditMode = true;
        if (this.selectedCourse) {
          this.courseForm.patchValue(this.selectedCourse);
        }
      }
    });
  }

  initForm() {
    this.courseForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      duration: ['', Validators.required]
    });
  }

  /* יצירת קורס חדש */
  addCourse() {
    // this.showForm = true;
    if (this.courseForm.valid) {
      this.courseService.createCourse(this.courseForm.value).subscribe({
        next: (response) => {
          alert('✅ הקורס נוצר בהצלחה!');
          // this.loadCourses();
          this.courseForm.reset();
          // this.showForm = false;
        },
        error: (error) => {
          console.error('❌ שגיאה ביצירת הקורס:', error);
          alert('❌ לא ניתן ליצור את הקורס. אנא נסה שוב.');
        }
      });
    } else {
      alert('⚠️ יש למלא את כל השדות הנדרשים!');
    }
  }

  onSubmit() {
    if (!this.courseForm.valid) return;

    const courseData = this.courseForm.value;
    const token = localStorage.getItem('token');

    if (!token) {
      alert('❌ שגיאה: לא נמצא טוקן, יש להתחבר מחדש');
      this.router.navigate(['/login']);
      return;
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    //   if (this.isEditMode && this.selectedCourse) {
    //     // הוספת כל הנתונים שהפונקציה צריכה
    //     this.courseService.putCoure(
    //       courseData.title, 
    //       courseData.description, 
    //       localStorage.getItem('id'),  // מכיוון שאתה שולח את מזהה המורה
    //       token,
    //       this.selectedCourse.id
    //     ).subscribe(() => {
    //       alert('✅ הקורס עודכן בהצלחה');
    //       this.router.navigate(['/courses']);
    //     }, error => {
    //       console.error('❌ שגיאה בעדכון הקורס:', error);
    //       alert('❌ שגיאה בעדכון הקורס');
    //     });
    //   } else {
    //     this.courseService.addCourse(courseData, headers).subscribe(() => {
    //       alert('✅ הקורס נוסף בהצלחה');
    //       this.router.navigate(['/courses']);
    //     }, error => {
    //       console.error('❌ שגיאה בהוספת הקורס:', error);
    //       alert('❌ שגיאה בהוספת הקורס');
    //     });
    //   }
  }

}