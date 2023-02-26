angular.module('app').controller('TodoCtrl', function($scope, $timeout) {
  var wayToGoPromise = undefined;
  var self = this;

  self.$onInit = function(){
    $scope.$watch(()=> {return self.todo.done;}, displayWayToGoMessage);
  }

  self.$onChange = function(changes){
    if(changes.todo){
      var name = self.todo.name;
      self.formattedTodoName = name.charAt(0).toUpperCase()
        + name.substring(1).toLowerCase();
    }
  }

  function displayWayToGoMessage() {
    if (self.todo.done) {
      $scope.showWayToGo = true;

      if (wayToGoPromise) {
        $timeout.cancel(wayToGoPromise);
      }

      wayToGoPromise = $timeout(function() {
        self.showWayToGo = false;
      }, 1500);
    }
  }
});

angular.module('app').component('todo', {
    templateUrl: 'app/todo.html',
    bindings:{
      todo:'<',
      deleteTodo:'&'
    },
    controller: 'TodoCtrl',
  });
