import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Person } from './person.model';
import { NgForm } from '@angular/forms';

@Injectable()
export class PersonService {
  selectedPerson = Person;
  persons : Person[];
  readonly baseURL ="http://localhost:3000/person";

  constructor( private http : HttpClient) { }

  updatePerson(_id:string, person : Person) {
    return this.http.put(this.baseURL + `/${_id}`, person);
  }
  
  postPerson(person : Person){
    return this.http.post(this.baseURL,person)
  }

  getPersonList(){
    return this.http.get(this.baseURL);
  }
  
  deletePerson(_id:string){
    return this.http.delete(this.baseURL + `/${_id}`)
  }
}
