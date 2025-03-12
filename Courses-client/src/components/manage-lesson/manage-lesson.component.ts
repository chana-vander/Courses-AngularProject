import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from '../../service/course.service';

@Component({
  selector: 'app-manage-lesson',
  imports: [ReactiveFormsModule],
  templateUrl: './manage-lesson.component.html',
  styleUrl: './manage-lesson.component.css'
})
export class ManageLessonComponent {

  lessonForm: FormGroup;
  selectedLesson: any = null;
  lessons: any[] = [];
  courseId: number = Number(localStorage.getItem('courseId')) || 0;
  token: string = localStorage.getItem("token") ?? "";
  role = localStorage.getItem('role');

  constructor(private fb: FormBuilder, private router: Router, private courseService: CourseService) {
    this.lessonForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
    let id = this.courseId || parseInt(localStorage.getItem('courseId') || '0', 10);
    console.log(id);
    console.log("role: ", this.role);

    this.loadLessons();
  }

  selectLesson(lesson: any) {
    this.selectedLesson = lesson;
    this.lessonForm.patchValue(lesson); // מילוי הטופס עם נתוני השיעור שנבחר
  }

  // טעינת רשימת השיעורים של קורס מסוים
  loadLessons() {
    let storageCourseId = localStorage.getItem('courseId');
    console.log("🔹 ID מהלוקלסטורג':", storageCourseId);
    // המרה למספר (אם קיים) + טיפול במקרה של null
    let parsedCourseId = storageCourseId ? +storageCourseId : null;
    if (parsedCourseId !== null) {
      this.courseService.getLessons(parsedCourseId).subscribe({
        next: (lessons) => {
          this.lessons = lessons;
        },
        error: (error) => {
          console.error('❌ שגיאה בטעינת השיעורים:', error);
          alert('❌ לא ניתן לטעון את השיעורים.');
        }
      });
    } else {
      console.error("❌ courseId is null - לא ניתן לטעון את השיעורים.");
    }
  }

  // יצירת שיעור חדש
  createLesson() {
    if (this.lessonForm.valid) {
      const lessonData = this.lessonForm.value; // נתוני השיעור מהטופס
      this.courseService.createLesson(this.courseId, lessonData).subscribe({
        next: () => {
          alert('✅ השיעור נוצר בהצלחה!');
          this.loadLessons(); // טען מחדש את השיעורים
          this.lessonForm.reset(); // איפוס הטופס
        },
        error: (error) => {
          console.error('❌ שגיאה ביצירת השיעור:', error);
          alert('❌ לא ניתן ליצור את השיעור. אנא נסה שוב.');
        }
      });
    } else {
      alert('⚠️ יש למלא את כל השדות הנדרשים!');
    }
  }

  // עדכון שיעור קיים
  //this:
  updateLesson(courseId: number, lessonId: number) {
    if (this.lessonForm.valid) {
      console.log(lessonId, "idlesson");
      localStorage.setItem('lessonId', lessonId.toString());
      console.log(localStorage.getItem('lessonId'));

      const updatedLesson = this.lessonForm.value; // נתוני השיעור המעודכן
      if (lessonId !== null) {
        this.courseService.updateLesson(this.lessonForm.value.title, this.lessonForm.value.content, courseId, Number(localStorage.getItem('lessonId')), this.token).subscribe({
          next: () => {
            alert('✅ השיעור עודכן בהצלחה!');
            this.loadLessons(); // טען מחדש את השיעורים
            this.selectedLesson = null; // איפוס השיעור שנבחר
          },
          error: (error) => {
            console.error('❌ שגיאה בעדכון השיעור:', error);
            alert('❌ לא ניתן לעדכן את השיעור. אנא נסה שוב.');
          }
        });
      }
      else {
        alert('⚠️ יש לבחור שיעור ולעדכן את כל השדות כנדרש!');
      }
    }
  }
  // // מחיקת שיעור
  // deleteLesson(courseId: number, lessonId: number) {
  //   if (confirm('❗ האם אתה בטוח שברצונך למחוק את השיעור הזה?')) {
  //     this.courseService.deleteLesson(courseId, lessonId).subscribe({
  //       next: () => {
  //         alert('✅ השיעור נמחק בהצלחה!');
  //         this.loadLessons(); // טען מחדש את השיעורים
  //       },
  //       error: (error) => {
  //         console.error('❌ שגיאה במחיקת השיעור:', error);
  //         alert('❌ לא ניתן למחוק את השיעור. אנא נסה שוב.');
  //       }
  //     });
  //   }
  // }

  // //gpt:
  // updateLesson(courseId: number, lessonId: number) {
  //   if (this.lessonForm.valid) {
  //     console.log(lessonId, "idlesson");
  //     localStorage.setItem('lessonId', lessonId.toString());
  //     console.log(localStorage.getItem('lessonId'));

  //     // אוסף את נתוני השיעור מהטופס
  //     const updatedLesson = {
  //       title: this.lessonForm.value.title,
  //       content: this.lessonForm.value.description,  // מניח שהשדה description הוא תוכן השיעור
  //       courseId: courseId
  //     };

  //     // שולח את הבקשה לעדכון
  //     this.courseService.updateLesson(updatedLesson).subscribe({
  //       next: () => {
  //         alert('✅ השיעור עודכן בהצלחה!');
  //         this.loadLessons(); // טוען מחדש את השיעורים
  //         this.selectedLesson = null; // מאפס את השיעור שנבחר
  //       },
  //       error: (error) => {
  //         console.error('❌ שגיאה בעדכון השיעור:', error);
  //         alert('❌ לא ניתן לעדכן את השיעור. אנא נסה שוב.');
  //       }
  //     });
  //   } else {
  //     alert('⚠️ יש לבחור שיעור ולעדכן את כל השדות כנדרש!');
  //   }
  // }

  // טעינת רשימת השיעורים של קורס מסוים
  // loadLessons(courseId: number) {
  //   this.courseService.getLessons(courseId).subscribe({
  //     next: (lessons) => {
  //       this.lessons = lessons;
  //     },
  //     error: (error) => {
  //       console.error('❌ שגיאה בטעינת השיעורים:', error);
  //       alert('❌ לא ניתן לטעון את השיעורים.');
  //     }
  //   });
  // }

  // // יצירת שיעור חדש
  // createLesson(courseId: number, lesson: any) {
  //   if (this.lessonForm.valid) {
  //     this.courseService.createLesson(courseId, this.lessonForm.value).subscribe({
  //       next: (response) => {
  //         alert('✅ השיעור נוצר בהצלחה!');
  //         this.loadLessons(courseId); // טען מחדש את השיעורים של הקורס
  //         this.lessonForm.reset(); // איפוס הטופס לאחר יצירה
  //       },
  //       error: (error) => {
  //         console.error('❌ שגיאה ביצירת השיעור:', error);
  //         alert('❌ לא ניתן ליצור את השיעור. אנא נסה שוב.');
  //       }
  //     });
  //   }
  //   else {
  //     alert('⚠️ יש למלא את כל השדות הנדרשים!');
  //   }
  // }

  // // עדכון שיעור קיים
  // updateLesson(courseId: number, lessonId: number, lesson: any) {
  //   if (this.lessonForm.valid) {
  //     this.courseService.updateLesson(courseId, lessonId, this.lessonForm.value).subscribe({
  //       next: (response) => {
  //         alert('✅ השיעור עודכן בהצלחה!');
  //         this.loadLessons(courseId);
  //         this.selectedLesson = null; // איפוס השיעור שנבחר
  //       },
  //       error: (error) => {
  //         console.error('❌ שגיאה בעדכון השיעור:', error);
  //         alert('❌ לא ניתן לעדכן את השיעור. אנא נסה שוב.');
  //       }
  //     });
  //   } else {
  //     alert('⚠️ יש לבחור שיעור ולעדכן את כל השדות כנדרש!');
  //   }
  // }

  // מחיקת שיעור
  deleteLesson(courseId: number, lessonId: number) {
    if (confirm('❗ האם אתה בטוח שברצונך למחוק את השיעור הזה?')) {
      this.courseService.deleteLesson(courseId, lessonId).subscribe({
        next: () => {
          alert('✅ השיעור נמחק בהצלחה!');
          this.loadLessons();
        },
        error: (error) => {
          console.error('❌ שגיאה במחיקת השיעור:', error);
          alert('❌ לא ניתן למחוק את השיעור. אנא נסה שוב.');
        }
      });
    }
  }

}
