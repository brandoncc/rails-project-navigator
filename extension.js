const { commands, window, workspace } = require('vscode');
const Categories = require('./lib/categories');

function activate(context) {
  const categories = new Categories();
  const configuredCategories = workspace.getConfiguration("rails-project-navigator.categories");

  configuredCategories.forEach(function(category) {
    categories.add(category.name, category.path, category.exclusionGlob);
  });

  var disposable = commands.registerCommand('railsProjectNavigator.navigate', function () {
    window.showQuickPick(categories.names(), {placeholder: 'Select a Category'}).then((selected) => {
      if (!selected) { return; }

      categories.showFilesFor(selected);
    });
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;
