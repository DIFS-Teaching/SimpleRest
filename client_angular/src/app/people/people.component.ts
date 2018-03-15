import { PersonService } from '../person.service';
import { Person } from './person';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: Person[];
  filter: string;

  constructor(private personService: PersonService) { }

  ngOnInit() {
    this.filter = '';
    this.getPeople();
  }

  getPeople(): void {
    this.personService.getPeople().subscribe(people => this.filterPeople(people));
  }

  private filterPeople(people: Person[]): void {
    this.people = [];
    const f = this.filter.toLocaleLowerCase();
    for (const p of people) {
      if (f.length === 0
            || p.name.toLocaleLowerCase().indexOf(f) !== -1
            || p.surname.toLocaleLowerCase().indexOf(f) !== -1) {
        this.people.push(p);
      }
    }
  }

  filterChanged(): void {
    this.getPeople();
  }

}
