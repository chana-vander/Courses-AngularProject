import { Component } from '@angular/core';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { course } from '../../models/course';
import { HttpClientModule, HttpHeaders } from '@angular/common/http';
// import { RouterTestingModule } from '@angular/router/testing';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-all-courses',
  imports: [FormsModule, ReactiveFormsModule, RouterModule, HttpClientModule],
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
  studentCourse: course[] = []

  constructor(private courseService: CourseService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getCourses();
    console.log("oninit");
    this.loadCoursesByStudent();
    console.log("this.studentCourse: ", this.studentCourse);
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
    //פונקציה למחיקת קורס
    if (courseId) {
      console.log(localStorage.getItem('role'));
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
    this.router.navigate(['/courseId', courseId, 'details']);
  }

  forLessons(courseId: any) {
    localStorage.setItem('courseId', courseId);
    this.router.navigate(['manage-lessons']);
  }

  loadCoursesByStudent(): void {
    const studentId = localStorage.getItem('userId');
    if (studentId) {
      this.courseService.getStudentCourses(studentId).subscribe({
        next: (data) => {
          this.studentCourse = data;
        },
        error: (error) => {
          console.error('Error fetching student courses:', error);
        }
      });
    }
  }

  isEnoled(courseId: number): boolean {
    return this.studentCourse.some(course => course.id === courseId);
  }

  addUser(courseId: number) {
    const userId = Number(localStorage.getItem('userId'));
    if (!userId) {
      console.error('User not logged in.');
      return;
    }
    this.courseService.addUser(courseId, userId).subscribe({
      next: () => {
        console.log('Student enrolled successfully');
        alert("ברוך הבא לקורס😎🎉")
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט
      },
      error: (error) => {
        console.error('Error enrolling in course:', error);
      }
    });
  }

  removeUser(courseId: number) {
    const userId = Number(localStorage.getItem('userId'));
    console.log("userId", userId);

    if (!userId) {
      console.error('User not logged in.');
      alert("you not logged in ")
      return;
    }
    this.courseService.removeUser(courseId, userId).subscribe({
      next: () => {
        console.log('Student unenrolled successfully');
        alert("להתראות😥✋")
        this.loadCoursesByStudent(); // רענון רשימת הקורסים של הסטודנט
      },
      error: (error) => {
        console.error('Error unenrolling from course:', error);
      }
    });
  }

  addCourse() {
    console.log("on addCourse in all-courses");
    this.router.navigate(['/add-or-edit']);
  }

}
