Workfolio
============
Source code of [sabin-tudor.ro](http://sabin-tudor.ro/).

Built using **AngularJS**, **SCSS**, **GruntJS** and **Google Docs** as *database*. Best viewed in [Chrome](http://www.google.com/chrome/).

Database sample : [here](https://docs.google.com/spreadsheets/d/1BspNtXilNaTvik9Z5dTH9hymxSVj3VdbNW5WIAo11-M/edit?usp=sharing)

Coffee, pizza and other ancient sorceries used aswell, no kitties harmed tho! :)

## Getting started
This bundle requires:
* [NodeJS](http://nodejs.org/)
* [GruntJS](http://gruntjs.com/)
* [Compass](http://compass-style.org/install/)

### Install Grunt
`$ npm install -g grunt-cli`

### SASS compile task
This task requires you to have [Ruby](http://www.ruby-lang.org/en/downloads/), [Sass](http://sass-lang.com/tutorial.html), and [Compass](http://compass-style.org/install/) installed. If you're on OSX or Linux, Ruby is most likely installed already; test it with 
`ruby -v` in your terminal.

If Ruby is ok, proceed to install SASS and Compass via Terminal :

`$ (sudo) gem update --system && (sudo) gem install compass`

## Running
Fire up using `$ grunt` and you're ready to develop! Any changes to files will be pushed by Grunt to your browser.

When ready to go live, use `$ grunt build`.

## To do
- [ ] Clean-up old code
- [ ] Fix SVG logo draw (maybe revert logo draw animation back to CSS?).
- [ ] Switch to one "dynamic" SVG border for improved performance? (less SVGs = less memory = win = yes?)
- [ ] Write a *better* "build" task
- [ ] Better docs
- [ ] Clean / rewrite some Grunt tasks (maybe switch to Gulp?)
