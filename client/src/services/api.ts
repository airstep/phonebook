import { Http, Response, RequestOptionsArgs, Headers } from '@angular/http';
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class API {
  private apiURL: string = "http://localhost:8080/contact";

  constructor(public http: Http) { }

  async getContacts() {
    return this.http.get(this.apiURL)
      .map(res => res.json())
      .toPromise();
  }

  async search(value) {
    return this.http.get(this.apiURL + '/search?q=' + value)
      .map(res => res.json())
      .toPromise();
  }

  async addContact(contact) {
    return this.http.post(this.apiURL, contact)
      .map(res => res.json())
      .toPromise();
  }

  async removeContact(contact) {
    return this.http.delete(this.apiURL + '/' + contact._id)
      .map(res => res.json())
      .toPromise();
  }

  async generateRandomUsers(count: number) {
    return this.http.get('https://randomuser.me/api/?results=' + count)
      .map(data => {
        let result = data.json().results;
        return result;
      })
      .catch(this.catchError)
      .toPromise();
  }

  async generateRandomUser() {
    let users = await this.generateRandomUsers(1);
    return users[0];
  }

  catchError(error: Response) {
    console.log(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}