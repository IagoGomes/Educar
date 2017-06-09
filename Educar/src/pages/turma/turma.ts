import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController  } from 'ionic-angular';
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
  nota : any;
  media : any;
  numNotas: any;

  /*controles*/
  habilitarLancarNota : boolean;
  loading : any;
  hidden              :boolean;
  /*configuração da página*/
  titulo              :string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl: LoadingController) {
	  this.unidadeEscolar = " ";
    this.sala = " ";
    this.disciplina = " ";
    this.quant_alunos = 0;
    this.titulo=" ";
    
    this.hidden=true;

    this.ns = [];
 
    this.media = 0;
    this.numNotas =0; 

    this.nota=0;

    this.idTurma = this.navParams.get('idTurma');
    this.idDisciplina = this.navParams.get('idDisciplina');

    this.atualizarInformacoesTurma();

    
  }//fim constructor
  

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
     if(this.quant_alunos > 0)
        this.habilitarLancarNota = !this.habilitarLancarNota;
  }//fim fabLancarNota
  /*para mudar a cor do fab quando selecionado*/
  mudarCorFab(){	
   	return (this.habilitarLancarNota) ? 'fabVerde' : 'fabVermelha';
  }//fim mudarCorFab
  /*para mudar a cor da média do aluno*/ 
  mudarCorMedia(media : any){
 	return (parseFloat(media) >= 70) ? "badgeAprovado" : ((parseFloat(media)>=0) ? 'badgeReprovado' : 'badgeSemResultado');
  }//fim mudarCorMedia
  /*atualiza o card infos da disciplina*/
  atualizarInformacoesTurma(){
    let loading = this.loadingCtrl.create({
      content: 'aguarde...',
      dismissOnPageChange: true
    });
    loading.present();

       this.http.get('http://192.168.0.150/Educar/php/newDatabase/index.php/Turma/turmaInfos/?idTurma='+this.idTurma+'&idDisciplina='+this.idDisciplina)
		.map(res => res.json()).subscribe(data => {
                   this.sala=data.sala; 
                   this.disciplina=data.disciplina;
                   this.titulo=data.nome;
                   this.unidadeEscolar=data.unidadeEscolar;
                });
		this.http.get('http://192.168.0.150/Educar/php/newDatabase/index.php/Turma/quantAlunos/?idTurma='+this.idTurma+'&idDisciplina='+this.idDisciplina)
		.map(res => res.json()).subscribe(data => {
                   this.quant_alunos=data; 
                   if(parseFloat(this.quant_alunos) > 0){
                      this.atualizarListaAlunos();  
                      loading.dismiss();       
                    }
                });

  }//fim atualizarInformacoesTurma
  /*atualiza a lista de alunos*/
  atualizarListaAlunos(){
  	this.http.get('http://192.168.0.150/Educar/php/newDatabase/index.php/Turma/getAlunos/?idTurma='+this.idTurma+'&idDisciplina='+this.idDisciplina)
		.map(res => res.json()).subscribe(data => {
                   this.alunos=data;
                   for(let aluno of this.alunos){
                   	aluno.hidden=false;
                   	aluno.modificando=false;
                   	aluno.sexo=this.definirAvatar(aluno.sexo);
                   }
             });
    
    this.http.get('http://192.168.0.150/Educar/php/newDatabase/index.php/Turma/getNotas/?idTurma='+this.idTurma+'&idDisciplina='+this.idDisciplina)
		.map(res => res.json()).subscribe(data => {
                   this.notas=data;
                   for(let aluno of this.alunos){
	                   for(let nota of this.notas){
	                   		if(nota.idAluno == aluno.idAluno){
                                                        nota.nota = parseFloat(nota.nota)*10;
	                   				this.media=  parseFloat(this.media) + parseFloat(nota.nota);
	                   				this.numNotas = parseFloat(this.numNotas) + 1;
	                   				this.ns.push(nota);
	                   		}
	                   }
	                   aluno.nota = this.ns;
	                   this.media=parseFloat(this.media)/parseFloat(this.numNotas);
	                   aluno.media = this.roundNumber(this.media, 0);
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
        this.nota = parseFloat(nota.nota)/10;
  	this.http.get('http://192.168.0.150/Educar/php/newDatabase/index.php/Turma/mudarNota/?idDisciplinaAvaliacao='+nota.idDisciplinaAvaliacao+'&nota='+this.nota)
		.map(res => res.json()).subscribe(data => {
           
		});
      this.media=0;
             this.numNotas =0;
             for(let n of aluno.nota){
                this.media=parseFloat(this.media) + parseFloat(n.nota);
                this.numNotas=parseFloat(this.numNotas) + 1;
             }
             this.media=parseFloat(this.media)/parseFloat(this.numNotas);
             aluno.media=this.roundNumber(this.media,0);
             this.media=0;
             this.numNotas=0;

  }//fim mudarNota

  roundNumber(num, scale) {
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
