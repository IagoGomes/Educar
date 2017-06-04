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
  /*identificadores*/
  idTurma      : any;
  idDisciplina : any;
  /*card info disciplina*/
  unidadeEscolar : string;
  sala           : string;
  disciplina     : string;
  quant_alunos   : any;
  alunos         : Array <any>;
  /*controles*/
  habilitarLancarNota : boolean;
  notaA               : any;
  hidden              :boolean;
  /*configuração da página*/
  titulo              :string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	this.unidadeEscolar = " ";
    this.sala = " ";
    this.disciplina = " ";
    this.quant_alunos = 0;
    this.titulo=" ";
    
    this.notaA=0;
    this.hidden=true;

    this.atualizarInformacoesTurma();
    this.atualizarListaAlunos();

            
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Turma');
  }

  /*quando um card de aluno é selecionado*/
  itemSelected(aluno: any) {
    if(this.habilitarLancarNota){
        for(let a of this.alunos){
        	if(a.idAluno != aluno.idAluno){
        	    a.hidden=false;
        	}
        }
        aluno.hidden=!aluno.hidden;
    }     
  }
  /*quando o fab é selecionado*/
  fabLancarNota(){
      this.habilitarLancarNota = !this.habilitarLancarNota;
  }
  /*para mudar a cor do fab quando selecionado*/
  mudarCorFab(){	
   	return (this.habilitarLancarNota) ? 'fabAzul' : 'fabVermelha';
  }
  /*para mudar a cor da média do aluno*/ 
  mudarCorMedia(media : any){
 	return (media >= 7) ? "badgeAprovado" : ((media>=0) ? 'badgeReprovado' : 'badgeSemResultado');
  }
  /*atualiza o card infos da disciplina*/
  atualizarInformacoesTurma(){
       console.log(this.idTurma);		
       this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/turmaInfos/?idTurma='+1+'&idDisciplina='+1)
		.map(res => res.json()).subscribe(data => {
                   this.sala=data.sala; 
                   this.disciplina=data.disciplina;
                   this.titulo=data.nome;
                   this.unidadeEscolar=data.unidadeEscolar;
                });
		this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/quantAlunos/?idTurma='+1+'&idDisciplina='+1)
		.map(res => res.json()).subscribe(data => {
                   this.quant_alunos=data; 
                });

  }
  /*atualiza a lista de alunos*/
  atualizarListaAlunos(){
  	this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/getAlunos/?idTurma='+1+'&idDisciplina='+1)
		.map(res => res.json()).subscribe(data => {
                   this.alunos=data;
                   for(let aluno of this.alunos){
                   	aluno.hidden=false;
                   }
             });

        
  }

  isExibicao(aluno:any){
  	return aluno.hidden;
  }
}
