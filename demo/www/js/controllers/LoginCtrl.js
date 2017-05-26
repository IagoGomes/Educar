// import { Component } from '@angular/core';
// import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
// import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';
// import { ContentPage } from '../content/content';

app.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk) {
	 $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    
    $scope.$parent.clearFabs();
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();
});

