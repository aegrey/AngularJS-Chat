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
        channel: '@',
        nickname: '@'
      },
  		link: link
  	};

    function link(scope, elements, attrs) {

    }
  }

}());
