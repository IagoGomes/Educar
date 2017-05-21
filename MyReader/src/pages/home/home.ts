import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
 
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  public users: Array<any>;
 
  constructor(public navCtrl: NavController, public http: Http) {
 
    this.http.get('http://localhost/newDatabase/index.php/Welcome/db/?id=2&name=joao').map(res => res.json()).subscribe(data => {
        this.users = data;
        console.log(this.users);
    });
 
  }
}