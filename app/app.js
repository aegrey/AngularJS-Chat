/**
 * @ngdoc interface
 * @name chatApp.interface:chatApp
 * @description Initates Angular Load
*/

(function() {
  'use strict';

  angular
    .module('chatApp', [
      'ui.router',
      'btford.socket-io',
      'LocalStorageModule'
    ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    'localStorageServiceProvider',
    Route
  ]);

  function Route($stateProvider, $urlRouterProvider, localStorageServiceProvider) {

    $stateProvider
      .state('chat', {
        url: '/',
        templateUrl: 'views/chat/chatView.html',
        controller: 'ChatController',
        controllerAs: 'chat'
      });

    $urlRouterProvider.otherwise('/');

    localStorageServiceProvider.setStorageType('sessionStorage');
  }

})();
