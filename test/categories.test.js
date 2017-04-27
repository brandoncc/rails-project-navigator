/* global describe, before, after, it */

const expect = require('expect.js');
const { window, workspace } = require('vscode');
const Categories = require('../lib/categories');
const path = require('path');

describe("Categories", function () {
  before(function () {
    this.categories = new Categories();

    this.categories.add('Config', 'config', 'config/initializers/**/*.*');
    this.categories.add('Controllers', 'app/controllers');
    this.categories.add('Helpers', 'app/helpers');
    this.categories.add('Initializers', 'config/initializers');
    this.categories.add('Jobs', 'app/jobs');
    this.categories.add('Layouts', 'app/views/layouts');
    this.categories.add('Mailers', 'app/mailers');
    this.categories.add('Migrations', 'db/migrate');
    this.categories.add('Models', 'app/models');
    this.categories.add('Specs', 'spec');
    this.categories.add('Tests', 'test');
    this.categories.add('Views', 'app/views', 'app/views/layouts/**/*.*');
  });

  describe("#showFilesFor", function() {
    before(function() {
      this.mockShowQuickPick = window.showQuickPick.bind(window);
      this.mockOpenTextDocument = workspace.openTextDocument.bind(workspace);
    });

    after(function() {
      window.showQuickPick = this.mockShowQuickPick;
      workspace.openTextDocument = this.mockOpenTextDocument;
    });

    it("displays the correct config files", function(done) {
      const self = this;
      const expectedValues = [
        'application.rb',
        'boot.rb',
        'cable.yml',
        'database.yml',
        'environment.rb',
        'environments/development.rb',
        'environments/production.rb',
        'environments/test.rb',
        'locales/en.yml',
        'puma.rb',
        'routes.rb',
        'secrets.yml',
        'spring.rb',
        'config.ru'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Config');
    });

    it("displays the correct controllers", function(done) {
      const self = this;
      const expectedValues = [
        'application_controller.rb',
        'concerns/.keep',
        'users_controller.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Controllers');
    });

    it("displays the correct helpers", function(done) {
      const self = this;
      const expectedValues = [
        'application_helper.rb',
        'users_helper.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Helpers');
    });

    it("displays the correct initializers", function(done) {
      const self = this;
      const expectedValues = [
        'application_controller_renderer.rb',
        'assets.rb',
        'backtrace_silencers.rb',
        'cookies_serializer.rb',
        'filter_parameter_logging.rb',
        'inflections.rb',
        'mime_types.rb',
        'new_framework_defaults.rb',
        'session_store.rb',
        'wrap_parameters.rb'
        ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Initializers');
    });

    it("displays the correct jobs", function(done) {
      const self = this;
      const expectedValues = [
        'application_job.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Jobs');
    });

    it("displays the correct layouts", function(done) {
      const self = this;
      const expectedValues = [
        'application.html.erb',
        'mailer.html.erb',
        'mailer.text.erb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Layouts');
    });

    it("displays the correct mailers", function(done) {
      const self = this;
      const expectedValues = [
        'application_mailer.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Mailers');
    });

    it("displays the correct migrations", function(done) {
      const self = this;
      const expectedValues = [
        '20170421185159_create_users.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Migrations');
    });

    it("displays the correct models", function(done) {
      const self = this;
      const expectedValues = [
        'application_record.rb',
        'concerns/.keep',
        'user.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Models');
    });

    it("displays the correct specs", function(done) {
      const self = this;
      const expectedValues = [
        'models/user_spec.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Specs');
    });

    it("displays the correct tests", function(done) {
      const self = this;
      const expectedValues = [
        'controllers/.keep',
        'controllers/users_controller_test.rb',
        'fixtures/.keep',
        'fixtures/files/.keep',
        'fixtures/users.yml',
        'helpers/.keep',
        'integration/.keep',
        'mailers/.keep',
        'models/.keep',
        'models/user_test.rb',
        'test_helper.rb'
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Tests');
    });

    it("displays the correct views", function (done) {
      const self = this;
      const expectedValues = [
        "users/_form.html.erb",
        "users/_user.json.jbuilder",
        "users/edit.html.erb",
        "users/index.html.erb",
        "users/index.json.jbuilder",
        "users/new.html.erb",
        "users/show.html.erb",
        "users/show.json.jbuilder"
      ];

      window.showQuickPick = function(items, options, token) {
        var returned = self.mockShowQuickPick(items, options, token);
        expect(items).to.eql(expectedValues);
        done();

        return returned;
      };

      this.categories.showFilesFor('Views');
    });

    it ("opens the chosen file", function(done) {
      const selectedItem = 'users/index.html.erb';
      const self = this;

      window.showQuickPick = function(items, options, token) {
        return new Promise(function(resolve, reject) {
          resolve(selectedItem);
        });
      };

      workspace.openTextDocument = function(openPath) {
        done();
        expect(openPath.toString()).to.be('file://' + path.join(workspace.rootPath, 'app/views', selectedItem));

        return self.mockOpenTextDocument(openPath);
      }

      this.categories.showFilesFor('Views');
    });
  });
});
