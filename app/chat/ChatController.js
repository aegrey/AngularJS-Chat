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
    chat.nickname = 'AEGrey';
    chat.activeChannel = '#General';

    chat.setNickname = function() {
      chat.nickname = document.getElementById('nickname').value;
    };

  }

})();
