angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider.when('/', {
      template: '<tasks tasks="$resolve.tasks"></tasks>',
      //templateUrl: 'app/tasks.html',
      //controller: 'TasksCtrl',
      resolve: {
        resolvedTasks: function(Tasks) {
          return Tasks.get();
        }
      }
    });
  }).
  config(function($compileProvider) {
    $compileProvider.preAssignBindingsEnabled(true);
  });
