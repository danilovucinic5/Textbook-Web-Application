import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { StudentComponent } from './student/student.component';
import { AdminComponent } from './admin/admin.component';
import { ProfesorComponent } from './profesor/profesor.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AdminAceeptingComponent } from './admin-aceepting/admin-aceepting.component';
import { GroupCreatingComponent } from './group-creating/group-creating.component';
import { AllGroupsComponent } from './all-groups/all-groups.component';
import { AddStudentToGroupComponent } from './add-student-to-group/add-student-to-group.component';
import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { LessonsComponent } from './lessons/lessons.component';
import { AddExerciseComponent } from './add-exercise/add-exercise.component';
import { AddParagraphComponent } from './add-paragraph/add-paragraph.component';
import { LessonReviewComponent } from './lesson-review/lesson-review.component';
import { ProfileComponent } from './profile/profile.component';
import { AllLessonsComponent } from './all-lessons/all-lessons.component';
import { GlobalLessonsComponent } from './global-lessons/global-lessons.component';
import { ExcerciseChoosingComponent } from './excercise-choosing/excercise-choosing.component';
import { ExcerciseReviewComponent } from './excercise-review/excercise-review.component'
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    StudentComponent,
    AdminComponent,
    ProfesorComponent,
    AdminAceeptingComponent,
    GroupCreatingComponent,
    AllGroupsComponent,
    AddStudentToGroupComponent,
    AddLessonComponent,
    LessonsComponent,
    AddExerciseComponent,
    AddParagraphComponent,
    LessonReviewComponent,
    ProfileComponent,
    AllLessonsComponent,
    GlobalLessonsComponent,
    ExcerciseChoosingComponent,
    ExcerciseReviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
