/**
 * @ngdoc chachatApp
 * @name chatApp.module:chatApp
 * @description Initiating Application & Routing
*/

(function() {
  'use strict';

  //INITIATE APP & INJECTIONS
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
