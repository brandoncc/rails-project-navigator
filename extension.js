const { commands, window, workspace } = require('vscode');
const Categories = require('./lib/categories');

function activate(context) {
  const categories = new Categories();

  var disposable = commands.registerCommand('railsProjectNavigator.navigate', function () {
    return new Promise((res, rej) => {
      categories.showCategories()
        .then(categories.getFilesFor.bind(categories), rej)
        .then(result => {
          categories.showFiles(result)
            .then(selectedFile => {
              categories.openFile(selectedFile).then(result => {
                res(result);
              }, error => {
                if (error === "No file selected") {
                  res(false);
                } else {
                  rej(error);
                }
              });
            });
          }, error => {
            if (error === "No category selected") {
              res(false);
            } else {
              rej(error);
            }
          });
    });
  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;
