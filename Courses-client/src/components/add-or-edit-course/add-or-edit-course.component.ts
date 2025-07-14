import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-or-edit-course',
  imports: [ReactiveFormsModule],
  templateUrl: './add-or-edit-course.component.html',
  styleUrl: './add-or-edit-course.component.css'
})
export class AddOrEditCourseComponent {
  courseForm!: FormGroup;
  selectedCourse: any = null;  // הקורס שנבחר לצורך עריכה
  isEditMode: boolean = false;

  constructor(
    private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // יצירת ה-FormGroup עם Validations
    this.courseForm = this.fb.group({
      title: ['', Validators.required],  // שדה חובה
      description: ['', Validators.required]  // שדה חובה
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.isEditMode = true;
        this.loadCourse(courseId);  // טוען את הקורס לעריכה
      }
    });
  }

  loadCourse(courseId: string): void {
    this.courseService.getDetails(Number(courseId)).subscribe(course => {
      this.selectedCourse = course;
      this.courseForm.setValue({
        title: course.title,
        description: course.description
      });
    });
  }

  onSubmit(): void {
    if (this.isEditMode) {
      this.updateCourse();  // עדכון קורס
    } else {
      this.createCourse();  // יצירת קורס חדש
    }
  }

  createCourse(): void {
    if (this.courseForm.valid) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('⚠️ לא נמצא Token. יש להתחבר מחדש!');
        return;
      }

      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });

      const newCourse = {
        title: this.courseForm.value.title,
        description: this.courseForm.value.description,
        teacherId: Number(localStorage.getItem('id'))  // התאם את ה-ID למספר
      };
      console.log("tech", localStorage.getItem('id'));

      this.courseService.createCourse(newCourse).subscribe({
        next: (response) => {
          alert('✅ הקורס נוצר בהצלחה!');
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('❌ שגיאה ביצירת הקורס:', error);
          alert('❌ לא ניתן ליצור את הקורס. אנא נסה שוב.');
        }
      });
    } else {
      alert('⚠️ יש למלא את כל השדות!');
    }
  }

  updateCourse(): void {
    if (this.selectedCourse && this.courseForm.valid) {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('⚠️ לא נמצא Token. יש להתחבר מחדש!');
        return;
      }

      // const teacherId = Number(localStorage.getItem('id'));  // התאם את ה-ID למספר
      const teacherId = Number(localStorage.getItem('userId'));  // התאם את ה-ID למספר

      console.log(this.courseForm.value.title,);
      // תיאור הקורס
      console.log(this.courseForm.value.description,);
      console.log("teacher id: ",teacherId);
      console.log(this.selectedCourse.id);

      // קריאה לפונקציה עם כל הפרמטרים
      this.courseService.putCoure(
        this.courseForm.value.title,  // כותרת הקורס
        this.courseForm.value.description,  // תיאור הקורס
        teacherId,  // מזהה המורה
        token,  // הטוקן
        this.selectedCourse.id  // מזהה הקורס
      ).subscribe({
        next: (response) => {
          alert('✅ הקורס עודכן בהצלחה!');
          this.router.navigate(['/courses']);
        },
        error: (error) => {
          console.error('❌ שגיאה בעדכון הקורס:', error);
          alert('❌ לא ניתן לעדכן את הקורס. אנא נסה שוב.');
        }
      });
    } else {
      alert('⚠️ יש לבחור קורס ולעדכן את כל השדות כנדרש!');
    }
  }

}