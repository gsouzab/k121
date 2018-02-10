import { Injectable } from '@angular/core';
import { Person } from './person';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PersonService {
    private peopleUrl = '/api/people';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getPeople(): Promise<void | Person[]> {
      return this.http.get(this.peopleUrl)
                 .toPromise()
                 .then(response => response.json() as Person[])
                 .catch(this.handleError);
    }

    createPerson(newPerson: Person): Promise<void | Person> {
      return this.http.post(this.peopleUrl, newPerson)
                 .toPromise()
                 .then(response => response.json() as Person)
                 .catch(this.handleError);
    }

    deletePerson(delPersonId: String): Promise<void | Person> {
      return this.http.delete(`${this.peopleUrl}/${delPersonId}`)
                 .toPromise()
                 .then(response => response.json() as Person)
                 .catch(this.handleError);
    }

    updatePerson(putPerson: Person): Promise<void | Person> {
      return this.http.put(`${this.peopleUrl}/${putPerson._id}`, putPerson)
                 .toPromise()
                 .then(response => response.json() as Person)
                 .catch(this.handleError);
    }

    rafflePeople(): Promise<void | String> {
      return this.http.get(`${this.peopleUrl}/raffle`)
                 .toPromise()
                 .then(response => response.json())
                 .catch(this.handleError);

    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
