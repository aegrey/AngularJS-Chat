/**
 * @ngdoc service
 * @name chatApp.service:ChatService
 * @description Chat Module Service
 * @requires socketFactory
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
      createStorage: createStorage,
      getStorage: getStorage,
    };

    return chatServices;

    /**
     * @ngdoc method
     * @name chatApp.service:ChatService#socket
     * @methodOf chatApp.service:ChatService
     * @returns {object} Socket Connection
    */
    function socket() {
      return socketFactory({
        ioSocket: io.connect('http://localhost:3000') //TO DO: put this URL into .env file.
      });
    }

    /**
     * @ngdoc method
     * @name chatApp.service:ChatService#createStorage
     * @methodOf chatApp.service:ChatService
     * @returns {boolean} Success boolean
    */
    function createStorage(key, chatObj) {

    }

    /**
     * @ngdoc method
     * @name chatApp.service:ChatService#getStorage
     * @methodOf chatApp.service:ChatService
     * @returns {object} Cache Object
    */
    function getStorage(key) {

    }
  }

})();
