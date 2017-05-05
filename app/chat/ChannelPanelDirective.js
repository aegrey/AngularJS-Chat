/**
 * @ngdoc chatApp
 * @name chatApp.directive:channelPanel
 * @description Channel Panel Directive
*/

(function() {
  'use strict';

  angular.module('chatApp')
    .directive('channelPanel', [
      '$compile',
      '$state',
      channelPanel
    ]);

  function channelPanel($compile, $state) {
  	return {
  		restrict: 'E',
      templateUrl: 'views/chat/channelPanelPartial.html',
      scope: {
        channel: '@'
      },
  		link: link
  	};

    function link(scope, elements, attrs) {

    }
  }

}());
