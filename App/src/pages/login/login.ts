import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ContentPage } from '../content/content';

/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	//contentPage  = ContentPage;


	users: Array<any>;
	account: {username: string, password: string} = {
		username:'joaosantos',
		password: '123456'
	};
	idUser: any;
	// account:{username: string, password: string};

	constructor(public navCtrl: NavController, public navParams: NavParams, 
		public toastCtrl: ToastController, public http: Http,
		 public loadingCtrl: LoadingController) {
		//this.fetchContent();
  	}

 //  	doLogin ():void{
	// 	let loading = this.loadingCtrl.create({
	// 		content: 'Fetching content...'
	// 	});

	// loading.present();
	doLogin(){
		// this.http.get('http://localhost/newDatabase/index.php/Welcome/db/?username='+ this.account.username +'&password='+this.account.password).map(res => res.json()).subscribe(data => {
		// 	this.users = data;
		// 	console.log(this.users);
		// });
		console.log(this.account.username);
		console.log(this.account.password);		
		this.http.get('http://localhost/newDatabase/index.php/Welcome/db/?username='+this.account.username+'&password='+this.account.password)
		.map(res => res.json())
		.subscribe(data => 	this.navCtrl.push(ContentPage,
			{username: this.account.username,
			 teste: data}));

		// this.http.get('http://localhost/newDatabase/index.php/Welcome/db/?username='+this.account.username+'&password='+this.account.password)
		// .map(res => res.json())
		// .subscribe(data => {
		// 	this.users = data;
		// 	//loading.dismiss();
		// 	console.log(this.users);
		// 	//console.log(this.users[0]);
		// 	this.navCtrl.push(ContentPage,{
		// 		username: this.account.username,
		// 		//idUsuario: this.idUser 
		// 	});					
		// });		
		//this.idUser = this.users[0];
		//console.log(this.users[0]);
		
		//this.teste();

	}
	teste(){
		console.log(this.users);
	}
		//console.log("teste");

		// this.navCtrl.push(ContentPage,{
		// 	username: this.account.username,
		// 	//idUsuario: this.idUser 
		// });		
}
