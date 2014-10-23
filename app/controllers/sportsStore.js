var app = angular.module('sportsStore', ['customerFilters']);  

app.controller('sportsStoreCtrl', ['$scope', function($scope){
	$scope.data = {
		products: [
			{name:"product #1", description:"A product", category: "Category #1", price: 100},
			{name:"product #2", description:"A product", category: "Category #2", price: 120},
			{name:"product #3", description:"A product", category: "Category #1", price: 102.9},
			{name:"product #4", description:"A product", category: "Category #3", price: 103},
			{name:"product #5", description:"A product", category: "Category #4", price: 112},
			{name:"product #6", description:"A product", category: "Category #1", price: 100},
			{name:"product #7", description:"A product", category: "Category #2", price: 120},
			{name:"product #8", description:"A product", category: "Category #1", price: 102.9},
			{name:"product #9", description:"A product", category: "Category #3", price: 103},
			{name:"product #10", description:"A product", category: "Category #4", price: 112},
			{name:"product #11", description:"A product", category: "Category #1", price: 100},
			{name:"product #12", description:"A product", category: "Category #2", price: 120},
			{name:"product #13", description:"A product", category: "Category #1", price: 102.9},
			{name:"product #14", description:"A product", category: "Category #3", price: 103},
			{name:"product #15", description:"A product", category: "Category #4", price: 112}]
	}
}]);

app.constant('productListActionClass', 'btn-primary')
.constant('productListPageCount', 5)
.controller('productListCtrl', 
	['$scope', '$filter', 'productListActionClass', 'productListPageCount', 
		function($scope, $filter, productListActionClass, productListPageCount){

		var selectedCategory = null ; 

		$scope.selectedPage = 1; 
		$scope.pageSize = productListPageCount; 

		$scope.selectCategory = function (newCategory) {
			selectedCategory = newCategory; 
			$scope.selectedPage = 1;
		}

		$scope.selectPage = function (newPage) {
			$scope.selectedPage = newPage;
		}

		$scope.categoryFilterFn = function(product){
			return selectedCategory == null || product.category == selectedCategory;
		}

		$scope.getCategoryClass = function (category) {
			return selectedCategory == category ? productListActionClass : '' ;
		}

		$scope.getPageClass = function (page) {
			return $scope.selectedPage == page ? productListActionClass : '' ;
		}
	}]
);