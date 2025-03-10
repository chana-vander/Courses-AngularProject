import { Routes } from '@angular/router';
import { LoginComponent } from '../components/login/login.component';
import { SigninComponent } from '../components/signin/signin.component';
import { AllCoursesComponent } from '../components/all-courses/all-courses.component';
import { ManageCourseComponent } from '../components/manage-course/manage-course.component';
import { ManageLessonComponent } from '../components/manage-lesson/manage-lesson.component';
import { CourseDetailsComponent } from '../components/course-details/course-details.component';
import { AddOrEditCourseComponent } from '../components/add-or-edit-course/add-or-edit-course.component';
export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signin', component: SigninComponent },
    {
        path: 'courses', component: AllCoursesComponent,
        children: [
            { path: ':courseId/details', component: CourseDetailsComponent },
        ]
    },
    { path: 'manage-lessons', component: ManageLessonComponent },
    { path: 'manage-course', component: ManageCourseComponent }, // הוספה
    { path: 'manage-course/:id', component: ManageCourseComponent }, // עריכה

    { path: 'add-or-edit', component: AddOrEditCourseComponent }
];