import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { course } from '../models/course';
import { user } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private allCoursesUrl = 'http://localhost:3000/api/courses';
  //edit:
  private editCourseSubject = new BehaviorSubject<any | null>(null);
  editCourse$ = this.editCourseSubject.asObservable();// הזרם שהקומפוננטות יאזינו ל
  //delete:
  // private apiUrl = 'http://localhost:3000/api/courses'; // כתובת ה-API למחיקת קורסים
  // private token = localStorage.getItem('token'); // מניח ששם שמרת את הטוקן של המשתמש המורה

  // constructor(private http: HttpClient) { }

  // פונקציה לקבלת כל הקורסים
  getAllCourses(token: string): Observable<any[]> {
    // const headers = new HttpHeaders({
    //   'Authorization': `Bearer ${token}` // השתמש בטוקן שהתקבל כארגומנט
    // });

    return this.http.get<any[]>(this.allCoursesUrl, { headers: this.getHeaders() });
  }

  // פונקציה לשליחת נתונים
  triggerEdit(course: course) {
    console.log("on service");
    this.editCourseSubject.next(course);
    console.log("service 2");
  }
  // update(course: any): Observable<any> {
  //   const token = localStorage.getItem('token'); // שימוש בטוקן עדכני
  //   const headers = new HttpHeaders({
  //     'Authorization': `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   });

  //   return this.http.put(`${this.allCoursesUrl}/${course.id}`, course, { headers });
  // }

  update(course: course): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${sessionStorage.getItem('token')}`
    });
    console.log("on service");

    return this.http.put(`${this.allCoursesUrl}/${course.id}`, course, { headers });
  }

  // פונקציה למחיקת קורס לפי ID
  delete(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    return this.http.delete(`${this.allCoursesUrl}/${id}`, { headers });
  }

  //join user to course:

  enrollUserToCourse(courseId: number, userId: string): Observable<user> {
    const token = localStorage.getItem('token'); // קבלת ה-Token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<user>(
      `${this.allCoursesUrl}/${courseId}/enroll`,
      { userId },
      { headers }
    );
  }

  //motzaei shabbat bsd:
  private apiUrl = 'http://localhost:3000/api/courses'; // כתובת הבסיס ל-API
  private token = localStorage.getItem('token'); // טעינת הטוקן

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
      'Content-Type': 'application/json',
    });
  }

  // /* קבלת כל הקורסים */
  // getAllCourses(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  // }

  /*יצירת קורס חדש */
  createCourse(course: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, course, { headers: this.getHeaders() });
  }

  // updateCourse(courseId: number, updatedData: any, headers: HttpHeaders): Observable<any> {
  //   return this.http.put(`http://localhost:3000/api/courses/${courseId}`, updatedData, { headers });
  // }

  putCoure(title:string,description:string,teacherId:number|0,token:string,id:number):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}` // הוספת הטוקן לכותרת
    });
    const course={title,description,teacherId}
    return this.http.put<course>(`${this.apiUrl}/${id}`,course,{headers})
  }

  /*מחיקת קורס */
  deleteCourse(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  //הוספת קורס
  addCourse(courseData: any, headers: HttpHeaders): Observable<any> {
    return this.http.post('http://localhost:3000/api/courses', courseData, { headers });
  }

  //קבלת פרטי קורס
  getDetails(courseId: number) {
    return this.http.get<any>(`${this.apiUrl}/${courseId}`, { headers: this.getHeaders() })
  }

  // קבלת פרטי שיעור לפי מזהה
  getLessonDetails(courseId: number, lessonId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, {
      headers: this.getHeaders(),
    });
  }

  /*קבלת כל השיעורים בקורס */
  getLessons(courseId: number): Observable<any> {
    console.log("courseId on service ",courseId);
    
    return this.http.get<any>(`${this.apiUrl}/${courseId}/lessons`, { headers: this.getHeaders() });
  }

  /*יצירת שיעור חדש */
  createLesson(courseId: number, lesson: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${courseId}/lessons`, lesson, { headers: this.getHeaders() });
  }

  /* עדכון שיעור */
  updateLesson(courseId: number, lessonId: number, lesson: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, lesson, { headers: this.getHeaders() });
  }

  /*מחיקת שיעור */
  deleteLesson(courseId: number, lessonId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${courseId}/lessons/${lessonId}`, { headers: this.getHeaders() });
  }
}