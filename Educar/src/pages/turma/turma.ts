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
  unidadeEscolar : string;
  sala : string;
  disciplina :string;
  quant_alunos : any;
  horario : string;
  alunos : Array <any>;
  idTurma : any;
  habilitarLancarNota : boolean;
  notaA: any;
  hidden:boolean;
  nome:string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	this.unidadeEscolar = " ";
        this.sala = " ";
        this.disciplina = " ";
        this.quant_alunos = 0;
        this.horario = " ";
        this.nome=" ";
        this.alunos = ['a', 'n'];
        this.notaA=0;
        this.hidden=true;
        this.atualizarInformacoesTurma();
        this.atualizarListaAlunos();        
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
  
  atualizarInformacoesTurma(){
       console.log(this.idTurma);		
       this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/db/?idTurma='+1)
		.map(res => res.json()).subscribe(data => {
                   this.sala=data.sala; 
                   this.quant_alunos=data.quantAlunos;
                   this.disciplina=data.disciplina;
                   this.horario=data.horaInicial + "/" + data.horaFinal;
                   this.nome=data.nome;
                   this.unidadeEscolar=data.unidadeEscolar;
                });
  }

  atualizarListaAlunos(){

  }
}
