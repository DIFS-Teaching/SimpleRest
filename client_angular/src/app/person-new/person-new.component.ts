import { PeopleComponent } from '../people/people.component';
import { Person } from '../people/person';
import { PersonService } from '../person.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-new',
  templateUrl: './person-new.component.html',
  styleUrls: ['./person-new.component.css']
})
export class PersonNewComponent implements OnInit {

  person: Person;

  constructor(
    private location: Location,
    private router: Router,
    private personService: PersonService
  ) { }

  ngOnInit() {
    this.person = new Person();
  }

  save(): void {
    this.personService.createPerson(this.person).subscribe();
    this.router.navigate(['/list']);
  }

  goBack(): void {
    this.location.back();
  }

}
