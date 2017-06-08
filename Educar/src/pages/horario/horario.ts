import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

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
   idFuncionario: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
    //console.log(this.navParams.get('username'));
    //console.log(this.navParams.get('idFuncionario'));
    this.idFuncionario = this.navParams.get('idFuncionario');

    this.http.get('http://localhost/Educar/php/newDatabase/index.php/Horario/disciplinas/?idFuncionario='+this.idFuncionario)
    .map(res => res.json()).subscribe(data => {
      this.names = data;
      console.log(data);
    });    
  }
      

  ionViewDidLoad() {
    console.log('ionViewDidLoad Horario');
  }

 

}
