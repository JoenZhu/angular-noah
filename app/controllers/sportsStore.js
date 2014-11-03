var app = angular.module('sportsStore', ['customerFilters', 'cart', 'ngRoute']);  

app.config(function ($routeProvider) {
	$routeProvider.when('/checkout',{
		templateUrl: '../views/checkoutSummary.html'
	})
	.when('/products',{
		templateUrl: '../views/productList.html'
	})
	.when('/complete',{
		templateUrl: '../views/thankYou.html'
	})
	.when('/placeorder',{
		templateUrl: '../views/placeOrder.html'
	})
	.otherwise({
		templateUrl: '../views/productList.html'
	})
})
.constant('dataUrl', 'http://localhost:5500/products') //使用前应先启动Deploy服务器
.constant('orderUrl', 'http://localhost:5500/orders')
.controller('sportsStoreCtrl', ['$scope', '$http', '$location', 'dataUrl', 'orderUrl', 'cart', 
  function($scope, $http, $location, dataUrl, orderUrl, cart){
	$scope.data = {} ;

	$http.get(dataUrl).success(function (data) {
		$scope.data.products = data;
	})
	.error(function (error) {
		$scope.data.error = error ;
	});

	$scope.sendOrder = function (shippingDetails) {
		var order = angular.copy(shippingDetails) ;
		order.products = cart.getProducts() ;

		$http.post(orderUrl, order)
		    .success(function (data) {
		    	$scope.data.orderId = data.id;
		    	cart.getProducts().length = 0 ;
		    })
		    .error(function (error) {
		    	$scope.data.orderError = error;
		    })
		    .finally(function () {
		    	$location.path('/complete') ;
		    }) ;
	}
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
)
.controller('cartSummaryCtrl', ['$scope', 'cart', function ($scope, cart) {
	$scope.cartData = cart.getProducts() ;

	$scope.total = function () {
		var total = 0 ;
		for ( var i = 0; i < $scope.cartData.length; i++ ) {
			total += ($scope.cartData[i].price * $scope.cartData[i].count) ;
		}

		return total ;
	}

	$scope.remove = function (id) {
		cart.removeProduct(id) ;
	}
}])