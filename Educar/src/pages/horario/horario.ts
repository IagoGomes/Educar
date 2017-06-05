import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Horario page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-horario',
  templateUrl: 'horario.html',
})
export class Horario {
   disciplines = [
       {name:"Portugues", place: "UESB", class:"Sétimo ano", time: "8h30 - 9h30"},
       {name:"Portugues", place: "UESB", class:"Sétimo ano", time: "8h30 - 9h30"}];
   name = "Uau";
   
   names = ["Primeiro", "Segundo", "Terceiro"];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
      
  }
      

  ionViewDidLoad() {
    console.log('ionViewDidLoad Horario');
  }

 

}
