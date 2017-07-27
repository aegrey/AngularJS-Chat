# Real-Time Javascript Chat
Built in AngularJS and Node.js  
  
## Description
Allows for multiple chats, user nicknames. Will add full description once this is converted into a module and a better back-end is completed.  
  
If you're interested in using this now or contributing, contact me.  
    
Server built in socket.io, going to update to PubNub and commit node.js server code for immediate install/workable app.
   
   
## Installation
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
   
  
## To Do
  
#### Pre-Release
   -  Update directives to components
   -  Add responsiveness for desktop (built mobile-first)
   -  Put session storage for persistent chat data into a service
   -  Include user enter/exit notifications in the UI
   -  Comments/JSDoc & Usage Documentation
   -  Make into a AngularJS module
     
       
#### Post-Release
   -  Update UI - more simplistic & customizable
   -  Add UX animations for chat, channel slide-out (using css transitions)
   -  Publish module on bower and npm
  
---  
  
#### Credits
   -  Developer - AE Grey @aegrey   
   -  Contributor -
 
#### License
 
The MIT License (MIT)

Copyright (c) 2015 Chris Kibble

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
