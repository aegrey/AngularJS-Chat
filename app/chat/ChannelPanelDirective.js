/**
 * @ngdoc directive
 * @name chatApp.directive:channelPanel
 * @restrict 'E'
 * @scope
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
        activechannel: '=',
        channels: '=',
      },
  		link: link
  	};

    function link(scope, elements, attrs) {

      //TO DO: If channels is empty, check local cache

      scope.openPanel = openPanel;
      scope.closePanel = closePanel;
      scope.changeChannel = changeChannel;

      //Not doing any fancy UX here now for time sake.
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
        closePanel();
      }

    }
  }

}());
