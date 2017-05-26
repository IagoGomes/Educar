import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Content page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-content',
  templateUrl: 'content.html',
})
export class ContentPage {
	public firstParam:any;
	public secondParam: any;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.firstParam = navParams.get("username");
		this.secondParam = navParams.get("teste");
		console.log(this.firstParam,"user:", this.secondParam, this.secondParam.idUsuario);
	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Content');
  }

}
