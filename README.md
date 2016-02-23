# Second Round Interview Test Project

## Why another test project?
If you've made it this far, then you've passed the first coding test, which showed that you are familiar with AngularJS. Now, we need to make sure that you can work in the environment that our product is built in.

## Task
Build the front end to the application in this repo. Requirements are below, and design is unimportant, just use Bootstrap defaults. Function is everything in this test. If you are unfamiliar with JWTs, take some time and review middleware/auth.js.

## Requirements
- Use angular, ui.router, and ui.Bootstrap. Anything else you want to use is up to you, however you will be scrutinized on your choices.
- Front end stateless user authentication using JWTs.
- Separate pages for authenticated and non-authenticated users.
- Ability to post comments on the authenticated page. Just list all comments and have a text field that posts comments.

## Hints
- If you're using Windows, why are you using windows? You're gonna have it rough with bcrypt.
- Authentication can be tested by sending a POST request to http://[SOME_HOST_PROBABLY_LOCALHOST]/api/v1/authenticate
- You will be sharing the database with all other candidates. This means you might see comments you didn't create. User authentication for mongodb is disabled.
- Your front end code goes in '/public'.

## Bugs
- What bugs?