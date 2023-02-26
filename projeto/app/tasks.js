angular.module('app').controller('TasksCtrl', function($scope, $interval) {
  
  var self = this;
  var interval;

  self.$onInit = function(){
    updateClock();
    interval = $interval(updateClock, 1000 * 60);
  }

  self.$onDestroy = function(){
    $interval.cancel(interval);
  }

  $scope.deleteTodo = function(todo) {
    $scope.tasks.splice($scope.tasks.indexOf(todo), 1);
  };

  self.moveUp = function(todo) {
    var index = self.tasks.indexOf(todo);
    if (index === 0) {
      return;
    }
    self.tasks.splice(index, 1);
    self.tasks.splice(index - 1, 0, todo);
  };

  self.moveDown = function(todo) {
    var index = self.tasks.indexOf(todo);
    if (index === self.tasks.length - 1) {
      return;
    }
    self.tasks.splice(index, 1);
    self.tasks.splice(index + 1, 0, todo);
  };

  function updateClock() {
    $scope.formattedTime = new Date().toLocaleTimeString(undefined, {
      hour: 'numeric', minute: '2-digit'
    });
  }
}).component('tasks',{
    templateUrl:'app/tasks.html',
    controller:'tasksCtrl',
    scope:{
      tasks:'<'
    }
})