import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/**
 * Generated class for the Turma page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-turma',
  templateUrl: 'turma.html',
})
export class Turma {
  local : string;
  sala : string;
  disciplina :string;
  quant_alunos : any;
  horario : string;
  alunos : Array <any>;
  idTurma : any;
  habilitarLancarNota : boolean;
  notaA: any;
  hidden:boolean;
  exibirForm:boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	this.local = "OI";
        this.sala = "OI";
        this.disciplina = "OI";
        this.quant_alunos = 3;
        this.horario = "3:00";
        this.alunos = ['a', 'n'];
        this.notaA=0;
        this.hidden=true;
        
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Turma');
  }

  itemSelected(item: any) {
    if(this.habilitarLancarNota){
        this.hidden=!this.hidden;
    }     
  }

  fabLancarNota(){
      this.habilitarLancarNota = !this.habilitarLancarNota;
  }
  mudarCorFab(){	
   	return (this.habilitarLancarNota) ? 'fabAzul' : 'fabVermelha';
  }

 mudarCorMedia(media : any){
 	return (media >= 7) ? "badgeAprovado" : ((media>=0) ? 'badgeReprovado' : 'badgeSemResultado');
 }
}
