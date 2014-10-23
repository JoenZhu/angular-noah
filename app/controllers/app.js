var model = {
			user: "Noah"
		};

var app = angular.module('todoApp',[]) ;

app.filter('checkedItem', function () {
	return function(items, showComplete){
		var resultArr = []; 
		angular.forEach(items, function (item) {
			if( !item.done || showComplete){
				resultArr.push(item) ;
			}
		}) ;

		return resultArr ;
	}
});

app.controller('TodoCtrl', ['$scope','$http', function($scope, $http){
	$http.get('../data/todo.json').success(function(data){
		model.items = data ;
	}).error(function(data){
		console.log('error');
	}) ;

	$scope.todo = model ;

	$scope.addItem = function(item){
		var temp = {} ; 
		temp.action = item ; 
		temp.done = !1 ; 
		$scope.todo.items.push(temp) ;
	}

	$scope.unComplete = function(){
		var count = 0 ; 
		angular.forEach($scope.todo.items, function(item){
			if( !item.done )
				count++;
		}) ;
		return count ;
	}

	$scope.warningLevel = function(){
		return $scope.unComplete() < 3 ? 'label-success' : 'label-warning' ;
	}
}]);