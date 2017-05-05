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
      chatSection
    ]);

  function chatSection($compile, $state) {
  	return {
  		restrict: 'E',
      templateUrl: 'views/chat/chatSectionPartial.html',
      scope: {
        activechannel: '@',
        nickname: '@'
      },
  		link: link
  	};

    function link(scope, elements, attrs) {

      scope.newMessage = null;

      //Temporary data
      scope.messages = {
        0: {
          nickname: 'LeroyJenkins',
          text: 'hello world'
        },
        1: {
          nickname: 'AEGrey',
          text: 'hello world'
        },
        2: {
          nickname: 'AEGrey',
          text: 'hello world'
        }
      };

      function checkUserTyping() {
        //Check if other user is typing
        //Set timeout to: ?
      }


    }
  }

}());
