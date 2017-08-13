import { Component, NgZone, OnInit } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { API } from "../../services/api";

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [API]
})
export class HomePage implements OnInit {
  
  contacts;

  constructor(
    public navCtrl: NavController,
    public api: API,
    public zone: NgZone
  ) {
    this.contacts = [];
  }

  ngOnInit() {
    this.refresh();
  }  
  
  refresh() {
    this.api.getContacts().then(values => {
      this.contacts = values;
    });
  }

  async generate() {
    let users = await this.api.generateRandomUsers(10);
    users.forEach((user => {
        this.addContact(user)
    }).bind(this));
  }

  async addContact(user) {
    let contact = {
      name: this.toUp(user.name.first) + ' ' + this.toUp(user.name.last),
      phone: user.phone,
      address: this.toUp(user.location.state) + ', ' + this.toUp(user.location.city),
      picture: user.picture.thumbnail
    };

    await this.api.addContact(contact);

    this.refresh();
  }

  async generateContact() { 
    let user = await this.api.generateRandomUser();    
    this.addContact(user)
  } 

  async removeContact(c) {
    await this.api.removeContact(c);
    this.refresh();
  }

  search(value) {
    if (value) {
      this.api.search(value).then(values => {
        this.contacts = values;
      })
    } else {
      this.refresh();
    }
  }

  toUp(s) {
    return s.replace(/\b\w/g, l => l.toUpperCase())    
  }  
}
