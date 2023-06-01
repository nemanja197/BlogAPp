import { Injectable } from '@angular/core';
import { Firestore, collection, getDocs, query, where } from '@angular/fire/firestore';
import { doc, getDoc, increment, orderBy, updateDoc } from 'firebase/firestore';
import { Observable, from, map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private afs:Firestore) { }
  loadFeatured(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'posts');
    const queryInstance = query(collectionInstance, where('isFeatured', '==', true));
  
    return from(getDocs(queryInstance)).pipe(
      map((response) =>
        response.docs
          .map((item) => ({ ...item.data(), id: item.id }))
          .slice(0, 4) // Ograničenje na 4 elementa
      )
    );
  }

  loadLates(): Observable<any[]> {
    const collectionInstance = collection(this.afs, 'posts');
    const queryInstance = query(collectionInstance, orderBy('createdAt'));
  
    return from(getDocs(queryInstance)).pipe(
      map((response) =>
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      )
    );
  }
  
  
  loadCategoryPosts(categoryId:any){
    const collectionInstance = collection(this.afs, 'posts');
    const queryInstance = query(collectionInstance, where('category.categoryId','==',categoryId));
  
    return from(getDocs(queryInstance)).pipe(
      map((response) =>
        response.docs.map((item) => {
          return { ...item.data(), id: item.id };
        })
      )
    );
  }

  loadOnePost(postId:string){
    const collectionInstance = collection(this.afs, 'posts');
    const docRef = doc(collectionInstance, postId);
    return from(getDoc(docRef)).pipe(
      map((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.data();
          return { ...data, id: snapshot.id };
        } else {
          throw new Error(`No document found with ID: ${postId}`);
        }
      })
    );
  }
  loadSimilar(categoryId :string){
    const collectionInstance = collection(this.afs, 'posts');
    const queryInstance = query(collectionInstance, where('category.categoryId', '==', categoryId));
  
    return from(getDocs(queryInstance)).pipe(
      map((response) =>
        response.docs
          .map((item) => ({ ...item.data(), id: item.id }))
          .slice(0, 4) // Ograničenje na 4 elementa
      )
    );

  }
   countView(postId:any) {
    const incrementViews = increment(1);
  
    const collectionInstance = collection(this.afs, 'posts');
    const docRef = doc(collectionInstance, postId);
  
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          return updateDoc(docRef, { views: incrementViews });
        } else {
          console.log('Dokument sa zadatim ID-om ne postoji.');
          return null;
        }
      })
      .then(() => {
        console.log('Vrednost "views" polja je uspešno povećana za 1.');
      })
      .catch((error) => {
        console.error('Došlo je do greške prilikom brojanja prikaza:', error);
      });
  }


  
}
