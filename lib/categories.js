const { window, workspace, Uri } = require('vscode');
const path = require('path');

const configuration = key => {
  return workspace.getConfiguration("rails-project-navigator").get(key)
};

function Categories() {
  this._categories = {};

  this._get = function(name) {
    return this._categories[name];
  }

  const configuredCategories = configuration("categories");

  configuredCategories.forEach(category => {
    this.add(category.name, category.path, category.exclusionGlob);
  });
}

Categories.prototype.add = function(name, relativePath, exclusionGlob) {
  // Don't add a category twice
  if (this._get(name)) { return; }

  this._categories[name] = { name, relativePath, exclusionGlob };
};

Categories.prototype.names = function() {
  return Object.keys(this._categories).sort((a, b) => {
    if (a.toLowerCase() > b.toLowerCase()) { return 1; }
    if (a.toLowerCase() < b.toLowerCase()) { return -1; }

    return 0;
  });
};

Categories.prototype.showCategories = function() {
  return window.showQuickPick(this.names(), {placeholder: 'Select a Category'});
};

Categories.prototype.getFilesFor = function(categoryName) {
  if (!categoryName) { return new Promise((_, rej) => rej('No category selected')); }

  const category = this._get(categoryName);
  if (!category) { return new Promise((_, rej) => rej(`${categoryName} is not a valid category`)); }

  const searchPath = `${category.relativePath}/**/*.*`;
  const exclusions = category.exclusionGlob ? category.exclusionGlob : undefined;


  return new Promise((res, rej) => {
    workspace.findFiles(searchPath, exclusions).then(files => {
      let filesToList = files.map((file) => {
        let path = workspace.asRelativePath(file._fsPath);
        return path.replace(new RegExp(`^${category.relativePath}/`), '');
      });

      res({ files: filesToList, category });
    }, rej);
  });
};

Categories.prototype.showFiles = function(options) {
  const { files, category } = options;

  return new Promise((res, rej) => {
    window.showQuickPick(files, {placeholder: 'Select a File'}).then(selectedFile => {
      res({ file: selectedFile, category });
    }, rej);
  });
};

Categories.prototype.openFile = function(options) {
  const { file, category } = options;
  if (!file) { return new Promise((_, rej) => rej('No file selected')); }

  const fullPath = Uri.parse('file://' + path.join(workspace.rootPath, category.relativePath, file));

  return new Promise((res, rej) => {
    workspace.openTextDocument(fullPath).then(doc => {
      res(window.showTextDocument(doc));
    }, error => {
      rej(`Couldn't open the file. Error: ${error}`);
    });
  });
};

module.exports = Categories;
