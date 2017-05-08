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
    chat.nickname = null;
    chat.activechannel = 'general';
    chat.createUser = createUser;
    chat.updateChannel = updateChannel;
    chat.sendMessage = sendMessage;
    chat.showChat = false;
    chat.channels = {};
    var userObj = {};

    getMessages();
    initChannels();


    function initChannels() {
      /** Init socket.io connection for new session */
      ChatService.socket.on('start', function(data){
        chat.activechannel = data.defaultChannel;
        var publicChannels = _.filter(data.channels, { 'private': false });

        /** Set channel object based on user privileges */
        if(data.canViewPrivate) {
          chat.channels = data.channels;
        } else {
          chat.channels = publicChannels;
        }
      });
    }

    function createUser() {
      chat.nickname = document.getElementById('nickname').value;

      if(chat.nickname) {
        userObj = { username : chat.nickname };
        chat.showChat = true;

        /** Format data based on expected vars & emit user joining */
        var userJoin = { 'channel': {'label': chat.activechannel}, 'user': { 'username': chat.nickname }};
        ChatService.socket.emit('user_joined', userJoin);

        ChatService.socket.on('user_joined', function(data) {
          //TO DO: Send 'user joined' message to relevant chat.
        });
      } else {
        alert('Please enter a nickname.');
      }
    }


    function updateChannel(newVal, oldVal) {
      var newChannel = _.find(chat.channels, [ 'label', newVal ]);
      var oldChannel = _.find(chat.channels, [ 'label', oldVal ]);
      var changeChannel = { 'prevChannel': oldChannel, 'newChannel': newChannel, 'user': userObj };

      /** Emit channel change */
      ChatService.socket.emit('change_channel', changeChannel);

      ChatService.socket.on('user_left', function(data) {
        //TO DO: Send 'user left' message to relevant chat.
      });

      ChatService.socket.on('user_joined', function(data) {
        //TO DO: Send 'user joined' message to relevant chat.
      });
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
      ChatService.socket.emit('new_message', messageObj);
    }


    function getMessages() {
      console.log('get message function invoked');
      ChatService.socket.forward('message_created', $scope);
    }
  }
})();
