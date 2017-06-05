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
  notas          : Array <any>;
  ns          : Array <number>;
  media : any;
  numNotas: any;
  /*controles*/
  habilitarLancarNota : boolean;

  hidden              :boolean;
  /*configuração da página*/
  titulo              :string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
	this.unidadeEscolar = " ";
    this.sala = " ";
    this.disciplina = " ";
    this.quant_alunos = 0;
    this.titulo=" ";
    
    this.hidden=true;

    this.ns = [];
 
    this.media = 0;
    this.numNotas =0; 

    this.atualizarInformacoesTurma();
    this.atualizarListaAlunos();         
  }//fim constructor
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad Turma');
  }//fim ionViewDidLoad

  /*quando um card de aluno é selecionado*/
  itemSelected(aluno: any) {
    if(this.habilitarLancarNota){
        for(let a of this.alunos){
        	if(a.idAluno != aluno.idAluno){
        	    a.hidden=false;
        	}
        }
        if(!aluno.modificando){
           aluno.hidden=!aluno.hidden;
        }else{
           aluno.modificando=false;
        }

    }     
  }//fim itemSelected
  /*quando o fab é selecionado*/
  fabLancarNota(){
      this.habilitarLancarNota = !this.habilitarLancarNota;
  }//fim fabLancarNota
  /*para mudar a cor do fab quando selecionado*/
  mudarCorFab(){	
   	return (this.habilitarLancarNota) ? 'fabVerde' : 'fabVermelha';
  }//fim mudarCorFab
  /*para mudar a cor da média do aluno*/ 
  mudarCorMedia(media : any){
 	return (parseFloat(media) >= 7) ? "badgeAprovado" : ((parseFloat(media)>=0) ? 'badgeReprovado' : 'badgeSemResultado');
  }//fim mudarCorMedia
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

  }//fim atualizarInformacoesTurma
  /*atualiza a lista de alunos*/
  atualizarListaAlunos(){
  	this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/getAlunos/?idTurma='+1+'&idDisciplina='+1)
		.map(res => res.json()).subscribe(data => {
                   this.alunos=data;
                   for(let aluno of this.alunos){
                   	aluno.hidden=false;
                   	aluno.modificando=false;
                   	aluno.sexo=this.definirAvatar(aluno.sexo);
                   }
             });
    
    this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/getNotas/?idTurma='+1+'&idDisciplina='+1)
		.map(res => res.json()).subscribe(data => {
                   this.notas=data;
                   for(let aluno of this.alunos){
	                   for(let nota of this.notas){
	                   		if(nota.idAluno == aluno.idAluno){
	                   				this.ns.push(nota);
	                   				this.media=  parseFloat(this.media) + parseFloat(nota.nota);
	                   				this.numNotas = parseFloat(this.numNotas) + 1;
	                   		}
	                   }
	                   aluno.nota = this.ns;
	                   this.media=parseFloat(this.media)/parseFloat(this.numNotas);
	                   aluno.media = this.roundNumber(this.media, 2);
	                   this.numNotas =0;
	                   this.media=0;
	                   this.ns = [];
               	   }
             });
       
        
  }//fim atualizarListaAlunos

  isExibicao(aluno:any){
  	return aluno.hidden;
  }//fim isExibicao

  mudarNota(nota:any, aluno:any){
  	aluno.modificando=true;
  	this.http.get('http://localhost/Educar/php/newDatabase/index.php/Turma/mudarNota/?idDisciplinaAvaliacao='+nota.idDisciplinaAvaliacao+'&nota='+nota.nota)
		.map(res => res.json()).subscribe(data => {
             this.media=0;
             this.numNotas =0;
             for(let n of aluno.nota){
                this.media=parseFloat(this.media) + parseFloat(n.nota);
                this.numNotas=parseFloat(this.numNotas) + 1;
             }
             this.media=parseFloat(this.media)/parseFloat(this.numNotas);
             aluno.media=this.roundNumber(this.media,2);
             this.media=0;
             this.numNotas=0;
		});

  }//fim mudarNota

  roundNumber(num, scale) {
	  //return (Math.round(parseFloat(num)*10*parseFloat(scale))/(10*parseFloat(scale)));
	  return parseFloat(num).toFixed(scale);
  }//fim roundNumber

  definirAvatar(sexo: any){
        if(sexo == 'M'){
           return "assets/img/m.jpg";
        }else{
           return "assets/img/f.png";
        }
  }
}
