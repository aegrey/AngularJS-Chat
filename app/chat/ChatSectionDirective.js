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
        activechannel: '=',
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
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed elementum massa, ut elementum felis. Maecenas justo est, feugiat nec leo vitae, malesuada fringilla ante. Morbi elementum efficitur facilisis.'
        },
        2: {
          nickname: 'AEGrey2',
          text: 'hello world'
        },
        3: {
          nickname: 'AEGrey',
          text: 'hello world'
        },
        4: {
          nickname: 'AEGrey',
          text: 'hello world'
        },
        5: {
          nickname: 'AEGrey2',
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sed elementum massa, ut elementum felis.'
        },
        6: {
          nickname: 'AEGrey',
          text: 'hello world'
        },
        7: {
          nickname: 'AEGrey4',
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
