import { Injectable } from '@angular/core';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { Users } from '../users';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn:Subject<boolean>=new Subject<boolean>();
  loggedIn$=this.loggedIn.asObservable();
  isLoggedInGuard:boolean=false;
  userEmail: Subject<string> = new Subject<string>(); 

  constructor(private toastr:ToastrService,private router:Router) {

   }


  login(form: Users) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.toastr.success('Logged In Successfully');
        this.router.navigate(['/']);
        this.loadUser();
        this.loggedIn.next(true);
        this.isLoggedInGuard=true;
        this.userEmail.next(user.email ||'');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastr.warning(errorMessage);
        this.userEmail.next(''); // Emituj prazan e-mail

      })
  }
  loadUser(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
       const uid = user.uid;
       this.isLoggedInGuard=true;

       localStorage.setItem('user',JSON.stringify(user))
      } else {
   
      }
    });
  }
  logout(){
    const auth = getAuth();
    signOut(auth).then(() => {
      this.toastr.success('User Logged Out Successfully');
      this.router.navigate(['/login']);
      localStorage.removeItem('user');
      this.loggedIn.next(false);
      this.isLoggedInGuard=false;
    }).catch((error) => {
      
    });
  }
  isloggedIn(){
    return this.loggedIn;
  }
 

}
