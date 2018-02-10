import { Component, OnInit, Input } from '@angular/core';
import { Person } from '../person';
import { PersonService } from '../person.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.css'],
  providers: [PersonService]
})
export class PeopleListComponent implements OnInit {
  people: Person[]
  toUpdatePerson: Person

  constructor(private personService: PersonService, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.personService
     .getPeople()
     .then((people: Person[]) => {
       this.people = people
     });
  }

  /**
   * Finds the index of a person on the people list
   */
  private getIndexOfPerson = (personId: String) => {
    return this.people.findIndex((person) => {
      return person._id === personId;
    });
  }

  resetPerson = () => {
    this.toUpdatePerson = {} as Person;
  }

  /**
   * Add a person to the people list
   */
  addPerson = (person: Person) => {
    this.people.push(person);
    return this.people;
  }

  selectPerson = (person: Person) => {
    this.toUpdatePerson = person;
  }

  /**
   * Update existent person at the people list
   */
  updatePerson = (person: Person) => {
    var idx = this.getIndexOfPerson(person._id);
    if (idx !== -1) {
      this.people[idx] = person;
    }
    this.resetPerson();
    return this.people;
  }

  /**
   * Delete person from api and removes from the people list
   */
  deletePerson = (person: Person) => {
    this.personService
      .deletePerson(person._id)
      .then((deletedPerson: Person) => {
          var idx = this.getIndexOfPerson(deletedPerson._id);
          if (idx !== -1) {
            this.people.splice(idx, 1);
          }
          return this.people;
      });
  }

  rafflePeople = () => {
    this.personService
      .rafflePeople()
      .then((result) => {
        console.log(result);
        this.snackBar.open("Emails sent!", "OK")
      });
  }
}
