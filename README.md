# Rails Project Navigator for Visual Studio Code [![Build Status](https://travis-ci.org/brandoncc/rails-project-navigator.svg?branch=master)](https://travis-ci.org/brandoncc/rails-project-navigator)

The idea for this extension came from Tim Pope's excellent [rails.vim](https://github.com/tpope/vim-rails) vim plugin. While it doesn't do everything that rails.vim does, my goal was to start with implementing the basic Rails application navigation. 

Although the defaults are configured for a Rails application, you can override them and use this extension with any project.

## Features

* Quickly access files in preset paths relative to your application
* Create your own mappings as well as override the defaults
* Default categories which can be browsed are:
  * Config (*[workspace folder]/config*, excluding initializers)
  * Controllers (*[workspace folder]/app/controllers*)
  * Helpers (*[workspace folder]/app/helpers*)
  * Initializers (*[workspace folder]/config/initializers*)
  * Jobs (*[workspace folder]/app/jobs*)
  * Layouts (*[workspace folder]/app/views/layouts*)
  * Mailers (*[workspace folder]/app/mailers*)
  * Migrations (*[workspace fo]der]/db/migrate*)
  * Models (*[workspace folder]/app/models*)
  * Specs (*[workspace folder]/spec*)
  * Tests (*[workspace folder]/test*)
  * Views (*[workspace folder]/app/views*, excluding layouts)

![Navigating using the extension](images/navigating.gif)

## Usage

1. Run "Navigate Rails Project" from the command palette.
2. Choose a category of files to browse
3. Choose a file to open

You can also assign a keybinding to `railsProjectNavigator.navigate`, in place of #1.

## Extension Settings

You can customize the categories which are displayed however you would like. You can create your own as well as modify or even remove the defaults. The configuration is done using the `rails-project-navigator.categories` configuration setting.

The setting should be an array of objects which each have at least a `name` and `path` key with string values.

The valid keys are:

* `"name"` -- The text which will be displayed in the selection (quick pick) box
* `"path"` -- The path to the files in this category, relative to the currently opened folder in VS Code
* `"exclusionGlob"` -- Any files matching this glob will not be listed when you browse the category

The recommended location for these settings is in "workspace settings", so that each of your projects can have their own configuration.

## Known Issues

None yet

## TODO

* Allow users to add "global exclude" patterns which will cause files to be excluded for all categories
* Add "Rake Tasks" to default categories

## Release Notes

See the [change log](CHANGELOG.md)
