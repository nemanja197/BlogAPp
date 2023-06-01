import { Injectable } from '@angular/core';
import { Sub } from '../_interface/sub';
import { Firestore,addDoc, collection, getDocs, query, where } from '@angular/fire/firestore';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscribersService {

  constructor(private afs:Firestore) { }
  
  addSubs(subData:Sub){
    const collectionInstance=collection(this.afs,'subscribers');
    addDoc(collectionInstance,subData).then((docRef)=>{
      console.log('Subscibers Saved Sucessfully')
    })
  }
  checkSubs(subEmail:string){
    const collectionInstance=collection(this.afs,'subscribes');
    const queryInstance = query(collectionInstance, where('email', '==', subEmail));
    const queryPromise = getDocs(queryInstance);
    return from(queryPromise);

  }
}
