/**
 * @ngdoc controller
 * @name chatApp.controller:ChatController
 * @description Chat Controller
 * @requires $scope
 * @requires ChatService
 *
 * @property {object} userObj Creates specific user string for server posts
 * @property {string} chat.nickname Defines user session nickname
 * @property {string} chat.activechannel Defines channel user is in
 * @property {boolean} chat.showChat Controls view form or chat
 * @property {object} chat.channels Object of channels available
*/

(function() {
  'use strict';

  angular.module('chatApp')
  .controller('ChatController', [
    '$scope',
    'ChatService',
    ChatController
  ]);

  function ChatController($scope, ChatService) {
    var chat = this;
    var userObj = {};

    chat.nickname = null;
    chat.activechannel = 'general';
    chat.showChat = false;
    chat.channels = {};
    chat.createUser = createUser;
    chat.updateChannel = updateChannel;
    chat.sendMessage = sendMessage;

    /** On load run functions */
    getMessages();
    initChannels();

    /** Check for user nickname session cookie */
    if(document.cookie) {
      chat.nickname = document.cookie;
      createUser();
    }

    /**
     * @ngdoc method
     * @name chatApp.controller:ChatController#initChannels
     * @methodOf chatApp.controller:ChatController
     * @description Starts server connection & retrieves channels
    */
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

    /**
     * @ngdoc method
     * @name chatApp.controller:ChatController#createUser
     * @methodOf chatApp.controller:ChatController
     * @description Creates a user based on cookie or form submission
    */
    function createUser() {
      if(!chat.nickname) {
        chat.nickname = document.getElementById('nickname').value;
      }

      if(chat.nickname) {
        userObj = { username : chat.nickname };
        chat.showChat = true;

        /** Save username to cookie for temp storage */
        document.cookie = chat.nickname;

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

    /**
     * @ngdoc method
     * @name chatApp.controller:ChatController#updateChannel
     * @methodOf chatApp.controller:ChatController
     * @description Changes the channel a user is in
     *
     * @param {string} newVal New channel name
     * @param {string} oldVal Previous channel name
    */
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

    /**
     * @ngdoc method
     * @name chatApp.controller:ChatController#sendMessage
     * @methodOf chatApp.controller:ChatController
     * @description Sends a new message to the server
     *
     * @param {string} message Message to send
    */
    function sendMessage(message) {
      var messageObj = {
        channel: {
            label: chat.activechannel,
        },
        user: {
            username: chat.nickname
        },
        message: message
      };
      ChatService.socket.emit('new_message', messageObj);
    }

    /**
     * @ngdoc method
     * @name chatApp.controller:ChatController#getMessages
     * @methodOf chatApp.controller:ChatController
     * @description Message watch events
     *
     * @param {string} message Message to send
    */
    function getMessages() {

      /** Watch for new messages */
      ChatService.socket.forward('message_created', $scope);

      /** Watch for typing */
      ChatService.socket.forward('typing_event', $scope);
    }
  }
})();
