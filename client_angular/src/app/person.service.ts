import { Person } from './people/person';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

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

}
