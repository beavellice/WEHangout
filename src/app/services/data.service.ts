import { Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  docData,
  Firestore,
  updateDoc
} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {update} from "@angular/fire/database";

export interface Evento{
  id?: string;
  nome: string;
  test: string;
  info: string;
  luogo: string;
  date: string[];
}


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getEvent(): Observable<Evento[]> {
    const eventRef = collection(this.firestore, 'evento');
    return collectionData(eventRef, {idField: 'id'}) as  Observable<Evento[]>;
  }

  getEventById(id): Observable<Evento[]> {
    const eventRef = doc(this.firestore, 'evento/${id}');
    return docData(eventRef, {idField: 'myId'}) as  Observable<Evento[]>;
  }
  addEvent(evento: Evento){
    const eventRef = collection(this.firestore, 'evento');
    return addDoc(eventRef, evento);
  }
  deleteEvent(evento: Evento) {
    const eventRef = doc(this.firestore, 'evento/${evento.id}');
    return deleteDoc(eventRef);
  }
  updateEvent(evento: Evento){
    const eventRef = doc(this.firestore, 'evento/${evento.id}');
    return updateDoc(eventRef, {nome: evento.nome, utente:evento.test, info:evento.info, luogo:evento.luogo, date:evento.date});
  }
}
