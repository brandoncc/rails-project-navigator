# Change Log
Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## 0.1.2
* Fix Windows incompatible file url
* Fix bug where /config.ru showed up in /config files list
* Update tests to pass in Windows

## 0.1.1
* Add globalExclusionGlobs setting
* Don't show an error when no file/category is selected
* Add rake tasks to default configuration

## 0.1.0
* Major rewrite to return promises from each method
* Categories are now determined from `rails-project-navigator.categories` setting
* Users can both define new categories as well as override the defaults
* Validate user settings

## 0.0.8
* Switch from expect.js to chai because expect.js doesn't have a way to match arrays without testing the specific element order.

## 0.0.7
* Renamed `Categories.prototype.getFilesFor` to `Categories.prototype.showFilesFor` because it shows the quickpick UI, rather than returning a list of files which was the original intention.
* Added integration specs

## 0.0.4
* Renamed command from `navigateRailsProject.navigate` to `railsProjectNavigator.navigate`

## 0.0.3
* Fix markdown issue in readme

## 0.0.2
* Fix repository in package.json so images work

## 0.0.1
This release is mostly proof of concept. Now that the basic groundwork is laid, more advanced features and settings can be added.

* Initial release
* Implemented basic Rails application navigation

