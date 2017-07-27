# Real-Time Chat - in AngularJS and NodeJS

#### Description
AngularJS based real-time chat application. Allows for multiple chats, user nicknames. Will fully describe once this is converted into a module and a better back-end is completed.  
  
If you're interested in using this now or contributing, contact me. 
   
**NOTE** Server built in socket.io, going to update to PubNub and commit node.js server code for immediate install/workable app.
   
---
  
### Pre-Release To Do
   -  Update directives to components
   -  Add responsiveness for desktop (built mobile-first)
   -  Put session storage for persistent chat data into a service
   -  Include user enter/exit notifications in the UI
   -  Comments/JSDoc & Usage Documentation
   -  Make into a AngularJS module

---  
   
### Installation
You'll need npm, bower, and gulp in order to install and run this application.   
If you don't have node.js installed, download the install at: https://nodejs.org/en/download/   

To install the other libraries:   
`npm i -g bower gulp`   
   
Once you've installed them (or if you already have them), install the required packages:   
`npm install && bower install`  

Once that completes, you'll be ready to run the app. Here's the gulp commands you can use:   
   
   - `gulp watch` - starts the browser sync server
   - `gulp lint` - runs jslint
   - `gulp build` - compiles a build for prod
   
   
#### Post-Release To Do/Nice to Have  
   -  Update UI - more simplistic & customizable
   -  Add UX animations for chat, channel slide-out (using css transitions)
   -  Publish module on bower and npm
