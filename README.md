# React Restaurant

Restaurant Application in react js


###Demo Application###
This is the source for the application page located at heroku:

[http://donhenton-node.herokuapp.com/restaurantReact.doc](http://donhenton-node.herokuapp.com/restaurantReact.doc).
The master branch is used to create the artifacts placed there

```
gulp release --production
```

###Notes###

* http://babeljs.io/repl/ to see react/babel snippets translated.
* Simple server runs on http://127.0.0.1:8080 **NOT** localhost
* react-postal tag uses postal instead of Redux
* The main branch uses react, redux, and a dispatcher
 

###Branches###

* menu-branch contains menuing system and simple react demos
* redux-branch expands menu-branch with redux demos
* postal-branch is the entire restaurant using postal only for intercommunication
* master is what is on heroku

###Tags###
* react-postal application using postal
* react-redux-dispatcher marked code up on heroku
* sample-menu menuing system and demos


###Running and Developing###
* gulp task 'dev' sets up system for local development
* gulp task 'release' packages assets for placement into production. The html
will have to be adapted for its destination, but is under src/html
 
 
