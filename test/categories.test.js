/* global describe, before, after, beforeEach,it */

const { expect } = require('chai');
const { commands, window, workspace } = require('vscode');
const sinon = require('sinon');
const Categories = require('../lib/categories');
const path = require('path');

const clearCategories = categoriesObject => categoriesObject._categories = {};

describe("Categories", function () {
  beforeEach(function () {
    this.categories = new Categories();
    clearCategories(this.categories);
  });

  describe("initialization", function() {
    it("adds the categories defined in configuration settings", function() {
      const testCategories = new Categories();

      expect(testCategories.names()).to.have.same.members([
        "Config", "Controllers", "Helpers", "Initializers",
        "Jobs", "Layouts", "Mailers", "Migrations", "Models",
        "Rake Tasks", "Specs", "Tests", "Views"
      ]);
    });

    it("allows users to define their own categories", function(done) {
      const stub = sinon.stub(workspace, 'getConfiguration');
      const expectedValues = [
        'registration.rb'
      ];

      stub.withArgs('rails-project-navigator').returns({
        get: function(key) {
          if (key !== 'categories') {
            done(new Error('Wrong key was attempted to be retrieved'));
            return;
          }

          return [
            {
              "name": "Services",
              "path": "app/services"
            },
          ];
        }
      });

      const testCategories = new Categories();

      stub.restore();

      testCategories.getFilesFor("Services").then(result => {
        expect(result.files).to.have.same.members(expectedValues);
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    })

    it("allows users to override default categories", function(done) {
      const stub = sinon.stub(workspace, 'getConfiguration');
      const expectedValues = [
        'application_controller.rb',
        'users_controller.rb'
      ];

      stub.withArgs('rails-project-navigator').returns({
        get: function(key) {
          if (key !== 'categories') {
            done(new Error('Wrong key was attempted to be retrieved'));
            return;
          }

          return [
            {
              "name": "Controllers",
              "path": "app/controllers",
              "exclusionGlob": "**/.keep"
            },
          ];
        }
      });

      const testCategories = new Categories();

      stub.restore();

      testCategories.getFilesFor("Controllers").then(result => {
        expect(result.files).to.have.same.members(expectedValues);
        done();
      }, error => {
        done(new Error(`Failed to execute #getFilesFor: ${error}`));
      });
    });

    it("validates categories", function() {
      const stub = sinon.stub(workspace, 'getConfiguration');
      const spy = sinon.spy(window, "showErrorMessage");

      stub.withArgs('rails-project-navigator').returns({
        get: function(key) {
          if (key !== 'categories') {
            done(new Error('Wrong key was attempted to be retrieved'));
            return;
          }

          return [
            {
              "name": "Services",
            },
          ];
        }
      });

      new Categories();

      expect(spy.calledOnce).to.equal(true);
      expect(spy.calledWith("Navigate Rails Project settings are invalid")).to.equal(true);

      stub.restore();
      spy.restore();
    })
  });

  describe("#add", function() {
    it("adds a category to the list", function() {
      this.categories.add("Config", "config");

      expect(this.categories._categories).to.eql({
        "Config": {
          name: "Config",
          relativePath: "config",
          exclusionGlob: undefined
        }
      });
    });
  });

  describe("#names", function() {
    it("returns a sorted list of the available categories", function() {
      this.categories.add("dogs", "dogs");
      this.categories.add("Cats", "cats");
      this.categories.add("carnivores", "carnivores");

      const names = this.categories.names();
      expect(names[0]).to.eql('carnivores');
      expect(names[1]).to.eql('Cats');
      expect(names[2]).to.eql('dogs');
    });
  });

  describe("#showCategories", function() {
    before(function() {
      this.mockShowQuickPick = window.showQuickPick.bind(window);
    });

    after(function() {
      window.showQuickPick = this.mockShowQuickPick;
    });

    it("shows a quick pick list of the available categories", function(done) {
      const self = this;

      this.categories.add("dogs", "dogs");
      this.categories.add("Cats", "cats");
      this.categories.add("carnivores", "carnivores");

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.have.same.members([
          'carnivores', 'Cats', 'dogs'
        ]);
        done();

        return returned;
      };

      this.categories.showCategories();
    });
  });

  describe("#openFile", function() {
    it("opens a specified file in a specified category", function(done) {
      this.categories.add("Config", "config");

      commands.executeCommand('workbench.action.closeAllEditors').then(() => {
        const file = "application.rb";
        const category = this.categories._get("Config");

        this.categories.openFile({ file, category }).then(() => {
          const openFilePath = path.join(workspace.rootPath, category.relativePath, file);

          expect(window.activeTextEditor.document.fileName).to.eql(openFilePath)

          done();
        }, () => {
          done(new Error('Failed to execute #openFile'));
        });
      }, () => {
        done(new Error('Failed to execute command'));
      });
    });
  });

  describe("#getFilesFor", function() {
    it("gets the correct files", function(done) {
      this.categories.add("Controllers", "app/controllers");

      const expectedValues = [
        'application_controller.rb',
        'concerns/.keep',
        'users_controller.rb'
      ];

      this.categories.getFilesFor("Controllers").then(result => {
        expect(result.files).to.have.same.members(expectedValues);
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    });

    it("rejects the promise if no category is passed in", function(done) {
      this.categories.getFilesFor().then(() => {
        done(new Error('Should have rejected the promise'));
      }, error => {
        expect(error).to.eql("No category selected");
        done();
      });
    });

    it("rejects the promise if an invalid category is passed in", function(done) {
      this.categories.getFilesFor("Fake Category").then(() => {
        done(new Error('Should have rejected the promise'));
      }, error => {
        expect(error).to.eql("Fake Category is not a valid category");
        done();
      });
    });

    it("returns an empty file list if the path doesn't exist", function(done) {
      this.categories.add("Controllers", "app/fake_controllers_path");

      this.categories.getFilesFor("Controllers").then(result => {
        expect(result.files).to.eql([]);
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    });

    it("excludes files using the category exclusion glob", function(done) {
      this.categories.add("Controllers", "app/controllers", "**/.keep");

      const expectedValues = [
        'application_controller.rb',
        'users_controller.rb'
      ];

      this.categories.getFilesFor("Controllers").then(result => {
        expect(result.files).to.have.same.members(expectedValues);
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    });

    it("excludes files using the global exclusion globs setting", function(done) {
      this.categories.add("Controllers", "app/controllers");
      const configuredCategories = workspace.getConfiguration('rails-project-navigator').get('categories');

      const stub = sinon.stub(workspace, 'getConfiguration');
      const expectedValues = [
        'users_controller.rb'
      ];

      stub.withArgs('rails-project-navigator').returns({
        get: function(key) {
          if (key === 'categories') { return configuredCategories; }
          if (key !== 'globalExclusionGlobs') {
            done(new Error('Wrong key was attempted to be retrieved'));
            return;
          }

          return ["**/a*_controller.rb", "**/.keep"];
        }
      });

      this.categories.getFilesFor("Controllers").then(result => {
        expect(result.files).to.have.same.members(expectedValues);
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    });

    // In order to filter out files from the wrong directories, I introduced
    // a situation where some can be `false`. This is a test to make sure we
    // filter out the booleans.
    it("only includes strings", function(done) {
      this.categories.add("Config", "config");

      this.categories.getFilesFor("Config").then(result => {
        result.files.forEach(file => expect(file).to.be.a('string'));
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    });

    // this is a regression test to make sure that config.ru doesn't match
    // app/config again in the future
    it("excludes files which are not within the correct relative directory", function(done) {
      this.categories.add("Config", "config");

      this.categories.getFilesFor("Config").then(result => {
        expect(result.files).to.not.include('config.ru');
        done();
      }, () => {
        done(new Error("Failed to execute #getFilesFor"));
      });
    });
  });

  describe("#showFiles", function() {
    before(function() {
      this.mockShowQuickPick = window.showQuickPick.bind(window);
    });

    after(function() {
      window.showQuickPick = this.mockShowQuickPick;
    });

    it("shows the correct files", function(done) {
      const self = this;
      const files = ['application.rb', 'boot.rb'];
      const category = 'Config';

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.have.same.members(files);
        done();

        return returned;
      };

      this.categories.showFiles({ files, category });
    });
  });
});
