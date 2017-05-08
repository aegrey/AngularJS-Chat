/**
 * @ngdoc chatApp
 * @name chatApp.service:ChatService
 * @description Chat Module Service
*/

(function() {
  'use strict';

  angular.module('chatApp')
    .service('ChatService', [
      'socketFactory',
      ChatService
    ]);

  function ChatService(socketFactory) {

    var chatServices = {
      socket: socket(),
      updateChatCache: updateChatCache,
      getCache: getCache,
    };

    return chatServices;


    //connects to socket.io server
    function socket() {
      //put this URL into config file in the future.
      return socketFactory({
        ioSocket: io.connect('http://localhost:3000')
      });
    }

    //Chat Cache Functions
    function updateChatCache(chatObj) {

    }

    function getCache() {

    }
  }

})();
