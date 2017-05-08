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

      scope.openPanel = openPanel;
      scope.closePanel = closePanel;
      scope.changeChannel = changeChannel;

      /**
       * @ngdoc method
       * @name chatApp.directive:channelPanel#openPanel
       * @methodOf chatApp.directive:channelPanel
       * @description Opens chat panel
       * !TO DO: Needs UX/Animation
      */
      function openPanel() {
        document.getElementById('channelPanel').style.display = "block";
        document.getElementsByClassName('channel-name')[0].style.display = "none";
      }

      /**
       * @ngdoc method
       * @name chatApp.directive:channelPanel#closePanel
       * @methodOf chatApp.directive:channelPanel
       * @description Closes chat panel
       * !TO DO: Needs UX/Animation
      */
      function closePanel() {
        document.getElementById('channelPanel').style.display = "none";
        document.getElementsByClassName('channel-name')[0].style.display = "block";
      }

      /**
       * @ngdoc method
       * @name chatApp.directive:channelPanel#changeChannel
       * @methodOf chatApp.directive:channelPanel
       * @description Changes user channel
       *
       * @param {string} channel New channel name
      */
      function changeChannel(channel) {
        scope.activechannel = channel;
        closePanel();
      }

    }
  }

}());
