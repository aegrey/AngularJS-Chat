/**
 * @ngdoc chatApp
 * @name chatApp.controller:ChatController
 * @description Chat Controller
*/

(function() {
  'use strict';

  angular.module('chatApp')
  .controller('ChatController', [
    '$scope',
    '$timeout',
    'ChatService',
    ChatController
  ]);

  function ChatController($scope, $timeout, ChatService) {
    var chat = this;
    chat.nickname = 'ae';
    chat.activechannel = 'general';
    chat.setNickname = setNickname;
    chat.updateChannel = updateChannel;
    chat.sendMessage = sendMessage;
    chat.channels = {};
    var userObj = {};

    getMessages();
    setNickname();

    function setNickname() {
      //chat.nickname = document.getElementById('nickname').value;
      userObj = { username : chat.nickname };

      //new user, setup local storage & connect to socket.io
      if(chat.nickname) {
        initChannels();
      } else {
        alert('Please enter a nickname.');
      }
    }

    function initChannels() {
      ChatService.socket().on('start', function(data){
        chat.activechannel = data.channels[0].label;
        var publicChannels = _.filter(data.channels, { 'private': false });

        if(data.canViewPrivate) {
          chat.channels = data.channels;
        } else {
          chat.channels = publicChannels;
        }
      });
    }

    function updateChannel(newVal, oldVal) {

      var newChannel1 = _.find(chat.channels, [ 'label', newVal ]);
      var oldChannel = _.find(chat.channels, [ 'label', oldVal ]);
      var newChannel2 = { 'channel': newChannel1, 'user': userObj };
      var changeChannel = { 'prevChannel': oldChannel, 'newChannel': newChannel1, 'user': userObj };

      //Record Channel Change
      //ChatService.socket().emit('user_joined', newChannel2);
      ChatService.socket().emit('change_channel', changeChannel);
    }

    function sendMessage(message) {
      var messageObj = {
        channel: {
            label: chat.activechannel,
            private: false //TODO: create a find for this
        },
        user: {
            username: chat.nickname
        },
        message: message
      };
      ChatService.socket().emit('new_message', messageObj, function(data) {
        console.log(data);
      });
    }

    function getMessages() {
      ChatService.socket().forward('message_created', $scope);
      $scope.$on('socket:message_created', function(event, value) {
        console.log(value);
      });
    }
  }

})();
