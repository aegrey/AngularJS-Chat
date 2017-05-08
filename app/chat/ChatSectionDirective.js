/**
 * @ngdoc directive
 * @name chatApp.directive:chatSection
 * @restrict 'E'
 * @scope
 * @description Chat Section Directive
 *
 * @property {boolean} typing Determines whether user is typing a message
 * @property {boolean} storage Determines whether storage is available
 * @property {string} newMessage The message to send to server
 * @property {object} messages current messages
*/

(function() {
  'use strict';

  angular.module('chatApp')
    .directive('chatSection', [
      '$compile',
      '$state',
      'ChatService',
      'localStorageService',
      chatSection
    ]);

  function chatSection($compile, $state, ChatService, localStorageService) {
  	return {
  		restrict: 'E',
      templateUrl: 'views/chat/chatSectionPartial.html',
      scope: {
        activechannel: '=',
        nickname: '@',
        updatechannel: '=',
        sendmessage: '='
      },
  		link: link
  	};

    function link(scope, elements, attrs) {

      scope.addMessage = addMessage;
      scope.userTyping = userTyping;
      scope.typing = false;
      scope.storage = false;
      scope.newMessage = null;
      scope.messages = [];

      watchMessages();
      watchChannel();

      /**
       * @ngdoc method
       * @name chatApp.directive:chatSection#watchChannel
       * @methodOf chatApp.directive:chatSection
       * @description
       * - Checks local storage for messages if user has previously been in chat
       * - Watches scope.activechannel for changes & broadcasts to controller
      */
      function watchChannel() {
        scope.$watch('activechannel', function(newVal, oldVal) {
          if(newVal !== oldVal) {
            scope.messages = [];

            /** TO DO: Put this in chatApp.service:ChatService#getStorage */
            var recordCount = getStorage(scope.activechannel + 'Length');
            if(recordCount > 0) {
              for (var i = 0; i < recordCount; i++) {
                var x = i + 1;
                scope.messages.push(getStorage(scope.activechannel + x));
              }
            }
            /** END chatApp.service:ChatService#getStorage */

            scope.updatechannel(newVal, oldVal);
          }
        });
      }

      /**
       * @ngdoc method
       * @name chatApp.directive:chatSection#watchMessages
       * @methodOf chatApp.directive:chatSection
       * @description Watches method post & sends to server
      */
      function watchMessages() {
        scope.$on('socket:message_created', function(event, value) {
          var messageObj = { 'channel': scope.activechannel, 'nickname': value.user.username, 'message': value.message, 'date': value.date };
          scope.typing = false;

          //push message to scope
          scope.messages.push(messageObj);

          /** TO DO: Put this in chatApp.service:ChatService#createStorage */
          createStorage(scope.activechannel + scope.messages.length, messageObj);
          createStorage(scope.activechannel + 'Length', scope.messages.length);
          /** END chatApp.service:ChatService#createStorage */
        });

        scope.$on('socket:typing_event', function(event, value) {
          scope.typing = true;
          scope.typingNick = value.user.username;
        });
      }


      function addMessage() {
        scope.sendmessage(scope.newMessage);
        scope.newMessage = '';
      }

      function userTyping() {
        var data = { 'channel': {'label': scope.activechannel }, 'user': {'username': scope.nickname } };
        ChatService.socket.emit('typing_event', data);
      }

      /**
       * @ngdoc method
       * @name chatApp.directive:chatSection#createStorage
       * @methodOf chatApp.service:ChatService
       * @returns {boolean} Success boolean
       * @description creates session storage object
       * !TO DO: Put this in chatApp.service:ChatService#createStorage
       *
       * @param {string} key key for storage object
       * @param {object} val object for storage
      */
      function createStorage(key, val) {
        if(localStorageService.isSupported) {
          scope.storage = true;
          return localStorageService.set(key, val);
        }
      }
      /**
       * @ngdoc method
       * @name chatApp.directive:chatSection#getStorage
       * @methodOf chatApp.service:ChatService
       * @returns {object} Session Object
       * @description gets session storage object
       * !TO DO: Put this in chatApp.service:ChatService#getStorage
       *
       * @param {string} key key for storage object
      */
      function getStorage(key) {
        if(localStorageService.isSupported) {
          scope.storage = true;
          return localStorageService.get(key);
        }
      }
    }
  }

}());
