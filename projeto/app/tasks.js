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

  function updateClock() {
    $scope.formattedTime = new Date().toLocaleTimeString(undefined, {
      hour: 'numeric', minute: '2-digit'
    });
  }
});

angular.module("app").directives('tasks',function(){
  return{
    restrict:'E',
    templateUrl:'app/tasks.html',
    controller:'tasksCtrl',
    scope:{
      tasks:'<'
    }
  }
})