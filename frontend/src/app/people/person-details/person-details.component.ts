import { Component, Input, OnInit } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'person-details',
  templateUrl: './person-details.component.html',
  styleUrls: ['./person-details.component.css'],
  providers: [PersonService]
})
export class PersonDetailsComponent implements OnInit {
  @Input()
  person: Person;

  @Input()
  createHandler: Function;
  @Input()
  updateHandler: Function;
  @Input()
  resetHandler: Function;

  constructor(private personService: PersonService) { }

  private resetPerson = () => {
    this.person = {} as Person;
  }

  clearPerson = () => {
    this.resetPerson();
    this.resetHandler();
  }

  createPerson = (person: Person) => {
    this.personService.createPerson(person).then((newPerson: Person) => {
      this.createHandler(newPerson);
      this.resetPerson();
    });
  }

  updatePerson = (person: Person): void => {
    this.personService.updatePerson(person).then((updatedPerson: Person) => {
      this.updateHandler(updatedPerson);
      this.resetPerson();
    });
  }

  ngOnInit() {
    this.resetPerson();
  }

}
