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
   disciplines: Array<any>;
   dias : Array<any>;
   numDia:number;
   escolas : Array<any>;
   numEscola : any;
   idFuncionario: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    
    //console.log(this.navParams.get('username'));
    //console.log(this.navParams.get('idFuncionario'));
    this.idFuncionario = this.navParams.get('idFuncionario');
    this.numDia=0;
    this.dias=[];
    this.numEscola="";
    this.escolas = [];
    this.atualizarHorario();
  }
      

  atualizarHorario(){
    this.http.get('http://192.168.0.150/Educar/php/newDatabase/index.php/Horario/disciplinas/?idFuncionario='+this.idFuncionario)
          .map(res => res.json()).subscribe(data => {
           this.disciplines = data;
           
           for(let d of this.disciplines){
           		if(this.numDia != d.diaSemana){
           			this.numDia = d.diaSemana;
           			this.dias.push(this.getDia(d.diaSemana));
           		}
           		d.diaSemana = this.getDia(d.diaSemana);

           		if((this.numEscola != d.escola)){
           			this.numEscola=d.escola;
           			if(!(this.escolas.indexOf(d.escola)!=-1)){
           			   this.escolas.push(d.escola);
           			}
           	
           		}
           }
           this.numEscola = '1';
 		   for(let e of this.escolas){
 		   		for(let d of this.disciplines){
 		   			if(e == d.escola){
                         d.iconEscola='assets/img/e'+this.numEscola+'.png';
 		   			} 		   			
 		   		}
 		   		this.numEscola = ""+(parseInt(this.numEscola)+1)%6;
 		   }
           console.log(data);
    });    

  }    

  getDia(idDia:any){
        switch(idDia){
        	case '0': return "Domingo";
        	case '1': return "Segunda-Feira";
			case '2': return "Terça-Feira";
			case '3': return "Quarta-Feira";
			case '4': return "Quinta-Feira";
			case '5': return "Sexta-Feira";
			case '6': return "Sábado";
        }
  }
  abrirTurma(discipline:any){
    this.navCtrl.push(Turma, {
      idDisciplina: discipline.idDisciplina_Grade,
      idTurma: discipline.idTurma});
  }

 

}
