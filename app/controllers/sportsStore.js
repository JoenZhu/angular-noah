var app = angular.module('sportsStore', ['customerFilters', 'cart', 'ngRoute']);  

app.config(function ($routeProvider) {
	$routeProvider.when('/checkout',{
		templateUrl: '../views/checkoutSummary.html'
	})
	.when('/products',{
		templateUrl: '../views/productList.html'
	})
	.otherwise({
		templateUrl: '../views/productList.html'
	})
})
.constant('dataUrl', 'http://localhost:5500/products') //使用前应先启动Deploy服务器
.controller('sportsStoreCtrl', ['$scope', '$http', 'dataUrl', function($scope, $http, dataUrl){
	$scope.data = {} ;

	$http.get(dataUrl).success(function (data) {
		$scope.data.products = data;
	})
	.error(function (error) {
		$scope.data.error = error ;
	});
}]);

app.constant('productListActionClass', 'btn-primary')
.constant('productListPageCount', 3)
.controller('productListCtrl', 
	['$scope', '$filter', 'productListActionClass', 'productListPageCount', 'cart',
	 function($scope, $filter, productListActionClass, productListPageCount, cart){

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

        // 筛选已选择的类型
		$scope.categoryFilterFn = function(product){
			return selectedCategory == null || product.category == selectedCategory;
		}

		$scope.getCategoryClass = function (category) {
			return selectedCategory == category ? productListActionClass : '' ;
		}

		$scope.getPageClass = function (page) {
			return $scope.selectedPage == page ? productListActionClass : '' ;
		}

		$scope.addProductToCart = function (product) {
			cart.addProduct(product.id, product.name, product.price) ;
		}
	}]
);