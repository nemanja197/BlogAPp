import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, onSnapshot } from '@angular/fire/firestore';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private afs:Firestore) { }
 
  getCategoryData(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'categories');
    return new Observable<any[]>((observer) => {
      const unsubscribe = onSnapshot(collectionInstance, (querySnapshot) => {
        const data: any[] = [];
        querySnapshot.forEach((doc) => {
          data.push({
            id: doc.id,
            ...doc.data()
          });
        });
        observer.next(data);
      });
      return unsubscribe;
    });
  }
}

