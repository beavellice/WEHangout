import {Injectable} from '@angular/core';

import {
  addDoc,
  collectionData,
  deleteDoc,
  deleteField,
  doc,
  docData,
  Firestore,
  query,
  setDoc,
  updateDoc,
  where
} from '@angular/fire/firestore';
import {collection, getCountFromServer} from '@firebase/firestore';
import {User} from '../model/user.model';
import {Event} from '../model/event.model';
import {Observable} from 'rxjs';
import {getAuth, updatePassword} from '@angular/fire/auth';
import {Follower} from '../model/follower.model';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private firestore: Firestore) {}
  getEventsByCity(city: string): Observable<any> {
    const eventRef = collection(this.firestore, 'event');
    const q = query(eventRef, where('city','==',city));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getEventsByTags(category: string, tag: string, city: string): Observable<any>{
    const eventRef = collection(this.firestore, 'event');
    const q = query(eventRef, where('tags','array-contains',tag), where('category','==',category), where('city','==',city));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getEventsByPlace(category: string, city: string): Observable<any>{
    const eventRef = collection(this.firestore, 'event');
    const q = query(eventRef, where('category','==',category), where('city','==',city));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getEventsByUser(username: string): Observable<any> {
    const q = query(collection(this.firestore, 'event'), where('username', '==', username));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  getUserByEmail(email: string): Observable<any>{
    const q = query(collection(this.firestore, 'user'), where('email', '==', email));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }


  getUserById(id): Observable<any[]>{
    const userRef = doc(collection(this.firestore, `user/${id}`));
    return docData(userRef,{idField: 'id'}) as Observable<any[]>;
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
        category:event.category, tags: event.tags, username: event.username});
  }

  updateDateEvent(id, date){
    const eventRef = doc(this.firestore, `event/${id}`);
    return setDoc(eventRef, { dates: date }, { merge: true });
  }
  createFollower(follower: Follower){
    const follRef = collection(this.firestore, 'followers');
    return addDoc(follRef, follower);
  }
  async countFollowers(user: string) {
    const q = query(collection(this.firestore, 'followers'), where('user', '==', user));
    const num = await getCountFromServer(q);
    return num.data().count;
  }

  updateUser(user: User){
    const userRef= doc(this.firestore, `user/${user.id}`);
    updatePassword(getAuth().currentUser,user.password);
    return updateDoc(userRef, { username: user.username, password: user.password, city:user.city });
  }

  deleteDates(id){
    const  eventDocRef = doc(this.firestore, `event/${id}`);
    return updateDoc(eventDocRef, {dates: deleteField()});
  }

  createUser(user: User){
    const userRef = collection(this.firestore, 'user');
    return addDoc(userRef, user);
  }

  createEvent(event: Event){
    const eventRef = collection(this.firestore, 'event');
    return addDoc(eventRef, event);
  }
  getFollowers(user: string): Observable<any[]>{
    const q = query(collection(this.firestore, 'followers'), where('follower', '==', user));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  async isFollower(user: string, follower: string) {
    const q = query(collection(this.firestore, 'followers'), where('user', '==', user),where('follower','==',follower));
    const num = await getCountFromServer(q);
    return num.data().count > 0;
  }
  unfollowQ(user: string, follower: string): Observable<any[]>{
    const q =query(collection(this.firestore, 'followers'), where('follower', '==', follower), where('user','==',user));
    return collectionData(q,{idField: 'id'}) as Observable<any>;
  }
  unfollow(id) {
    const eventDocRef = doc(this.firestore, `followers/${id}`);
    return deleteDoc(eventDocRef);
  }

}
