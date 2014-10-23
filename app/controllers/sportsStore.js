var app = angular.module('sportsStore', ['customerFilters']);  

app.controller('sportsStoreCtrl', ['$scope', function($scope){
	$scope.data = {
		products: [
			{name:"product #1", description:"A product", category: "Category #1", price: 100},
			{name:"product #2", description:"A product", category: "Category #2", price: 120},
			{name:"product #3", description:"A product", category: "Category #1", price: 102.9},
			{name:"product #4", description:"A product", category: "Category #3", price: 103},
			{name:"product #5", description:"A product", category: "Category #4", price: 112}]
	}
}]);