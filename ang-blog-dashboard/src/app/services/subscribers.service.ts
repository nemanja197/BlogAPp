import { Injectable } from '@angular/core';
import { Firestore, collection, deleteDoc, doc, getDocs } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable, catchError, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs:Firestore,private toastrService:ToastrService) {

   }
   getDate(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'subscribers');
    return from(getDocs(collectionInstance)).pipe(
      map((response) =>
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      )
    );
  }
  deleteData(id: string): Observable<void> {
    const docDelete = doc(this.afs, 'subscribers', id);
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
