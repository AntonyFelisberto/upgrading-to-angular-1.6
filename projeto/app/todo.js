angular.module('app').controller('TodoCtrl', function($timeout) {
  var wayToGoPromise = undefined;
  var self = this;
  var previousName;

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

  self.$doCheck = function(){
    if(previousName !== self.todo.name){
      previousName = self.todo.name
      displayWayToGoMessage();
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
