import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../_Interface/post';
import { Observable, catchError, from, map } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(
    private storage: AngularFireStorage,
    private afs: Firestore,
    private toastr: ToastrService,
    private postRouter: Router
  ) {}
  uploadImg(selectedImg: any, postData: Post, formStatus: any, id: any) {
    const filePath = `postIMG/${Date.now()}`;
    console.log(filePath);
    this.storage.upload(filePath, selectedImg).then(() => {
      this.storage
        .ref(filePath)
        .getDownloadURL()
        .subscribe((url) => {
          postData.postImgPath = url;
          console.log(postData);
          if (formStatus == 'Edit') {
            this.updateData(id, postData).subscribe();
          } else {
            this.saveData(postData);
          }
        });
    });
  }
  saveData(postData: Post) {
    const collectionInstance = collection(this.afs, 'posts');
    addDoc(collectionInstance, postData)
      .then((docRef) => {
        this.toastr.success('Date Insert Successfully');
        this.postRouter.navigate(['/posts']);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDate(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'posts');
    return from(getDocs(collectionInstance)).pipe(
      map((response) =>
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      )
    );
  }
  loadOneData(id: string): Observable<any> {
    const collectionInstance = collection(this.afs, 'posts');
    const docRef = doc(collectionInstance, id);

    return from(getDoc(docRef)).pipe(
      map((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          return { ...data, id: snapshot.id };
        } else {
          throw new Error(`No document found with ID: ${id}`);
        }
      })
    );
  }

  updateData(id: string, postData: any): Observable<void> {
    const docInstance = doc(this.afs, 'posts', id);
    return from(updateDoc(docInstance, postData)).pipe(
      map(() => {
        this.toastr.success('Date Update Successfully');
        this.postRouter.navigate(['/posts']);
      })
    );
  }
  deleteImage(postImg: string, id: string): Observable<void> {
    return new Observable<void>((observer) => {
      this.storage.storage
        .refFromURL(postImg)
        .delete()
        .then(() => {
          this.deleteData(id).subscribe(
            () => {
              observer.next(); 
              observer.complete();
            },
            (error) => {
              observer.error(error); 
            }
          );
        })
        .catch((error) => {
          observer.error(error);
        });
    });
  }

  deleteData(id: string): Observable<void> {
    const docDelete = doc(this.afs, 'posts', id);
    return from(deleteDoc(docDelete)).pipe(
      map(() => {
        this.toastr.warning('Date Deleted Successfully');
      }),
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }
  markFeatured(id: string, featuredValue: boolean): Observable<void> {
    const docInstance = doc(this.afs, 'posts', id);
    return from(updateDoc(docInstance, { isFeatured: featuredValue })).pipe(
      map(() => {
        this.toastr.success('Featured Status Updated');
      })
    );
  }
}
