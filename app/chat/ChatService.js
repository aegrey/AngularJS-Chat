/**
 * @ngdoc chatApp
 * @name chatApp.factory:ChatService
 * @description Chat Module Service
*/

(function() {
  'use strict';

  angular.module('chatApp')
    .factory('ChatService', [
      ChatService
    ]);

  function ChatService() {

    var chatServices = {
      initLocalCache: initLocalCache,
      addUserMessage: addUserMessage,
      checkChatMessages: checkChatMessages
    }

    function initLocalCache() {

    }

    function checkChatMessages() {

    }

    function addLocalMessage() {

    }
  }

})();
