import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { AddStudentToGroupComponent } from './add-student-to-group/add-student-to-group.component';
import { AdminAceeptingComponent } from './admin-aceepting/admin-aceepting.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { ExcerciseReviewComponent } from './excercise-review/excercise-review.component';
import { GlobalLessonsComponent } from './global-lessons/global-lessons.component';
import { GroupCreatingComponent } from './group-creating/group-creating.component';
import { LessonReviewComponent } from './lesson-review/lesson-review.component';
import { LessonsComponent } from './lessons/lessons.component';
import { LoginComponent } from './login/login.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:"",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"profesor",component:ProfesorComponent},
  {path:"admin",component:LoginComponent},
  {path:"student",component:StudentComponent},
  {path:"adminAccepting",component:AdminAceeptingComponent},
  {path:"login",component:LoginComponent},
  {path:"groupCreating",component:GroupCreatingComponent},
  {path:"allGroups",component:AllGroupsComponent},
  {path:"addStudentToGroup",component:AddStudentToGroupComponent},
  {path:"addLesson",component:AddLessonComponent},
  {path:"lessons",component:LessonsComponent},
  {path:"lessonReview",component:LessonReviewComponent},
  {path:"profile",component:ProfileComponent},
  {path:"allLessons",component:AllLessonsComponent},
  {path:"globalLessons",component:GlobalLessonsComponent},
  {path:"excersiseReview",component:ExcerciseReviewComponent},
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
