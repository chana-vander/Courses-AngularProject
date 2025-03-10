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
  // //מוצשק בסד
  // courseForm: FormGroup;
  // courses: any[] = []; // לאחסן את רשימת הקורסים
  // selectedCourse: any = null;
  // token: string | any = localStorage.getItem("token")
  // errorMessage: string = ''; // לאחסן הודעת שגיאה במידה ויש כשל
  // showForm = false;
  // course: any = null; // משתנה לאחסון הקורס במקרה של עריכה
  // courseId: number | undefined;

  //   constructor(private courseService: CourseService, private router: Router, private fb: FormBuilder) {
  //     this.courseForm = this.fb.group({
  //       title: ['', Validators.required],
  //       description: ['', Validators.required],
  //     });
  //     const navigation = this.router.getCurrentNavigation();
  //     console.log("nav",navigation);
  //   }

  //   ngOnInit(): void {
  //     console.log("onInit - Checking navigation state");
  //     const navigation = this.router.getCurrentNavigation();

  //     if (navigation?.extras.state) {
  //         console.log("Navigation state found:", navigation.extras.state);

  //         if (navigation.extras.state['course']) {
  //             this.course = navigation.extras.state['course'];
  //             console.log("Course received:", this.course);
  //             this.updateCourse(this.course);
  //         } 
  //         else if (navigation.extras.state['courseId']) {
  //             this.courseId = navigation.extras.state['courseId'];
  //             console.log("Course ID received for deletion:", this.courseId);
  //             this.deleteCourse(this.courseId);
  //         }
  //     } else {
  //         console.log("No navigation state found.");
  //     }
  // }


  // // onSubmit() {
  // //   if (this.selectedCourse) {
  // //     // אם יש קורס שנבחר, עדכני אותו
  // //     this.updateCourse(this.selectedCourse);
  // //   } else {
  // //     // אחרת, צרי קורס חדש
  // //     this.addCourse();
  // //   }
  // // }

  // onSubmit() {
  //   if (this.selectedCourse) {
  //     // עדכון קורס קיים
  //     this.updateCourse(this.selectedCourse);
  //     localStorage.setItem('course', JSON.stringify(this.selectedCourse));
  //   } else {
  //     // יצירת קורס חדש
  //     const newCourse = this.addCourse();
  //     localStorage.setItem('course', JSON.stringify(newCourse));
  //   }
  //   this.showForm = false; // הסתרת הטופס לאחר השליחה
  //   // שמירת המורה (אם רלוונטי)
  //   //   if (this.selectedTeacher) {
  //   //     localStorage.setItem('teacher', JSON.stringify(this.selectedTeacher));
  //   //   }
  // }

  // /*טעינת כל הקורסים */
  // loadCourses() {
  //   this.courseService.getAllCourses(this.token).subscribe((data) => {
  //     this.courses = data;
  //   });
  // }

  // // פונקציה למחיקת קורס
  // deleteCourse(id: number | undefined): void {
  //   if (id) {
  //     console.log("on delete function");
  //     console.log(localStorage.getItem('role'));
  //     //jbjbjbnbmn
  //     console.log(id);

  //     this.courseService.delete(id).subscribe(
  //       (response) => {
  //         console.log('Course deleted successfully', response);
  //         alert("הקורס נמחק בהצלחה")
  //         this.courses = this.courses.filter(course => course.id !== id); // עדכון רשימת הקורסים
  //       },
  //       (error) => {
  //         console.log("here error");
  //         console.error('Error deleting course', error);
  //         this.errorMessage = 'There was an error deleting the course'; // טיפול בשגיאה
  //       }
  //     );
  //   }
  // }

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

  // /*בחירת קורס לעדכון */
  // selectCourse(course: any) {
  //   this.selectedCourse = course;
  //   this.courseForm.patchValue(course);
  //   this.showForm = true;
  // }

  // goToLessons(courseId: number) {
  //   this.router.navigate(['/manage-lessons', courseId]);
  // }

  // /*עדכון קורס */
  // // updateCourse(course: any) {
  // //   // אם הקורס שהתקבל ופרטי הטופס תקינים
  // //   if (course && this.courseForm.valid) {
  // //     console.log("1");

  // //     this.courseService.updateCourse(course.id, this.courseForm.value,localStorage.getItem('id')).subscribe({
  // //       next: (response) => {
  // //         alert('✅ הקורס עודכן בהצלחה!');
  // //         this.loadCourses();  // טוען מחדש את רשימת הקורסים
  // //         this.selectedCourse = null;  // מנקה את הקורס שנבחר לאחר העדכון
  // //       },
  // //       error: (error) => {
  // //         console.error('❌ שגיאה בעדכון הקורס:', error);
  // //         alert('❌ לא ניתן לעדכן את הקורס. אנא נסה שוב.');
  // //       }
  // //     });
  // //   } else {
  // //     alert('⚠️ יש לבחור קורס ולעדכן את כל השדות כנדרש!');
  // //   }
  // // }

  // /* עדכון קורס */
  // updateCourse(course: any) {
  //   this.showForm = true;
  //   console.log("here");

  //   // אם הקורס שהתקבל ופרטי הטופס תקינים
  //   if (course && this.courseForm.valid) {
  //     console.log("1");

  //     // שלוף את ה-Token מה-LocalStorage
  //     const token = localStorage.getItem('token'); // יש לשנות ל-token

  //     // אם ה-Token לא קיים, הצג הודעת שגיאה
  //     if (!token) {
  //       alert('⚠️ לא נמצא Token. יש להתחבר מחדש!');
  //       return; // עצור את המשך הפונקציה
  //     }

  //     // יצירת כותרת עם ה-Token
  //     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  //     // הכנת האובייקט לעדכון
  //     const updateData = {
  //       title: this.courseForm.value.title,
  //       description: this.courseForm.value.description,
  //       teacherId: parseInt(localStorage.getItem('id') || '0') // שלוף את ה-ID של המורה
  //     };
  //     console.log('Sending update data:', updateData);

  //     // שלח את הבקשה לשרת עם הכותרת
  //     this.courseService.updateCourse(course.id, updateData, headers).subscribe({
  //       next: (response) => {
  //         alert('✅ הקורס עודכן בהצלחה!');
  //         this.loadCourses();  // טוען מחדש את רשימת הקורסים
  //         this.selectedCourse = null;  // מנקה את הקורס שנבחר לאחר העדכון
  //         this.showForm = false; // הסתר את הטופס לאחר העדכון
  //       },
  //       error: (error) => {
  //         console.error('❌ שגיאה בעדכון הקורס:', error);
  //         alert('❌ לא ניתן לעדכן את הקורס. אנא נסה שוב.');
  //       }
  //     });
  //   } else {
  //     alert('⚠️ יש לבחור קורס ולעדכן את כל השדות כנדרש!');
  //   }
  // }
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