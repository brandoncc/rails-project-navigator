# Rails Project Navigator for Visual Studio Code

The idea for this extension came from Tim Pope's excellent
[rails.vim](https://github.com/tpope/vim-rails) vim plugin. While it doesn't
do everything that rails.vim does, my goal was to start with implementing the
basic Rails application navigation.

## Features

* Quickly access files preset paths relative to your application
* Default categories which can be browsed are:
  * Config (*\<workspace folder>/config*, excluding initializers)
  * Controllers (*\<workspace folder>/app/controllers*)
  * Helpers (*\<workspace folder>/app/helpers*)
  * Initializers (*\<workspace folder>/config/initializers*)
  * Jobs (*\<workspace folder>/app/jobs*)
  * Layouts (*\<workspace folder>/app/views/layouts*)
  * Mailers (*\<workspace folder>/app/mailers*)
  * Migrations (*\<workspace folder>/db/migrate*)
  * Models (*\<workspace folder>/app/models*)
  * Specs (*\<workspace folder>/spec*)
  * Tests (*\<workspace folder>/test*)
  * Views (*\<workspace folder>/app/views*, excluding layouts)

![Navigating using the extension](images/navigating.gif)

## Extension Settings

Coming Soon!

## Known Issues

None yet

## TODO

* Add specs
* Add user configuration
* Allow users to disable categories completely
* Allow users to override default categories and their settings
* Allow users to add "global exclude" patterns which will cause files to be excluded for all categories

## Release Notes

This release is mostly proof of concept. Now that the basic groundwork is laid,
more advanced features and settings can be added.

### 0.0.1

* Initial release
* Implemented basic Rails application navigation
