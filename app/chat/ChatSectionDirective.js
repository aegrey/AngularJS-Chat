/**
 * @ngdoc directive
 * @name chatApp.directive:chatSection
 * @restrict 'E'
 * @scope
 * @description Chat Section Directive
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


      function watchChannel() {
        scope.$watch('activechannel', function(newVal, oldVal) {
          if(newVal !== oldVal) {
            scope.messages = [];

            //TODO: Put this in a service
            var recordCount = getStorage(scope.activechannel + 'Length');
            if(recordCount > 0) {
              for (var i = 0; i < recordCount; i++) {
                var x = i + 1;
                scope.messages.push(getStorage(scope.activechannel + x));
              }
            }

            //update channel in socket
            scope.updatechannel(newVal, oldVal);
          }
        });
      }

      function watchMessages() {
        scope.$on('socket:message_created', function(event, value) {
          var messageObj = { 'channel': scope.activechannel, 'nickname': value.user.username, 'message': value.message, 'date': value.date };
          scope.typing = false;

          //push message to scope
          scope.messages.push(messageObj);

          //push message to storage
          addStorage(scope.activechannel + scope.messages.length, messageObj);
          addStorage(scope.activechannel + 'Length', scope.messages.length);
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

      function addStorage(key, val) {
        if(localStorageService.isSupported) {
          scope.storage = true;
          return localStorageService.set(key, val);
        }
      }
      function getStorage(key) {
        if(localStorageService.isSupported) {
          scope.storage = true;
          return localStorageService.get(key);
        }
      }

    }
  }

}());
