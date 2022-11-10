import {Injectable} from '@angular/core';

import {
  Firestore,
  collectionData,
  addDoc,
  query,
  where,
  doc,
  docData,
  deleteDoc,
  updateDoc, deleteField, limit, orderBy
} from '@angular/fire/firestore';
import {collection, Query} from '@firebase/firestore';
import {User} from '../model/user.model';
import {Event} from '../model/event.model';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {}
  getUser() {
    const userRef = collection(this.firestore, 'user');
    return collectionData(userRef, {idField: 'id'});
  }
  getEventsByCity(city: string): Observable<any> {
    const userRef = collection(this.firestore, 'event');
    const q = query(userRef, where('city','==',city));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getEventsByUser(username: string): Observable<any> {
    const q = query(collection(this.firestore, 'event'), where('username', '==', username));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getUserByEmail(email: string): Observable<any[]>{
    const q = query(collection(this.firestore, 'user'), where('email', '==', email));
    return collectionData(q,{idField: 'id'}) as Observable<any[]>;
  }
  getEventByID(id): Observable<any[]>{
    const eventRef = doc(this.firestore, `event/${id}`);
    return docData(eventRef,{idField: 'id'}) as Observable<any[]>;
  }
  deleteEvent(id) {
    const eventDocRef = doc(this.firestore, `event/${id}`);
    return deleteDoc(eventDocRef);
  }
  updateEvent(event: Event){
    const eventDocRef = doc(this.firestore, `event/${event.id}`);
    return updateDoc(eventDocRef,
      {title: event.title, description: event.description, city: event.city, address: event.address,
        category:event.category, tags: event.tags, dates:event.dates, datestime: event.datestime, username: event.username});
  }

  deleteDates(id){
    const  eventDocRef = doc(this.firestore, `event/${id}`);
    return updateDoc(eventDocRef, {dates: deleteField(), datestime: deleteField()});
  }



  createUser(user: User){
    const userRef = collection(this.firestore, 'user');
    return addDoc(userRef, user);
  }

  createEvent(event: Event){
    const eventRef = collection(this.firestore, 'event');
    return addDoc(eventRef, event);
  }

}
