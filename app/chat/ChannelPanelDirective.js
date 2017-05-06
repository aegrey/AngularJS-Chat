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
        activechannel: '='
      },
  		link: link
  	};

    function link(scope, elements, attrs) {

      //temporary data
      scope.channels = [
        '#General',
        '#Help'
      ];

      scope.openPanel = openPanel;
      scope.closePanel = closePanel;
      scope.changeChannel = changeChannel;

      //Not doing anything fancy here for now for time sake.
      function openPanel() {
        document.getElementById('channelPanel').style.display = "block";
        document.getElementsByClassName('channel-name')[0].style.display = "none";
      }

      function closePanel() {
        document.getElementById('channelPanel').style.display = "none";
        document.getElementsByClassName('channel-name')[0].style.display = "block";
      }

      function changeChannel(channel) {
        scope.activechannel = channel;
      }

    }
  }

}());
