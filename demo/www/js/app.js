// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var app = angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput'])

app.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

app.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    // Turn off caching for demo simplicity's sake
    $ionicConfigProvider.views.maxCache(0);

    /*
    // Turn off back button text
    $ionicConfigProvider.backButton.previousTitleText(false);
    */

    $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu/menu.html',
        controller: 'AppCtrl'
    })

    .state('app.turma', {
        url: '/turma',
        views: {
            'menuContent': {
                templateUrl: 'templates/turma/turma.html',
                controller: 'TurmaCtrl'
            },
            'fabContent': {
                template: '<button id="fab-turma" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin"><i class="icon ion-clipboard"></i></button>',
                controller: function ($timeout) {
                    $timeout(function () {
                        document.getElementById('fab-turma').classList.toggle('on');
                    }, 900);
                }
            }
           
        }
    })

    .state('app.login', {
        url: '/login',
        views: {
            'menuContent': {
                templateUrl: 'templates/login/login.html',
                controller: 'LoginCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {}
           }
        }
    })

    .state('app.horario', {
        url: '/horario',
        views: {
            'menuContent': {
                templateUrl: 'templates/horario/horario.html',
                controller: 'HorarioCtrl'
            },
            'fabContent': {
                template: '',
                controller: function ($timeout) {}
           }
        }
    })
    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/app/login');
});
