/**
 * @ngdoc chachatApp
 * @name chatApp.module:chatApp
 * @description Initiating Application & Routing
*/

(function() {
  'use strict';

  //Not making chat functionality a module since it's the main app.
  //INITIATE APP & INJECTIONS
  angular
    .module('chatApp', [
      'ui.router',
      'ngAnimate',
      'ngTouch'
    ])
  .config([
    '$stateProvider',
    '$urlRouterProvider',
    Route
  ]);

  function Route($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('chat', {
        url: '/',
        templateUrl: 'views/chat/chatView.html',
        controller: 'ChatController',
        controllerAs: 'chat'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
