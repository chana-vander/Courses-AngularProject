import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CourseService } from '../../service/course.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-course-details',
  imports: [ReactiveFormsModule],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent {
  courseId: number = 0;
  lessons: any = [];
  details: any;
  showDetails: boolean = false;
  showLessons: boolean = false;

  constructor(private courseService: CourseService, private router: ActivatedRoute) {
  }

  ngOnInit():void{
     // קבלת פרטי קורס
     let id = parseInt(localStorage.getItem('courseId') || '0', 10);
     console.log("םמ גקאשןךד ןג: ",id);
 
     if (!id || isNaN(id)) {
       console.error('❌ courseId חסר או לא תקין:', id);
       alert('❌ לא ניתן לטעון את פרטי הקורס.');
       return;
     }
 
     console.log(`📌 טוען פרטי קורס ${id}`);
 
     this.courseService.getDetails(id).subscribe({
       next: (response) => {
         this.details = response;
         this.showDetails = true;
         console.log('✅ פרטי הקורס:', this.details);
       },
       error: (error) => {
         console.error('❌ שגיאה בטעינת פרטי הקורס:', error);
         alert('❌ לא ניתן לטעון את פרטי הקורס.');
       }
     });
  }

  // טעינת רשימת השיעורים של קורס מסוים
  loadLessons() {
    this.showLessons = true;
    const storedCourseId = localStorage.getItem('courseId');

    if (!storedCourseId) {
      console.error('❌ courseId לא נמצא בלוקלסטורג');
      alert('❌ קורס לא נבחר!');
      return;
    }

    const courseId = parseInt(storedCourseId, 10);
    if (isNaN(courseId)) {
      console.error('❌ courseId אינו מספר תקין:', storedCourseId);
      alert('❌ תקלה בנתוני הקורס.');
      return;
    }
    console.log('📌 טוען שיעורים עבור קורס ID:', courseId);
    this.courseService.getLessons(courseId).subscribe({
      next: (lessons) => {
        this.lessons = lessons;
        console.log('✅ שיעורים נטענו בהצלחה:', this.lessons);
      },
      error: (error) => {
        console.error('❌ שגיאה בטעינת השיעורים:', error);
        alert('❌ לא ניתן לטעון את השיעורים.');
      }
    });
  }


}