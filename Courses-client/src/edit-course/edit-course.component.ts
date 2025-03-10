import { Component } from '@angular/core';
import { course } from '../models/course';
import { CourseService } from '../service/course.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-course',
  imports: [FormsModule],
  templateUrl: './edit-course.component.html',
  styleUrl: './edit-course.component.css'
})
export class EditCourseComponent {
  course: any = {}; // משתנה שיכיל את פרטי הקורס לעריכה

  constructor(private coursesService: CourseService) { }

  ngOnInit(): void {
    this.coursesService.editCourse$.subscribe(course => {
      if (course) {
        console.log(" קורס התקבל לעריכה:", course);
        this.course = course;
      }
      else {
        console.warn("⚠️ לא התקבל קורס לעריכה!");
      }
    });
  }

  saveChanges() {
    console.log(" שמירת שינויים:", this.course);
    if (!this.course || !this.course.id) {
      console.error(" שגיאה: אין קורס תקף לעריכה!");
      return;
    }
    console.log("on saveChanges");
    console.log(this.course);

    this.coursesService.update(this.course).subscribe(
      (response) => {
        console.log("✅ קורס עודכן בהצלחה:", response);
      },
      (error) => {
        console.error("❌ שגיאה בעדכון הקורס:", error);
      }
    );
  }
  // ngOnInit(): void {
  //   // מאזינים לשירות ומקבלים את הקורס לעריכה
  //   console.log("on ngoninit");
  //   this.coursesService.editCourse$.subscribe(course => {
  //     if (course) {
  //       console.log("📥 קורס התקבל לעריכה:", course);
  //       this.course = course; // עדכון הנתונים בקומפוננטה
  //     }
  //   });
  // }
  // ngOnInit(): void {
  //   this.coursesService.editCourse$.subscribe(course => {
  //     if (course) {
  //       console.log("📥 קורס התקבל לעריכה:", course);
  //       this.course = course;
  //     } else {
  //       console.warn("⚠️ לא התקבל קורס לעריכה!");
  //     }
  //   });
  // }

  // saveChanges() {
  //   console.log("💾 שמירת שינויים:", this.course);
  //   // const mycourse:any = localStorage.getItem(course);
  //   if (!this.course || !this.course.id) {
  //     console.error("🚨 שגיאה: אין קורס תקף לעריכה!");
  //     return;
  //   }

  //   this.coursesService.update(this.course).subscribe(
  //     (response) => {
  //       console.log("✅ קורס עודכן בהצלחה:", response);
  //     },
  //     (error) => {
  //       console.error("❌ שגיאה בעדכון הקורס:", error);
  //     }
  //   );
  // }

}
