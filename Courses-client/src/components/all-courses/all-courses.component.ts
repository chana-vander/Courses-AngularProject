import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { course } from '../../models/course';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-all-courses',
  imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './all-courses.component.html',
  styleUrl: './all-courses.component.css'
})
export class AllCoursesComponent {
  courses: any[] = []; // לאחסן את רשימת הקורסים
  errorMessage: string = ''; // לאחסן הודעת שגיאה במידה ויש כשל
  role: string | any = localStorage.getItem('role');
  token: string | any = localStorage.getItem("token")
  isDelete = false;
  isEdit = false;
  showDetails: boolean = false;
  details: any;


  constructor(private courseService: CourseService,private route:ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
    console.log("oninit");
    // this.router.params.subscribe(params => {
    //   this.courseId = +params['courseId']; // המרת הערך למספר
    //   // כאן תוכל להוסיף לוגיקה כדי לטעון את פרטי הקורס
    // });
  }

  getCourses(): void {
    const token = localStorage.getItem('token'); // קבלת ה-Token מה-localStorage
    if (token) {
      this.courseService.getAllCourses(token).subscribe(
        (data) => {
          this.courses = data; // אם ההצלחה, נשמור את רשימת הקורסים
          console.log("the length of courses is: ", this.courses.length);
        },
        (error) => {
          console.error('Error fetching courses:', error);
          this.errorMessage = 'שגיאה בטעינת הקורסים, נסה שנית'; // הצגת הודעת שגיאה
        }
      );
    }
    else {
      this.errorMessage = 'לא נמצא טוקן, יש להתחבר מחדש';
      this.router.navigate(['/login']); // ניתוב לעמוד התחברות אם אין טוקן
    }
  }

  editCourse(course: any) {
    console.log("send course for edit on all-courses ", course);
    this.router.navigate(['/add-or-edit', { id: course.id }]);  // שלח את ה-ID של הקורס
  }

  deleteCourse(courseId: number) {
    // console.log("cid", courseId);
    // this.router.navigate(['/manage-course', courseId], { queryParams: { delete: 'true' } });
    // // פונקציה למחיקת קורס
    if (courseId) {
      console.log("on delete function");
      console.log(localStorage.getItem('role'));
      //jbjbjbnbmn
      console.log(courseId);

      this.courseService.delete(courseId).subscribe(
        (response) => {
          console.log('Course deleted successfully', response);
          alert("הקורס נמחק בהצלחה")
          this.courses = this.courses.filter(course => course.id !== courseId); // עדכון רשימת הקורסים
        },
        (error) => {
          console.log("here error");
          console.error('Error deleting course', error);
          this.errorMessage = 'There was an error deleting the course'; // טיפול בשגיאה
        }
      );
    }
  }

  forDetails(courseId: any) {
    console.log(courseId);
    // שמירה בלוקלסטורג
    localStorage.setItem('courseId', courseId);
    this.router.navigate([courseId, 'details'], { relativeTo: this.route }); 
  }

  forLessons(courseId: number) {
    localStorage.setItem('courseId', courseId.toString());
    console.log();
    
    this.router.navigate(['manage-lessons']);
  }
  
  
  // קבלת פרטי קורס
  // detailsCourse(courseId?: number) {
  //   let id = courseId || parseInt(localStorage.getItem('courseId') || '0', 10);

  //   if (!id || isNaN(id)) {
  //     console.error('❌ courseId חסר או לא תקין:', id);
  //     alert('❌ לא ניתן לטעון את פרטי הקורס.');
  //     return;
  //   }

  //   console.log(`📌 טוען פרטי קורס ${id}`);

  //   this.courseService.getDetails(id).subscribe({
  //     next: (response) => {
  //       this.details = response;
  //       this.showDetails = true;
  //       console.log("'✅ פרטי הקורס:'", this.details);
  //       console.log("showDetails ",this.showDetails);
  //     },
  //     error: (error) => {
  //       console.error('❌ שגיאה בטעינת פרטי הקורס:', error);
  //       alert('❌ לא ניתן לטעון את פרטי הקורס.');
  //     }
  //   });
  // }

  // closeDetails(){
  //   this.showDetails=false;
  // }

  // deleteCourse(id: number | undefined): void {
  //   console.log("on deleteCourse in all-courses");
  //   this.router.navigate(['/manage-course'], { state: { courseId: id } });
  // }

  addCourse() {
    console.log("on addCourse in all-courses");
    // this.router.navigate(['/manage-course']);
    this.router.navigate(['/add-or-edit']);
  }

  // editCourse(course: course) {
  //   console.log("send course for edit on all-courses");
  //   this.router.navigate(['/edit-course',{state:{courseData:course}}]);
  //   // this.coursesService.triggerEdit(course);// שולח את הקורס דרך השירות
  // }

  // // פונקציה למחיקת קורס
  // deleteCourse(id: number | undefined): void {
  //   if (id) {
  //     console.log("on delete function");
  //     console.log(this.role);

  //     this.courseService.delete(id).subscribe(
  //       (response) => {
  //         console.log('Course deleted successfully', response);
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

  //join user:
  // joinCourse(course: course) {
  //   const userId = localStorage.getItem('userId');
  //   if (!userId) {
  //     alert('שגיאה: לא נמצא מזהה משתמש.');
  //     return;
  //   }

  //   if (course.id === undefined) {
  //     console.error('🚨 שגיאה: לקורס אין מזהה תקף!');
  //     alert('שגיאה: לא ניתן להירשם לקורס ללא מזהה.');
  //     return;
  //   }

  //   this.courseService.enrollUserToCourse(course.id, userId).subscribe(
  //     (response) => {
  //       console.log('✅ המשתמש הצטרף בהצלחה:', response);
  //       alert('נרשמת בהצלחה לקורס!');
  //     },
  //     (error) => {
  //       console.error('❌ שגיאה בהצטרפות:', error);
  //       alert('הנך רשום כבר לקורס זה או שהתרחשה שגיאה.');
  //     }
  //   );
  // }
  // delete(id:number|undefined){
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${this.token}`
  //   });

  //   this.http.delete(`http://localhost:3000/api/courses/${id}`, { headers })
  //     .subscribe(
  //       (response) => {
  //         console.log('Course deleted successfully', response);
  //         this.courses = this.courses.filter(course => course.id !== id);
  //       },
  //       (error) => {
  //         console.error('Error deleting course', error); // טיפול בשגיאות
  //       }
  //     );
  //  }
}
