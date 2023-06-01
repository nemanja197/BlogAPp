import { Injectable } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  doc,
  updateDoc,
  getDoc,
  getDocs,
  deleteDoc,
} from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, from, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private afs: Firestore, private toastrService: ToastrService) {}

  saveDate(date: any) {
    const collectionInstance = collection(this.afs, 'categories');

    addDoc(collectionInstance, date)
      .then((docRef) => {
        console.log('Category added successfully with ID:', docRef.id);
        this.toastrService.success('Date Insert Successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getDate(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'categories');
    return from(getDocs(collectionInstance)).pipe(
      map((response) =>
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      )
    );
  }

  updateData(id: string, editData: any) {
    const docInstance = doc(this.afs, 'categories', id);
    return from(updateDoc(docInstance, editData)).pipe(
      map(() => {
        this.toastrService.success('Date Update Successfully');
      })
    );
  }
  deleteData(id: string): Observable<void> {
    const docDelete = doc(this.afs, 'categories', id);
    return from(deleteDoc(docDelete)).pipe(
      map(() => {
        this.toastrService.success('Date Deleted Successfully');
      }),
      catchError((error) => {
        console.log(error);
        return [];
      })
    );
  }
}
