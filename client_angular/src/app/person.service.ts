import { Person } from './people/person';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class PersonService {

  private endpointUrl = 'http://localhost:8088/server.php/data';

  constructor(private http: HttpClient) { }

  getPeople(): Observable<Person[]> {
    return this.http.get<Person[]>(this.endpointUrl);
  }

  getPerson(id: number): Observable<Person> {
    const url = `${this.endpointUrl}/${id}`;
    return this.http.get<Person>(url);
  }

  createPerson(person: Person): Observable<any> {
    return this.http.post(this.endpointUrl, person, httpOptions);
  }

  updatePerson(person: Person): Observable<any> {
    return this.http.put(this.endpointUrl, person, httpOptions);
  }

}
