const { commands, window, workspace } = require('vscode');
const Categories = require('./lib/categories');

function activate(context) {
  const categories = new Categories();

  var disposable = commands.registerCommand('railsProjectNavigator.navigate', function () {
    return new Promise((res, rej) => {
      categories.showCategories()
        .then(categories.getFilesFor.bind(categories), rej)
        .then(categories.showFiles.bind(categories), rej)
        .then(categories.openFile.bind(categories), rej)
        .then(res, rej);
    });
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;
