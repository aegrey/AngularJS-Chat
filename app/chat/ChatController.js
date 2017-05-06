/**
 * @ngdoc chatApp
 * @name chatApp.controller:ChatController
 * @description Chat Controller
*/

(function() {
  'use strict';

  angular.module('chatApp')
  .controller('ChatController', [
    '$scope',
    ChatController
  ]);

  function ChatController($scope) {
    var chat = this;
    chat.nickname = 'AEGrey'; //TEMP FOR TESTING
    chat.activechannel = '#General';
    chat.setNickname = setNickname;

    function setNickname() {
      chat.nickname = document.getElementById('nickname').value;

      //new user, setup local storage

    }


  }

})();
