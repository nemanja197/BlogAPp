import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { CategoriesComponent } from './categories/categories.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { LoginComponent } from './auth/login/login.component';
import { SubscribersComponent } from './subscribers/subscribers.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CategoriesComponent,
    AllPostComponent,
    NewPostComponent,
    LoginComponent,
    SubscribersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideFirestore(() => getFirestore()),
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    AngularEditorModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    AngularFireStorageModule,
    
    
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
