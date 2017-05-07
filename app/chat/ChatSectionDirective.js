/**
 * @ngdoc chatApp
 * @name chatApp.directive:chatSection
 * @description Chat Section Directive
*/

(function() {
  'use strict';

  angular.module('chatApp')
    .directive('chatSection', [
      '$compile',
      '$state',
      '$timeout',
      'ChatService',
      chatSection
    ]);

  function chatSection($compile, $state, $timeout, ChatService) {
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
      scope.messages = [];

      watchMessages();
      watchChannel();

      function watchChannel() {
        scope.$watch('activechannel', function(newVal, oldVal) {
          if(newVal !== oldVal) {
            scope.messages = [];
            //update channel in socket
            scope.updatechannel(newVal, oldVal);
          }
        });
      }

      function watchMessages() {
        //To Do: Add Cache
        scope.$on('socket:message_created', function(event, value) {
          console.log(value);
          scope.messages.push({ 'nickname': value.user.username, 'message': value.message, 'created': value.created });
        });

      }

      function addMessage() {
        scope.sendmessage(scope.newMessage);
        scope.newMessage = '';
      }


      function checkUserTyping() {
        //Check if other user is typing
        //Set timeout to: ?
      }


    }
  }

}());
