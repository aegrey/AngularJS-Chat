# AngularJS Front-End Chat

#### Latest Commit - App Status   
Structure of app with vars defined and temp data for UI build out. UI for mobile first - complete with the exception of channel menu. Some minor changes to design. Needs UI tweaking on desktop - which I will be making lower priority in favor of functionality.   
   
---

### Notes on App
**Structure of App** I created this as a standalone application (with a folder structure as if chat was a module/section of the app) as it was more efficent for the initial demo build. I will eventually make this into a AngularJS module (and change the design for this purpose).   
   
**Why Gulp** I used Gulp instead of Grunt for this project as it's a much quicker setup. I'd used Grunt for a long time, but switched to Gulp about a year ago and have used it for all my personal projects. I love its ease of use and clean formatting. If you haven't used it yet, you should check it out! It's become a very popular build tool.
   
   
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
   
   
### To-Do   
   -  Comments/JSDoc
   -  Real time chat hookup
   -  Local storage for channel history
   -  Tweak responsive style for desktop
   -  Add UX animations for chat, channel slide-out (using css transitions)
   -  Update directives to components
   -  Update structure & UI to be a seperate module for install via Bower
